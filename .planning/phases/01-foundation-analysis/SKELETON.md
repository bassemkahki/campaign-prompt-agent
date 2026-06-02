# Walking Skeleton — Campaign Prompt Agent

**Phase:** 1
**Generated:** 2026-06-02

## Capability Proven End-to-End

> An MCP host (Claude/Gemini) can connect to the agent, verify its local configuration, and extract a structured creative brief from a provided document.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Node.js + TypeScript + @modelcontextprotocol/sdk | Standard for building local agent tools with high developer experience and compatibility. |
| Transport | Stdio (Standard I/O) | Ensures seamless integration with Claude Code and Gemini CLI without requiring local network overhead or SSE. |
| Ingestion | IBM Docling (CLI) | Provides superior high-fidelity parsing of complex creative decks (PDF/PPTX) compared to standard libraries. |
| LLM Orchestration | Vercel AI SDK v6 | Unified API for structured output extraction using the new `output` parameter for reliability. |
| Data layer | Local JSON files in `.campaign/` | Ensures project-level isolation, human-readability, and zero-cost persistence as per requirements. |
| Directory layout | Feature-based `src/` subdirectories | `mcp/`, `ingestion/`, `schema/`, `services/` for clear separation of concerns. |

## Stack Touched in Phase 1

- [x] Project scaffold (package.json, tsconfig, vitest)
- [x] MCP Protocol — server init and tool registration
- [x] Local Storage — JSON persistence in `.campaign/`
- [x] Document Parsing — Docling CLI integration
- [x] AI Extraction — Vercel AI SDK structured output

## Out of Scope (Deferred to Later Slices)

- **Phase 2 specific formulas**: Soul V2, Soul Cinema, and Seedance-specific prompt engineering logic.
- **Multimodal Referencing**: The `@ImageN` syntax and cross-prompt consistency logic.
- **Input Checklist**: Advanced validation and missing field notification.
- **Visual Identity Lock**: Character and style consistency across different generation steps.

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions:

- Phase 2: Visual Synthesis & Image Engineering (Prompt formula generators)
- Phase 3: Motion & Multimodal Video (Video prompt engine)
- Phase 4: Workflow Optimization (Validation & readiness checklist)
