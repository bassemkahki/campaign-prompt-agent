import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

// The agent runs inside a host CLI (Claude Code / Gemini CLI) and delegates all
// model reasoning to that host, so no API keys are needed or read here.
export const ConfigSchema = z.object({
  projectName: z.string().default('Campaign Prompt Agent'),
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

    return ConfigSchema.parse(json);
  }

  async saveConfig(config: Partial<Config>): Promise<void> {
    const currentConfig = await this.getConfig();
    const newConfig = { ...currentConfig, ...config };
    await fs.writeFile(this.configPath, JSON.stringify(newConfig, null, 2));
  }
}
