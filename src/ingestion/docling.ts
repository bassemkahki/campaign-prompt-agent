import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

export class IngestionService {
  async parse(filePath: string): Promise<string> {
    const absolutePath = path.resolve(filePath);
    const ext = path.extname(absolutePath).toLowerCase();

    if (ext === '.md') {
      return await fs.readFile(absolutePath, 'utf-8');
    }

    try {
      // Execute docling CLI to convert to markdown
      // Using --to md as per Pattern 2
      const output = execSync(`docling "${absolutePath}" --to md`).toString();
      return output;
    } catch (error) {
      console.error(`Docling conversion failed for ${filePath}:`, error);
      throw new Error(`Failed to parse document ${path.basename(filePath)}. Ensure docling is installed.`);
    }
  }
}
