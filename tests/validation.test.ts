import { describe, it, expect } from 'vitest';
import { ValidationService } from '../src/services/validation.js';
import { CreativeBrief } from '../src/schema/brief.js';

describe('ValidationService', () => {
  const service = new ValidationService();

  const completeBrief: CreativeBrief = {
    brand: 'Test Brand',
    projectGoal: 'Test Goal',
    artDirection: {
      visualStyle: 'Cinematic',
      colorPalette: ['#FF0000', '#00FF00'],
      lighting: 'Golden Hour'
    },
    mood: 'Epic',
    constraints: [],
    deliverables: ['soul-v2'],
    shotBreakdowns: [
      {
        id: 'shot-1',
        description: 'Test shot',
        subject: 'Model',
        outfit: 'Red dress',
        pose: 'Standing',
        environment: 'Studio',
        camera: 'ARRI Alexa',
        lens: '35mm',
        shotType: 'MCU',
        soulId: 'soul-123'
      }
    ]
  };

  const incompleteBrief: CreativeBrief = {
    brand: '',
    projectGoal: 'Test Goal',
    artDirection: {
      visualStyle: 'Cinematic',
      colorPalette: [],
      lighting: 'Golden Hour'
    },
    mood: 'Epic',
    constraints: [],
    deliverables: ['soul-v2'],
    shotBreakdowns: [
      {
        id: 'shot-1',
        description: 'Test shot',
        subject: '',
        outfit: '',
        pose: '',
        environment: 'Studio',
        camera: '',
        lens: '35mm',
        shotType: 'MCU'
      }
    ]
  };

  it('should return isReady: true for a complete brief', () => {
    const report = service.checkReadiness(completeBrief);
    expect(report.isReady).toBe(true);
    expect(report.missingGlobal).toHaveLength(0);
    expect(report.missingPerShot).toHaveLength(0);
  });

  it('should identify missing global data', () => {
    const report = service.checkReadiness(incompleteBrief);
    expect(report.isReady).toBe(false);
    expect(report.missingGlobal).toContain('brand');
    expect(report.missingGlobal).toContain('colorPalette');
  });

  it('should identify missing shot-level data', () => {
    const report = service.checkReadiness(incompleteBrief);
    expect(report.isReady).toBe(false);
    const shotReport = report.missingPerShot.find(s => s.shotId === 'shot-1');
    expect(shotReport).toBeDefined();
    expect(shotReport?.missing).toContain('subject');
    expect(shotReport?.missing).toContain('outfit');
    expect(shotReport?.missing).toContain('pose');
    expect(shotReport?.missing).toContain('camera');
    expect(shotReport?.missing).toContain('soulId');
  });

  it('should format a checklist correctly', () => {
    const report = service.checkReadiness(incompleteBrief);
    const checklist = service.formatChecklist(report);
    expect(checklist).toContain('📋 Campaign Readiness Checklist');
    expect(checklist).toContain('- [ ] Missing brand');
    expect(checklist).toContain('- [ ] Missing subject');
  });
});
