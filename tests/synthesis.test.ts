import { describe, it, expect } from 'vitest';
import { SynthesisService } from '../src/services/synthesis';

function makeShot(overrides: Record<string, any> = {}) {
  return {
    id: 'shot-1',
    description: 'A person standing on a mountain',
    subject: 'Person',
    outfit: 'Hiking gear',
    pose: 'Standing tall',
    environment: 'Mountain top',
    camera: 'Eye level',
    lens: '35mm',
    shotType: 'Wide',
    ...overrides,
  };
}

function makeBrief(shots: any[]) {
  return {
    brand: 'Test Brand',
    projectGoal: 'Test Goal',
    artDirection: {
      visualStyle: 'Modern',
      colorPalette: ['Blue'],
      lighting: 'Bright',
    },
    mood: 'Energetic',
    constraints: [],
    deliverables: ['soul-v2'],
    shotBreakdowns: shots,
  };
}

describe('SynthesisService (keyless)', () => {
  describe('buildExtractionInstructions', () => {
    it('returns guidance that names the shot fields, the cap, the schema, and the save step', () => {
      const service = new SynthesisService();
      const text = service.buildExtractionInstructions();

      expect(text.length).toBeGreaterThan(0);
      expect(text).toContain('subject');
      expect(text).toContain('shotBreakdowns');
      expect(text).toContain(String(SynthesisService.MAX_SHOTS));
      expect(text).toContain('ingest_campaign_doc');
    });
  });

  describe('validateBrief', () => {
    it('parses a valid brief with shot breakdowns', () => {
      const service = new SynthesisService();
      const brief = service.validateBrief(makeBrief([makeShot()]));

      expect(brief.brand).toBe('Test Brand');
      expect(brief.shotBreakdowns).toHaveLength(1);
      expect(brief.shotBreakdowns[0].subject).toBe('Person');
    });

    it('caps shotBreakdowns at MAX_SHOTS', () => {
      const service = new SynthesisService();
      const shots = Array.from({ length: 12 }, (_, i) => makeShot({ id: `shot-${i + 1}` }));
      const brief = service.validateBrief(makeBrief(shots));

      expect(brief.shotBreakdowns).toHaveLength(SynthesisService.MAX_SHOTS);
    });

    it('backfills a stable id when a shot is missing one', () => {
      const service = new SynthesisService();
      const shotWithoutId = makeShot();
      delete (shotWithoutId as any).id;

      const brief = service.validateBrief(makeBrief([shotWithoutId]));
      expect(brief.shotBreakdowns[0].id).toBe('shot-1');
    });

    it('throws on a structurally invalid brief', () => {
      const service = new SynthesisService();
      // Missing required `brand`
      const invalid: any = makeBrief([makeShot()]);
      delete invalid.brand;

      expect(() => service.validateBrief(invalid)).toThrow();
    });

    it('throws when nothing is provided', () => {
      const service = new SynthesisService();
      expect(() => service.validateBrief(undefined)).toThrow();
    });
  });
});
