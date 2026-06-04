import { generateObject } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { CreativeBrief, CreativeBriefSchema } from '../schema/brief.js';
import { ConfigService } from './config.js';

export class SynthesisService {
  private configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  async extractBrief(markdown: string): Promise<CreativeBrief> {
    const config = await this.configService.getConfig();
    if (!config.anthropicApiKey) {
      throw new Error('Anthropic API key not found. Please provide it in config.json or set ANTHROPIC_API_KEY environment variable.');
    }

    const anthropic = createAnthropic({
      apiKey: config.anthropicApiKey,
    });

    const { object: brief } = (await generateObject({
      model: anthropic('claude-3-5-sonnet-latest'),
      schema: CreativeBriefSchema as any,
      prompt: `Analyze the following campaign creative documentation and extract a structured creative brief.
      
      Specifically, identify individual shots or scenes mentioned in the text. For each shot, extract:
      - Subject: Who or what is the focus?
      - Outfit: What is the subject wearing?
      - Pose: What is the subject doing?
      - Environment: Where is the shot taking place?
      - Camera/Lens/Shot Type: Technical details if mentioned.
      
      LIMIT: Do not extract more than 10 shots. If there are more, pick the most representative ones.
      
      Markdown Content:
      ${markdown}`,
    })) as { object: CreativeBrief };

    if (!brief) {
      throw new Error('Failed to extract brief from documentation.');
    }

    // Ensure we don't exceed the 10-shot cap (though the prompt asks for it, we enforce it here too)
    if (brief.shotBreakdowns && brief.shotBreakdowns.length > 10) {
      brief.shotBreakdowns = brief.shotBreakdowns.slice(0, 10);
    }

    return brief as CreativeBrief;
  }
}
