import { describe, it, expect, vi } from 'vitest';
import { SynthesisService } from '../src/services/synthesis';
import { ConfigService } from '../src/services/config';

// Mock ConfigService
vi.mock('../src/services/config', () => {
  return {
    ConfigService: vi.fn().mockImplementation(() => {
      return {
        getConfig: vi.fn().mockResolvedValue({
          anthropicApiKey: 'fake-api-key',
        }),
      };
    }),
  };
});

// Mock AI SDK
vi.mock('ai', () => {
  return {
    generateText: vi.fn().mockResolvedValue({
      output: {
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
        shotBreakdowns: [
          {
            id: 'shot-1',
            description: 'A person standing on a mountain',
            subject: 'Person',
            outfit: 'Hiking gear',
            pose: 'Standing tall',
            environment: 'Mountain top',
            camera: 'Eye level',
            lens: '35mm',
            shotType: 'Wide',
          }
        ],
      },
    }),
    Output: {
      object: vi.fn().mockReturnValue({}),
    },
  };
});

describe('SynthesisService', () => {
  it('should extract a brief with shot breakdowns from markdown', async () => {
    const service = new SynthesisService();
    const markdown = '# Creative Brief\n\nBrand: Test Brand\n\nShot 1: A person standing on a mountain wearing hiking gear.';
    
    const brief = await service.extractBrief(markdown);
    
    expect(brief.brand).toBe('Test Brand');
    expect(brief.shotBreakdowns).toBeDefined();
    expect(brief.shotBreakdowns.length).toBeGreaterThan(0);
    expect(brief.shotBreakdowns[0].subject).toBe('Person');
  });

  it('should return empty shotBreakdowns if no shots are found', async () => {
    const { generateText } = await import('ai');
    (generateText as any).mockResolvedValueOnce({
      output: {
        brand: 'No Shots Brand',
        projectGoal: 'Test Goal',
        artDirection: {
          visualStyle: 'Modern',
          colorPalette: ['Blue'],
          lighting: 'Bright',
        },
        mood: 'Energetic',
        constraints: [],
        deliverables: ['soul-v2'],
        shotBreakdowns: [],
      },
    });

    const service = new SynthesisService();
    const brief = await service.extractBrief('Just some text without shots.');
    
    expect(brief.shotBreakdowns).toEqual([]);
  });
});
