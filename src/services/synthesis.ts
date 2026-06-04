import { CreativeBrief, CreativeBriefSchema } from '../schema/brief.js';

/**
 * SynthesisService
 *
 * Keyless brief synthesis. The Campaign Prompt Agent runs *inside* a host CLI
 * (Claude Code / Gemini CLI) which is already an LLM, so the extraction reasoning
 * that previously required a separate Anthropic API call is delegated to the host
 * model instead. This service therefore does NOT call any external model — it only:
 *
 *   1. Builds the extraction instructions + target schema for the host model to follow
 *      (`buildExtractionInstructions`).
 *   2. Validates and normalizes the structured brief the host returns
 *      (`validateBrief`).
 */
export class SynthesisService {
  /** Maximum number of shots we keep from a single document. */
  static readonly MAX_SHOTS = 10;

  /**
   * Returns the instructions the host model should follow to turn parsed campaign
   * documentation (Markdown) into a structured CreativeBrief. This is the same
   * extraction guidance the old API call used, now surfaced to the host CLI's model.
   */
  buildExtractionInstructions(): string {
    return [
      'Analyze the campaign documentation below and extract a structured creative brief.',
      '',
      'For each individual shot or scene mentioned, extract:',
      '- subject: Who or what is the focus?',
      '- outfit: What is the subject wearing?',
      '- pose: What is the subject doing?',
      '- environment: Where is the shot taking place?',
      '- camera / lens / shotType: Technical details if mentioned.',
      '',
      `LIMIT: Do not extract more than ${SynthesisService.MAX_SHOTS} shots. If there are more, pick the most representative ones.`,
      'Give each shot a stable, unique id (e.g. "shot-1", "shot-2", ...). Fill in every field you can infer; leave optional fields out if truly unknown.',
      '',
      'Then call `ingest_campaign_doc` AGAIN with the SAME `path` plus a `brief` argument',
      'matching this JSON shape:',
      '',
      this.briefSchemaSkeleton(),
    ].join('\n');
  }

  /** A human-readable JSON skeleton of the CreativeBrief schema for the host model. */
  briefSchemaSkeleton(): string {
    const skeleton = {
      brand: 'string',
      projectGoal: 'string',
      artDirection: {
        visualStyle: 'string',
        colorPalette: ['string'],
        lighting: 'string',
      },
      mood: 'string',
      constraints: ['string'],
      deliverables: ['soul-v2 | soul-cinema | seedance-2'],
      shotBreakdowns: [
        {
          id: 'string (unique, e.g. "shot-1")',
          description: 'string',
          subject: 'string',
          outfit: 'string',
          pose: 'string',
          environment: 'string',
          camera: 'string',
          lens: 'string',
          shotType: 'string',
          lightingOverride: 'string (optional)',
          motionIntensity: 'number 1-10 (optional)',
          motionDirection: 'string (optional)',
          actionDelta: 'string (optional)',
          soulId: 'string (optional)',
        },
      ],
    };
    return JSON.stringify(skeleton, null, 2);
  }

  /**
   * Validates and normalizes a structured brief produced by the host model.
   * - Backfills missing shot ids as `shot-N`.
   * - Enforces the schema via Zod (throws on invalid input).
   * - Caps shotBreakdowns at MAX_SHOTS.
   */
  validateBrief(raw: unknown): CreativeBrief {
    if (!raw || typeof raw !== 'object') {
      throw new Error('No brief provided to validate.');
    }

    // Backfill stable shot ids before validation so the host isn't forced to invent them.
    const candidate: any = { ...(raw as any) };
    if (Array.isArray(candidate.shotBreakdowns)) {
      candidate.shotBreakdowns = candidate.shotBreakdowns.map((shot: any, index: number) => {
        if (!shot || typeof shot !== 'object') return shot;
        if (!shot.id || String(shot.id).trim() === '') {
          return { ...shot, id: `shot-${index + 1}` };
        }
        return shot;
      });
    }

    const brief = CreativeBriefSchema.parse(candidate);

    if (brief.shotBreakdowns && brief.shotBreakdowns.length > SynthesisService.MAX_SHOTS) {
      brief.shotBreakdowns = brief.shotBreakdowns.slice(0, SynthesisService.MAX_SHOTS);
    }

    return brief;
  }
}
