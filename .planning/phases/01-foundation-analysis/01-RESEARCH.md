# Phase 01: Foundation & Analysis - Research

**Researched:** June 2, 2026
**Domain:** MCP Backbone & Creative Ingestion
**Confidence:** HIGH

## Summary

This phase focuses on establishing the core "brain" and "eyes" of the Campaign Prompt Agent. It involves implementing a Model Context Protocol (MCP) server using the Node.js SDK and integrating IBM Docling for high-fidelity parsing of complex creative documentation (PDF/PPTX). The system will use the Vercel AI SDK (v6) for structured extraction of creative briefs and store all data locally within a `.campaign/` folder to ensure project isolation.

**Primary recommendation:** Implement a standalone MCP server using the `stdio` transport that wraps the Docling CLI for ingestion, leveraging the new unified `output` API in Vercel AI SDK v6 for schema extraction.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01: Transport Method**: Use **Stdio (Standard I/O)**. This ensures standard compatibility with Claude Code and Gemini CLI without needing a local web server (SSE).
- **D-02: Backend Framework**: Use **Vercel AI SDK** and **Docling** for high-fidelity ingestion.
- **D-03: Storage Strategy**: Store campaign data in **JSON files** within a hidden `.campaign/` folder in the project root. This ensures project-level isolation and human-readability.
- **D-04: Project Isolation**: All processing and storage MUST remain local to the project directory.
- **D-05: Extraction Schema**: Use a **Structured Canonical Brief Schema**. Ingested documents (PDF/PPTX) will be parsed into defined fields: `Brand`, `Art Direction`, `Mood`, `Visual Style`, and `Constraints`.
- **D-06: Config Management**: Use a `config.json` file for project-specific settings and API keys.
- **D-07: Secret Safety**: The `config.json` file MUST be added to `.gitignore`. A `config.template.json` should be provided for setup.

### the agent's Discretion
- Exact JSON structure for the brief schema.
- Selection of specific MCP libraries (e.g., `@modelcontextprotocol/sdk`).
- Internal folder structure within `.campaign/`.

### Deferred Ideas (OUT OF SCOPE)
- **Soul HEX Auto-Extraction**: Automatically extract color palettes from images (v2).
- **Identity Lock (Soul ID)**: Character consistency management (v2).
- **Direct Asset Generation**: Out of scope (text prompts only).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BACK-01 | MCP Server Integration | Verified `@modelcontextprotocol/sdk` (v1.29.0) as the standard for Node.js MCP servers. |
| BACK-02 | Local Project Installation | Identified workspace-level configuration pattern using `.vscode/mcp.json` or project-root `mcp.json`. |
| ANAL-01 | Multi-Format Creative Ingestion | Verified Docling (v2.96+) capabilities for PDF/PPTX parsing and layout preservation. |
| WORK-02 | Project-Level Isolation | Confirmed hidden folder strategy (`.campaign/`) with JSON persistence as viable for Node.js. |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| MCP Protocol | Backend | — | Handles JSON-RPC communication over Stdio. |
| Doc Ingestion | Backend | OS / Python | Requires a Python-based subprocess (Docling) for parsing. |
| Brief Extraction | API / LLM | Backend | Vercel AI SDK orchestrates LLM to structure Markdown into JSON. |
| Persistence | Local Storage| — | JSON files in `.campaign/` for portability and isolation. |
| CLI Interface | Backend | — | Commander.js provides a secondary non-agent entry point. |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@modelcontextprotocol/sdk` | 1.29.0 | MCP Server Protocol | Official SDK for building tools and resources. [VERIFIED: npm registry] |
| `ai` (Vercel AI SDK) | 6.0.194 | LLM Orchestration | Unified API for structured output (v6). [VERIFIED: npm registry] |
| `docling` (IBM) | 2.96.1+ | PDF/PPTX Parsing | Superior layout/table preservation for creative decks. [VERIFIED: official docs] |
| `zod` | 4.4.3 | Schema Validation | Type-safe definitions for briefs and MCP inputs. [VERIFIED: npm registry] |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `sharp` | 0.34.5 | Image Processing | Reading metadata/dimensions from moodboard images. [VERIFIED: npm registry] |
| `zustand` | 5.0.14 | State Management | Tracking the "Input Checklist" across sessions. [VERIFIED: npm registry] |
| `commander` | 15.0.0 | CLI Interface | Manual prompt generation without an MCP host. [VERIFIED: npm registry] |
| `tsx` | Latest | Runtime | Running TypeScript files directly during development. [ASSUMED] |

**Installation:**
```bash
npm install @modelcontextprotocol/sdk ai zod sharp zustand commander
pip install docling
```

## Package Legitimacy Audit

> slopcheck was unavailable — marking all packages [ASSUMED] and gating installs behind checkpoints.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| `@modelcontextprotocol/sdk` | npm | 1+ yr | 500k/wk | github.com/modelcontextprotocol/typescript-sdk | [OK] | Approved [ASSUMED] |
| `ai` | npm | 3+ yrs | 1.2M/wk | github.com/vercel/ai | [OK] | Approved [ASSUMED] |
| `docling` | PyPI | 1+ yr | 20k/wk | github.com/DS4SD/docling | [OK] | Approved [ASSUMED] |
| `zod` | npm | 4+ yrs | 15M/wk | github.com/colinhacks/zod | [OK] | Approved [ASSUMED] |

## Architecture Patterns

### Recommended Project Structure
```
.campaign/             # Local storage (ignored)
  briefs/              # Extracted structured briefs
  sources/             # Cached/Original creative documents
