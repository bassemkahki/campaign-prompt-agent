import { CreativeBrief } from '../schema/brief.js';

export interface ShotReadinessReport {
  shotId: string;
  missing: string[];
}

export interface ChecklistReport {
  isReady: boolean;
  missingGlobal: string[];
  missingPerShot: ShotReadinessReport[];
}

export class ValidationService {
  /**
   * Checks the readiness of a creative brief for prompt generation.
   * Identifies missing critical global and shot-level data.
   */
  checkReadiness(brief: CreativeBrief): ChecklistReport {
    const missingGlobal: string[] = [];
    const missingPerShot: ShotReadinessReport[] = [];

    // 1. Global Checks
    if (!brief.brand || brief.brand.trim() === '') {
      missingGlobal.push('brand');
    }
    if (!brief.projectGoal || brief.projectGoal.trim() === '') {
      missingGlobal.push('projectGoal');
    }
    if (!brief.artDirection?.colorPalette || brief.artDirection.colorPalette.length === 0) {
      missingGlobal.push('colorPalette');
    }

    // 2. Shot-level Checks
    if (brief.shotBreakdowns && brief.shotBreakdowns.length > 0) {
      for (const shot of brief.shotBreakdowns) {
        const shotMissing: string[] = [];

        if (!shot.subject || shot.subject.trim() === '') {
          shotMissing.push('subject');
        }
        if (!shot.outfit || shot.outfit.trim() === '') {
          shotMissing.push('outfit');
        }
        if (!shot.pose || shot.pose.trim() === '') {
          shotMissing.push('pose');
        }
        if (!shot.camera || shot.camera.trim() === '') {
          shotMissing.push('camera');
        }
        if (!shot.soulId || shot.soulId.trim() === '') {
          shotMissing.push('soulId');
        }

        if (shotMissing.length > 0) {
          missingPerShot.push({
            shotId: shot.id,
            missing: shotMissing
          });
        }
      }
    }

    const isReady = missingGlobal.length === 0 && missingPerShot.length === 0;

    return {
      isReady,
      missingGlobal,
      missingPerShot
    };
  }

  /**
   * Formats the checklist report as a Markdown string.
   */
  formatChecklist(report: ChecklistReport): string {
    if (report.isReady) {
      return "✅ Campaign is ready! All critical data is present.";
    }

    let output = "📋 Campaign Readiness Checklist\n";
    output += "-------------------------------\n";

    if (report.missingGlobal.length > 0) {
      output += "\n### Global Missing Information\n";
      report.missingGlobal.forEach(item => {
        output += `- [ ] Missing ${item}\n`;
      });
    }

    if (report.missingPerShot.length > 0) {
      output += "\n### Shot-level Missing Information\n";
      report.missingPerShot.forEach(shotReport => {
        output += `\n**Shot: ${shotReport.shotId}**\n`;
        shotReport.missing.forEach(item => {
          output += `- [ ] Missing ${item}\n`;
        });
      });
    }

    output += "\nRecommendation: Please update the brief with the missing information to ensure high-quality prompt generation.";
    return output;
  }
}
