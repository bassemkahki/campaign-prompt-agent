import fs from 'fs/promises';
import path from 'path';

export class StorageService {
  private storageRoot: string;

  constructor(storageRoot?: string) {
    this.storageRoot = storageRoot || path.join(process.cwd(), '.campaign');
  }

  async ensureStorage(): Promise<void> {
    await fs.mkdir(path.join(this.storageRoot, 'briefs'), { recursive: true });
    await fs.mkdir(path.join(this.storageRoot, 'sources'), { recursive: true });
  }

  async saveBrief(id: string, brief: any): Promise<void> {
    const filePath = path.join(this.storageRoot, 'briefs', `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(brief, null, 2));
  }

  async getBrief(id: string): Promise<any> {
    const filePath = path.join(this.storageRoot, 'briefs', `${id}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }

  async listBriefs(): Promise<string[]> {
    const briefsDir = path.join(this.storageRoot, 'briefs');
    const files = await fs.readdir(briefsDir);
    return files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  }
}
