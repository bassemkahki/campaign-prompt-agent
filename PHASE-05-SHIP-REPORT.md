# Phase 5 Ship Report: Keyless Host-Delegation

**Date:** 2026-06-04
**Status:** Shipped (Local)
**Branch:** `gsd/phase-05-keyless-host-delegation`

## Summary

**Phase 5: Keyless Host-Delegation**
**Goal:** Make the agent installable and invokable on both Claude Code and Gemini CLI with **no API keys**, while preserving the exact same tool surface and behavior.
**Status:** Verified ✓

The only step that previously required an API key was document synthesis — `ingest_campaign_doc`
used the Vercel AI SDK + Anthropic API to turn parsed documentation into a structured brief. Since
the agent already runs inside a host CLI (Claude Code / Gemini CLI) that is itself an LLM, this phase
delegates that reasoning to the host model and removes the API dependency entirely. The six tools are
unchanged; `ingest_campaign_doc` became a two-phase, keyless protocol on the same tool name.

## Changes

### Keyless core
- **`src/services/synthesis.ts`** — removed the Vercel AI SDK / Anthropic call. `SynthesisService`
  now exposes `buildExtractionInstructions()` (the extraction guidance + schema skeleton handed to
  the host model) and `validateBrief()` (Zod validation, `shot-N` id backfill, ≤10-shot cap).
- **`src/mcp/server.ts`** — `ingest_campaign_doc` is now two-phase: `{path}` returns extraction
  instructions + parsed Markdown (no save, no API call); `{path, brief}` validates and persists.
- **`src/services/config.ts`** — dropped all API-key fields; keeps `projectName` / `storageRoot`.
- **`package.json`** — removed `ai` and `@ai-sdk/anthropic` (9 packages removed).
- **`config.template.json`** — removed API-key keys.

### Install / invocability
- **`install.js`** — fixed Claude Code MCP registration to user scope via `claude mcp add`
  (fallback: merge `~/.claude.json`); previously wrote the ineffective `~/.claude/claude.json`.
  Keeps Gemini `~/.gemini/settings.json` registration; installs a Gemini `/campaign-prompt-agent`
  slash command.
- **`install/campaign-prompt-agent.md`** — fixed subagent `tools:` frontmatter to fully-qualified
  `mcp__campaign-prompt-agent__*` ids (+ `check_campaign_readiness`); documented the two-phase flow.
- **`install/campaign-prompt-agent.toml`** — new Gemini custom command carrying the same persona.

### Docs + tests
- **`README.md`**, **`CLAUDE.md`** — replaced API-key configuration with the keyless model.
- **`tests/synthesis.test.ts`**, **`tests/ingestion.test.ts`**, **`tests/config.test.ts`** — updated
  for the keyless two-phase flow.

## Requirements Addressed

- **No-Key Operation**: Eliminated all API-key dependencies; synthesis runs on the host CLI's model.
- **Multi-CLI Install**: Correct MCP registration + invocation assets for both Claude Code and Gemini.
- **Tool Parity**: Same 6 tools; deterministic generation/validation behavior unchanged.

## Verification

- [x] `npm run build`: PASS (tsc clean, no AI-SDK imports remain)
- [x] `npm test`: PASS (8 files, 33 tests)
- [x] Phase-1 ingest returns instructions + Markdown and persists nothing.
- [x] Phase-2 ingest validates and saves the brief; invalid briefs return `isError`.
- [x] `npm run install-agent` registers the MCP server (verified via `claude mcp list`).
- [x] Repo grep confirms no `ANTHROPIC_API_KEY` / `@ai-sdk` / `apiKey` paths remain.

## Key Decisions

- **Host-delegation over embedded API**: The host CLI's model performs synthesis — no keys, no SDK.
- **Overloaded `ingest_campaign_doc`**: Two-phase on one tool name keeps the exact tool surface.
- **Fully keyless**: Removed the AI SDK rather than keeping an optional keyed fallback.

---
*Phase 5 — keyless host-delegation adaptation.*
