import { CreativeBrief } from '../schema/brief';
import { PromptOutput } from '../schema/prompt';

export class PromptEngineerService {
  /**
   * Generates a Soul V2 stylized prompt based on the creative brief and a specific shot.
   * Formula: [Subject] wearing [Outfit], [Pose/Action], shot on [Camera] with [Lighting].
   * Injects visual style and mood.
   */
  generateSoulV2(brief: CreativeBrief, shotId: string): PromptOutput {
    const shot = brief.shotBreakdowns.find(s => s.id === shotId);
    
    if (!shot) {
      throw new Error(`Shot with ID "${shotId}" not found in creative brief.`);
    }

    const { subject, outfit, pose, camera, lightingOverride } = shot;
    const { visualStyle, lighting: briefLighting } = brief.artDirection;
    const { mood } = brief;

    // Formula components
    const subjectPart = subject || "A model";
    const outfitPart = outfit ? `wearing ${outfit}` : "";
    const posePart = pose || "";
    const cameraPart = camera ? `shot on ${camera}` : "";
    const lightingPart = `with ${lightingOverride || briefLighting}`;
    
    // Style and Mood injection
    const stylePart = visualStyle ? `${visualStyle}` : "";
    const moodPart = mood ? `${mood}` : "";

    // Soul V2 Formula: [Subject] wearing [Outfit], [Pose/Action], shot on [Camera] with [Lighting].
    // We append the style and mood for higher fidelity.
    const promptParts = [
      `${subjectPart} ${outfitPart}`.trim(),
      posePart,
      cameraPart,
      lightingPart,
      stylePart,
      moodPart
    ].filter(part => part.length > 0);

    const prompt = promptParts.join(", ");

    return {
      shotId,
      model: "soul-v2",
      prompt,
      metadata: {
        formula: "subject + outfit + pose + camera + lighting + style + mood"
      }
    };
  }
}
