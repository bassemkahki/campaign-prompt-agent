import { generateText, Output } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { CreativeBrief, CreativeBriefSchema } from '../schema/brief.ts';
import { ConfigService } from './config.js';

export class SynthesisService {
  private configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  async extractBrief(markdown: string): Promise<CreativeBrief> {
    const config = await this.configService.getConfig();
    if (!config.anthropicApiKey) {
      throw new Error('Anthropic API key not found in config.json');
    }

    const { output: brief } = await generateText({
      model: anthropic('claude-3-5-sonnet-latest', {
        apiKey: config.anthropicApiKey,
      }),
      output: Output.object({ schema: CreativeBriefSchema }),
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
    });

    // Ensure we don't exceed the 10-shot cap (though the prompt asks for it, we enforce it here too)
    if (brief.shotBreakdowns && brief.shotBreakdowns.length > 10) {
      brief.shotBreakdowns = brief.shotBreakdowns.slice(0, 10);
    }

    return brief;
  }
}
