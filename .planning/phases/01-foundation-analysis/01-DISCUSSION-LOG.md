# Phase 01: Foundation & Analysis - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** June 2, 2026
**Phase:** 1-Foundation & Analysis
**Areas discussed:** MCP Transport Method, Data Persistence Strategy, Ingestion Extraction Schema, Configuration Approach

---

## MCP Transport Method

| Option | Description | Selected |
|--------|-------------|----------|
| Stdio (Standard I/O) | Standard for local CLI agents (Claude Code/Gemini CLI). Simple and robust. | ✓ |
| SSE (Server-Sent Events) | Allows remote/web connections. More complex to set up locally. | |

**User's choice:** Stdio (Standard I/O)
**Notes:** Preferred for its simplicity and direct compatibility with the target platforms.

---

## Data Persistence Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| JSON files in .campaign/ folder | Human-readable, easy to edit/debug. Good for early versions. | ✓ |
| SQLite database in .campaign/ folder | Better for structured data and complex queries. Less readable without tools. | |

**User's choice:** JSON files in .campaign/ folder
**Notes:** Prioritizes transparency and ease of debugging for the MVP.

---

## Ingestion Extraction Schema

| Option | Description | Selected |
|--------|-------------|----------|
| Structured Canonical Brief Schema | Defines Brand, Art Direction, Mood, and Constraints. More predictable results. | ✓ |
| Raw Markdown/Text Dump | Store all extracted text/markdown. More flexible but less consistent. | |

**User's choice:** Structured Canonical Brief Schema
**Notes:** Chosen to ensure downstream prompt engineering has consistent, high-quality inputs.

---

## Configuration Approach

| Option | Description | Selected |
|--------|-------------|----------|
| .env file (Local secrets) | Standard for dev tools. Best for secrets (API keys). | |
| config.json (Project settings) | Good for project-specific settings (paths, preferences). non-sensitive. | ✓ |
| Hybrid (.env + config.json) | Both: .env for secrets, config.json for non-sensitive project settings. | |

**User's choice:** config.json (Project settings)
**Notes:** User preferred a single config file, even for keys.

---

## Config Safety (Follow-up)

| Option | Description | Selected |
|--------|-------------|----------|
| Git-ignore config.json | Include a template (e.g., config.template.json) and add config.json to .gitignore. | ✓ |
| Environment for secrets | Only use it for public settings; keep secrets in environment variables. | |

**User's choice:** Git-ignore config.json
**Notes:** Rationale is to keep everything in one file but prevent leaking keys via git.

---

## Claude's Discretion

- Exact JSON structure for the brief schema.
- Selection of specific MCP libraries.
- Internal folder structure within `.campaign/`.

## Deferred Ideas

- Soul HEX Auto-Extraction (v2).
- Identity Lock (Soul ID) (v2).
- Direct Asset Generation (Out of scope).

---

*Phase: 01-foundation-analysis*
*Discussion log generated: June 2, 2026*
