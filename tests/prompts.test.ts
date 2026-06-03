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

  it('should throw an error if shotId is not found', () => {
    expect(() => service.generateSoulV2(mockBrief, "non-existent")).toThrow();
  });
});