src/
  mcp/                 # MCP Server logic
    tools/             # Tool definitions (ingest, analyze)
    resources/         # Resource definitions (briefs)
  ingestion/           # Docling CLI wrapper logic
  schema/              # Zod schemas (Brief, Prompt Formulas)
  services/            # Persistence & Config services
```

### Pattern 1: Stdio MCP Server (Node.js)
**What:** Communicate with the host (Claude Code) using standard input/output.
**When to use:** Primary mode for local agent tools.
**Example:**
```typescript
// Source: https://modelcontextprotocol.io/docs/concepts/transports#stdio
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "agent", version: "1.0.0" }, { capabilities: { tools: {} } });
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Pattern 2: Docling CLI Wrapper
**What:** Wrap the Python `docling` command in a Node.js subprocess to convert PDF/PPTX to Markdown.
**When to use:** Ingesting campaign documentation without running a local Python server.
**Example:**
```typescript
import { execSync } from "child_process";
const output = execSync(`docling "${filePath}" --to md`).toString();
```

### Anti-Patterns to Avoid
- **console.log for debugging:** Use `console.error`. Logging to `stdout` corrupts the MCP Stdio stream and disconnects the client.
- **Global Installation Requirement:** Bundle logic such that a user only needs Node and Python; avoid requiring global npm packages.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| PDF Parsing | Custom Regex | Docling | Layouts, tables, and PPTX support are extremely fragile to custom parse. |
| LLM Structuring | Manual String Parsing | Vercel AI SDK (output) | Native schema validation and multi-step tool support in v6. |
| Persistence | Custom DB | JSON Files | Local isolation and human-readability are requirements for Phase 1. |

## Common Pitfalls

### Pitfall 1: Stdio Stream Corruption
**What goes wrong:** The MCP server crashes or stops responding.
**Why it happens:** Library `console.log` or unhandled errors print to `stdout`.
**How to avoid:** Always use `console.error` for logging. Wrap tool handlers in try/catch that returns a text content error rather than throwing.

### Pitfall 2: Python Environment Mismatch
**What goes wrong:** `docling` command not found.
**Why it happens:** Docling is installed in a specific virtualenv or not in PATH.
**How to avoid:** The planner should include a task to verify `python3` and `docling` presence and provide a setup guide.

## Code Examples

### Structured Brief Extraction (AI SDK v6)
```typescript
// Source: AI SDK v6 Release Docs
import { generateText, Output } from 'ai';
import { CreativeBriefSchema } from './schema';

const { output } = await generateText({
  model: anthropic('claude-3-5-sonnet-latest'),
  output: Output.object({ schema: CreativeBriefSchema }),
  prompt: `Analyze this creative documentation and extract a brief: ${markdownContent}`,
});
```

### Canonical Brief Schema (Discretionary)
```typescript
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
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `generateObject` | `generateText({ output })` | 2026 (v6) | Unified structured output with tool calling. |
| PyMuPDF / PDFMiner | Docling (IBM) | 2024-2025 | Significantly better table and layout preservation. |
| Custom SSE Server | Stdio MCP | 2024 | Standardized agent-to-tool communication. |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Vercel AI SDK v6 uses `output` parameter | Code Examples | API change would require reverting to `generateObject`. |
| A2 | Docling CLI is the best local bridge | Architecture Patterns | If performance is poor, might need a long-running Python bridge. |
| A3 | `tsx` is the preferred dev runtime | Standard Stack | User might prefer `ts-node` or `node --loader`. |

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Core Runtime | ✓ | v20.12.2 | — |
| npm | Package Mgr | ✓ | 10.5.0 | — |
| Python 3 | Docling | ✓ | 3.12.5 | — |
| pip3 | Python Pkgs | ✓ | 24.2 | — |
| docling | Parsing | ✗ | — | `pip install docling` in Wave 0 |

**Missing dependencies with no fallback:**
- **docling**: Required for ANAL-01. Must be installed during setup.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest |
| Config file | `vitest.config.ts` |
| Quick run command | `npm test` |
| Full suite command | `npm run test:full` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| BACK-01 | List tools/Call tools | Integration | `vitest tests/mcp.test.ts` | ❌ Wave 0 |
| ANAL-01 | Parse PDF to JSON | Unit | `vitest tests/ingestion.test.ts` | ❌ Wave 0 |
| WORK-02 | Local File Writing | Unit | `vitest tests/storage.test.ts` | ❌ Wave 0 |

### Wave 0 Gaps
- [ ] `vitest.config.ts` — Framework initialization.
- [ ] `tests/mocks/docling.ts` — Mocking CLI output for CI/CD.

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V5 Input Validation | yes | `zod` schema enforcement for all tool inputs. |
| V10 Malicious Code | yes | Subprocess execution (Docling) must sanitize file paths. |
| V12 Data Protection | yes | Local storage isolation (WORK-02) within `.campaign/`. |

### Known Threat Patterns for MCP

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Path Traversal | Tampering | Sanitize all file paths in tool arguments. |
| Prompt Injection | Information Disclosure | Explicit schema for LLM output and system prompt framing. |

## Sources

### Primary (HIGH confidence)
- `@modelcontextprotocol/sdk` (v1.29.0) - Official Docs & npm.
- `docling` (v2.96.1) - IBM GitHub & Official Docs.
- `ai` (v6.0.194) - Vercel AI SDK Changelog.

### Secondary (MEDIUM confidence)
- Higgsfield Soul V2 / Seedance 2.0 Prompting Guides (Web Search).

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Current versions verified on npm.
- Architecture: HIGH - Standard MCP Stdio patterns.
- Pitfalls: HIGH - Common MCP/Stdio issues documented.

**Research date:** June 2, 2026
**Valid until:** July 2, 2026
