import { CreativeBrief } from '../schema/brief';
import { PromptOutput } from '../schema/prompt';

const CINEMA_VOCAB = {
  cameras: ["ARRI Alexa 35", "RED Komodo", "Sony Venice", "IMAX", "35mm Film", "16mm Bolex"],
  lenses: ["Anamorphic", "Prime Lens", "24mm", "35mm", "50mm", "85mm"],
  lighting: ["Golden Hour", "Neon Glow", "Volumetric Fog", "Rim Lighting", "Chiaroscuro"]
};

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

  /**
   * Generates a Soul Cinema stylized prompt based on the creative brief and a specific shot.
   * Formula: [Shot Type] of [Subject], [Action]. [Environment]. Shot on [Camera] with [Lens]. [Lighting]. [Visual Style], [Technical Style].
   */
  generateSoulCinema(brief: CreativeBrief, shotId: string): PromptOutput {
    const shot = brief.shotBreakdowns.find(s => s.id === shotId);
    
    if (!shot) {
      throw new Error(`Shot with ID "${shotId}" not found in creative brief.`);
    }

    const { shotType, subject, pose, environment, camera, lens, lightingOverride } = shot;
    const { visualStyle, lighting: briefLighting } = brief.artDirection;

    // Sanitize technical gear to ensure we use approved vocabulary
    const finalCamera = this.matchVocab(camera, CINEMA_VOCAB.cameras, "ARRI Alexa 35");
    const finalLens = this.matchVocab(lens, CINEMA_VOCAB.lenses, "35mm");
    const finalLighting = lightingOverride || briefLighting;

    // Layered Pattern: [Shot Type] of [Subject], [Action]. [Environment]. Shot on [Camera] with [Lens]. [Lighting]. [Visual Style], [Technical Style].
    const prompt = `${shotType} of ${subject}, ${pose}. ${environment}. Shot on ${finalCamera} with ${finalLens}. ${finalLighting}. ${visualStyle}, Cinematic High Fidelity.`;

    return {
      shotId,
      model: "soul-cinema",
      prompt,
      metadata: {
        formula: "shotType + subject + action + environment + camera + lens + lighting + style + technical"
      }
    };
  }

  /**
   * Generates a Seedance 2.0 motion prompt using @ImageN multimodal resolution.
   * Logic: Identifies the 1-based index of the shot to reference the correct source image.
   */
  generateSeedance(brief: CreativeBrief, shotId: string): PromptOutput {
    const index = brief.shotBreakdowns.findIndex(s => s.id === shotId);
    
    if (index === -1) {
      throw new Error(`Shot with ID "${shotId}" not found in creative brief.`);
    }

    const shot = brief.shotBreakdowns[index];
    const imageRef = `@Image${index + 1}`;
    
    // Base prompt starts with multimodal reference
    const prompt = `${imageRef} ${shot.description}`;

    return {
      shotId,
      model: "seedance-2",
      prompt,
      metadata: {
        imageIndex: index + 1
      }
    };
  }

  private matchVocab(input: string, vocab: string[], fallback: string): string {
    const normalizedInput = input.toLowerCase();
    const match = vocab.find(term => 
      normalizedInput.includes(term.toLowerCase()) || 
      term.toLowerCase().includes(normalizedInput)
    );
    return match || fallback;
  }
}
