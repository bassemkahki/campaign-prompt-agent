import { describe, it, expect, beforeEach } from 'vitest';
import { PromptEngineerService } from '../src/services/engineer';
import { CreativeBrief } from '../src/schema/brief';

describe('PromptEngineerService', () => {
  let service: PromptEngineerService;
  const mockBrief: CreativeBrief = {
    brand: "Luxury Fashion",
    projectGoal: "Launch summer collection",
    artDirection: {
      visualStyle: "cinematic editorial, high contrast",
      colorPalette: ["gold", "azure"],
      lighting: "golden hour, soft shadows"
    },
    mood: "sophisticated and airy",
    constraints: [],
    deliverables: ["soul-v2"],
    shotBreakdowns: [
      {
        id: "shot-001",
        description: "Model standing by the pool",
        subject: "Elegant female model",
        outfit: "flowing silk azure gown",
        pose: "gazing towards the horizon",
        environment: "infinity pool overlooking the Mediterranean",
        camera: "Sony A7R V",
        lens: "85mm prime",
        shotType: "Medium full shot"
      }
    ]
  };

  beforeEach(() => {
    service = new PromptEngineerService();
  });

  it('should generate a Soul V2 prompt following the formula', () => {
    const result = service.generateSoulV2(mockBrief, "shot-001");
    
    expect(result.shotId).toBe("shot-001");
    expect(result.model).toBe("soul-v2");
    // Formula: [Subject] wearing [Outfit], [Pose/Action], shot on [Camera] with [Lighting].
    // Plus visual style and mood.
    expect(result.prompt).toContain("Elegant female model wearing flowing silk azure gown");
    expect(result.prompt).toContain("gazing towards the horizon");
    expect(result.prompt).toContain("shot on Sony A7R V");
    expect(result.prompt).toContain("cinematic editorial");
    expect(result.prompt).toContain("sophisticated and airy");
  });

  it('should generate a Soul Cinema prompt with technical vocabulary', () => {
    const result = service.generateSoulCinema(mockBrief, "shot-001");
    
    expect(result.shotId).toBe("shot-001");
    expect(result.model).toBe("soul-cinema");
    
    // Formula: [Shot Type] of [Subject], [Action]. [Environment]. Shot on [Camera] with [Lens]. [Lighting]. [Visual Style], [Technical Style].
    expect(result.prompt).toContain("Medium full shot of Elegant female model, gazing towards the horizon");
    expect(result.prompt).toContain("infinity pool overlooking the Mediterranean");
    
    // Sony A7R V doesn't strictly match Sony Venice in current simple logic, 
    // but 85mm prime should match 85mm.
    expect(result.prompt).toContain("Shot on");
    expect(result.prompt).toContain("with 85mm");
    expect(result.prompt).toContain("cinematic editorial");
    expect(result.prompt).toContain("Cinematic High Fidelity");
  });

  it('should map specific gear to technical vocabulary in Soul Cinema', () => {
    const cinemaBrief = { ...mockBrief };
    cinemaBrief.shotBreakdowns[0].camera = "Alexa 35";
    cinemaBrief.shotBreakdowns[0].lens = "Anamorphic Lens";

    const result = service.generateSoulCinema(cinemaBrief, "shot-001");
    expect(result.prompt).toContain("Shot on ARRI Alexa 35 with Anamorphic");
  });

  it('should generate a Seedance 2.0 prompt with @ImageN resolution', () => {
    const multiShotBrief: CreativeBrief = {
      ...mockBrief,
      shotBreakdowns: [
        ...mockBrief.shotBreakdowns,
        {
          id: "shot-002",
          description: "Model walking by the sea",
          subject: "Elegant female model",
          outfit: "flowing silk azure gown",
          pose: "walking slowly",
          environment: "beach at sunset",
          camera: "Sony A7R V",
          lens: "35mm prime",
          shotType: "Wide shot"
        }
      ]
    };

    const result1 = service.generateSeedance(multiShotBrief, "shot-001");
    expect(result1.model).toBe("seedance-2");
    expect(result1.prompt).toMatch(/^@Image1\b/);

    const result2 = service.generateSeedance(multiShotBrief, "shot-002");
    expect(result2.model).toBe("seedance-2");
    expect(result2.prompt).toMatch(/^@Image2\b/);
  });

  it('should throw an error if shotId is not found', () => {
    expect(() => service.generateSoulV2(mockBrief, "non-existent")).toThrow();
  });
});
