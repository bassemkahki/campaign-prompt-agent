# Phase 01: Foundation & Analysis - Pattern Map

**Mapped:** June 2, 2026
**Files analyzed:** 16
**Analogs found:** 4 / 16 (Specific to project logic, others use standard Node/TS/Vitest patterns)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `package.json` | config | N/A | (Standard Node.js) | N/A |
| `tsconfig.json` | config | N/A | (Standard TypeScript) | N/A |
| `.gitignore` | config | N/A | (Standard Git) | N/A |
| `config.json` | config | N/A | (Standard JSON) | N/A |
| `config.template.json` | config | N/A | (Standard JSON) | N/A |
| `src/mcp/server.ts` | controller | request-response | `RESEARCH.md` Pattern 1 | exact |
| `src/mcp/tools/index.ts` | controller | request-response | (MCP Tool pattern) | exact |
| `src/mcp/resources/index.ts` | controller | request-response | (MCP Resource pattern) | exact |
| `src/ingestion/docling.ts` | service | file-I/O | `RESEARCH.md` Pattern 2 | exact |
| `src/schema/brief.ts` | model | N/A | `RESEARCH.md` Brief Schema | exact |
| `src/services/storage.ts` | service | file-I/O | (Standard Node.js fs) | N/A |
| `src/services/config.ts` | service | N/A | (Standard Config pattern) | N/A |
| `vitest.config.ts` | config | N/A | (Standard Vitest) | N/A |
| `tests/mcp.test.ts` | test | request-response | (Standard Vitest/MCP) | N/A |
| `tests/ingestion.test.ts` | test | file-I/O | (Standard Vitest) | N/A |
| `tests/storage.test.ts` | test | file-I/O | (Standard Vitest) | N/A |

## Pattern Assignments

### `src/mcp/server.ts` (controller, request-response)

**Analog:** `RESEARCH.md` Pattern 1: Stdio MCP Server (Node.js)

**Core Pattern:**
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "campaign-prompt-agent", version: "0.1.0" },
  { capabilities: { tools: {}, resources: {} } }
);

const transport = new StdioServerTransport();

// Error handling: logging to stderr to avoid corrupting stdout
server.onerror = (error) => console.error("[MCP Error]", error);

// Tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "ingest_campaign_doc",
      description: "Ingest PDF/PPTX campaign documentation",
      inputSchema: { /* zod-to-json-schema */ }
    }
  ]
}));

await server.connect(transport);
```

---

### `src/ingestion/docling.ts` (service, file-I/O)

**Analog:** `RESEARCH.md` Pattern 2: Docling CLI Wrapper

**Core Pattern:**
```typescript
import { execSync } from "child_process";
import path from "path";

export class IngestionService {
  async convertToMarkdown(filePath: string): Promise<string> {
    // Path sanitization is critical
    const absolutePath = path.resolve(filePath);
    try {
      // Execute docling CLI to convert to markdown
      const output = execSync(`docling "${absolutePath}" --to md`).toString();
      return output;
    } catch (error) {
      console.error(`Docling conversion failed for ${filePath}:`, error);
      throw new Error("Failed to parse document");
    }
  }
}
```

---

### `src/schema/brief.ts` (model)

**Analog:** `RESEARCH.md` Canonical Brief Schema

**Core Pattern:**
```typescript
import { z } from "zod";

export const CreativeBriefSchema = z.object({
  brand: z.string(),
  projectGoal: z.string(),
  artDirection: z.object({
    visualStyle: z.string(),
    colorPalette: z.array(z.string()),
    lighting: z.string(),
  }),
  mood: z.string().describe("Atmospheric description (e.g., 'Ethereal', 'Gritty')"),
  constraints: z.array(z.string()),
  deliverables: z.array(z.enum(["soul-v2", "soul-cinema", "seedance-2"])),
});

export type CreativeBrief = z.infer<typeof CreativeBriefSchema>;
```

---

### `src/services/storage.ts` (service, file-I/O)

**Pattern:** Standard Node.js `fs/promises` with path sanitization.

**Core Pattern:**
```typescript
import fs from "fs/promises";
import path from "path";

const STORAGE_ROOT = path.join(process.cwd(), ".campaign");

export class StorageService {
  async ensureStorage() {
    await fs.mkdir(path.join(STORAGE_ROOT, "briefs"), { recursive: true });
    await fs.mkdir(path.join(STORAGE_ROOT, "sources"), { recursive: true });
  }

  async saveBrief(id: string, brief: any) {
    const filePath = path.join(STORAGE_ROOT, "briefs", `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(brief, null, 2));
  }
}
```

---

## Shared Patterns

### Error Handling
**Pattern:** Logging to `console.error` in MCP context, never `console.log`.
**Apply to:** All files in `src/mcp`.
```typescript
try {
  // logic
} catch (error) {
  console.error("[Category]", error);
  return {
    content: [{ type: "text", text: `Error: ${error.message}` }],
    isError: true,
  };
}
```

### AI SDK Structured Extraction
**Source:** `RESEARCH.md` Structured Brief Extraction
**Apply to:** Ingestion tool handler
```typescript
import { generateText, Output } from 'ai';
import { anthropic } from '@ai-sdk/anthropic'; // or similar

const { output } = await generateText({
  model: anthropic('claude-3-5-sonnet-latest'),
  output: Output.object({ schema: CreativeBriefSchema }),
  prompt: `Analyze this creative documentation and extract a brief: ${markdownContent}`,
});
```

## No Analog Found

Files with no close match in the codebase (planner should use RESEARCH.md patterns instead):

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `src/services/config.ts` | service | N/A | Fresh implementation needed for local `config.json` |

## Metadata

**Analog search scope:** Current directory (empty), RESEARCH.md, .agent/get-shit-done/bin/lib
**Files scanned:** 16
**Pattern extraction date:** June 2, 2026
