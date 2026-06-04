# Phase 01: Foundation & Analysis - Context

**Gathered:** June 2, 2026
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the MCP backbone and creative ingestion pipeline. Deliver a functioning MCP server installable locally that can parse campaign documentation (PDF, PPTX, MD) into a structured format stored within the project.

</domain>

<decisions>
## Implementation Decisions

### MCP Architecture
- **D-01: Transport Method**: Use **Stdio (Standard I/O)**. This ensures standard compatibility with Claude Code and Gemini CLI without needing a local web server (SSE).
- **D-02: Backend Framework**: Use **Vercel AI SDK** and **Docling** for high-fidelity ingestion (as noted in project state).

### Data Persistence
- **D-03: Storage Strategy**: Store campaign data in **JSON files** within a hidden `.campaign/` folder in the project root. This ensures project-level isolation and human-readability.
- **D-04: Project Isolation**: All processing and storage MUST remain local to the project directory.

### Ingestion Strategy
- **D-05: Extraction Schema**: Use a **Structured Canonical Brief Schema**. Ingested documents (PDF/PPTX) will be parsed into defined fields: `Brand`, `Art Direction`, `Mood`, `Visual Style`, and `Constraints`.

### Configuration & Secrets
- **D-06: Config Management**: Use a `config.json` file for project-specific settings and API keys.
- **D-07: Secret Safety**: The `config.json` file MUST be added to `.gitignore`. A `config.template.json` should be provided for setup.

### Claude's Discretion
- Exact JSON structure for the brief schema.
- Selection of specific MCP libraries (e.g., `@modelcontextprotocol/sdk`).
- Internal folder structure within `.campaign/`.

</decisions>

<specifics>
## Specific Ideas

- "I want the ingestion to be robust enough to handle messy PPTX moodboards."
- "The agent should feel like a specialized creative director's assistant."

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Foundation
- `.planning/PROJECT.md` — Core value and out-of-scope definitions.
- `.planning/REQUIREMENTS.md` — BACK-01, BACK-02, ANAL-01, WORK-02 requirements.
- `.planning/ROADMAP.md` — SUCCESS_CRITERIA for Phase 1.

### Technical Context
- `get-shit-done/references/scout-codebase.md` — Guidelines for scanning codebase.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — This is a fresh project initialization.

### Established Patterns
- MCP standard patterns for Node.js/TypeScript servers.

### Integration Points
- Primary integration is via the MCP stdio interface with Claude Code/Gemini CLI.

</code_context>

<deferred>
## Deferred Ideas

- **Soul HEX Auto-Extraction**: Automatically extract color palettes from images (v2).
- **Identity Lock (Soul ID)**: Character consistency management (v2).
- **Direct Asset Generation**: Out of scope (text prompts only).

</deferred>

---

*Phase: 01-foundation-analysis*
*Context gathered: June 2, 2026*
