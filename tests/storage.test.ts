import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StorageService } from '../src/services/storage.js';
import fs from 'fs/promises';
import path from 'path';

describe('StorageService', () => {
  const STORAGE_ROOT = path.join(process.cwd(), '.campaign-test');
  let storageService: StorageService;

  beforeEach(async () => {
    storageService = new StorageService(STORAGE_ROOT);
    await storageService.ensureStorage();
  });

  afterEach(async () => {
    await fs.rm(STORAGE_ROOT, { recursive: true, force: true });
  });

  it('should create storage directories', async () => {
    const briefsExists = await fs.stat(path.join(STORAGE_ROOT, 'briefs')).then(() => true).catch(() => false);
    const sourcesExists = await fs.stat(path.join(STORAGE_ROOT, 'sources')).then(() => true).catch(() => false);
    expect(briefsExists).toBe(true);
    expect(sourcesExists).toBe(true);
  });

  it('should save and load a brief', async () => {
    const briefId = 'test-brief';
    const briefData = { brand: 'Test Brand', projectGoal: 'Test Goal' };
    
    await storageService.saveBrief(briefId, briefData);
    const loadedBrief = await storageService.getBrief(briefId);
    
    expect(loadedBrief).toEqual(briefData);
  });
});
