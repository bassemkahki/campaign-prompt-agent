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
    try {
      const data = await fs.readFile(this.configPath, 'utf-8');
      const json = JSON.parse(data);
      return ConfigSchema.parse(json);
    } catch (error) {
      // If file doesn't exist or is invalid, return defaults
      return ConfigSchema.parse({});
    }
  }

  async saveConfig(config: Partial<Config>): Promise<void> {
    const currentConfig = await this.getConfig();
    const newConfig = { ...currentConfig, ...config };
    await fs.writeFile(this.configPath, JSON.stringify(newConfig, null, 2));
  }
}
