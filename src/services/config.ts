import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

export const ConfigSchema = z.object({
  projectName: z.string().default('Campaign Prompt Agent'),
  anthropicApiKey: z.string().optional(),
  openaiApiKey: z.string().optional(),
  googleApiKey: z.string().optional(),
  storageRoot: z.string().default('.campaign'),
});

export type Config = z.infer<typeof ConfigSchema>;

export class ConfigService {
  private configPath: string;

  constructor(configPath?: string) {
    this.configPath = configPath || path.join(process.cwd(), 'config.json');
  }

  async getConfig(): Promise<Config> {
    let json = {};
    try {
      const data = await fs.readFile(this.configPath, 'utf-8');
      json = JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is invalid, use empty object to trigger defaults
    }

    const config = ConfigSchema.parse(json);

    // Fallback to environment variables
    config.anthropicApiKey = config.anthropicApiKey || 
      process.env.ANTHROPIC_API_KEY || 
      process.env.CLAUDE_API_KEY;
    
    config.googleApiKey = config.googleApiKey || 
      process.env.GOOGLE_API_KEY || 
      process.env.GEMINI_API_KEY;
    
    config.openaiApiKey = config.openaiApiKey || 
      process.env.OPENAI_API_KEY;

    return config;
  }

  async saveConfig(config: Partial<Config>): Promise<void> {
    const currentConfig = await this.getConfig();
    const newConfig = { ...currentConfig, ...config };
    await fs.writeFile(this.configPath, JSON.stringify(newConfig, null, 2));
  }
}
