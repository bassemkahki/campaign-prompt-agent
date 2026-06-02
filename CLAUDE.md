<!-- GSD:project-start source:PROJECT.md -->

## Project

**Campaign Prompt Agent**

A high-end AI agent designed to run on Claude Code and/or Gemini CLI, installable within local project folders. It takes campaign creative documentation, research, scripts, and ideas to generate highly optimized prompts for executing visual campaigns.

**Core Value:** The agent must translate complex campaign creative direction into precise, optimized prompts for image and video generation models, following a strict workflow to ensure visual consistency and high production value.

### Constraints

- **Platform**: Must run on Claude Code and/or Gemini CLI — To ensure compatibility with modern developer-centric AI tools.
- **Environment**: Installable in a local project folder — For project-specific creative workflows and data privacy.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## Recommended Stack

### Core Framework & Orchestration

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Node.js** | v20+ | Runtime | Standard for MCP server development and local CLI tools. |
| **TypeScript** | v5.4+ | Language | Type safety for complex prompt schemas and tool definitions. |
| **@modelcontextprotocol/sdk** | v1.29.0 | Protocol | The industry standard for connecting AI agents to local tools/data. |
| **Vercel AI SDK** | v6.0+ | LLM Orchestration | Best-in-class support for streaming, tool calling, and structured outputs. |

### Models (via API)

| Model | Provider | Role | Rationale |
|-------|----------|------|-----------|
| **Claude 3.5 Sonnet** | Anthropic | Lead Creative | Superior nuance for creative direction, cinematography, and "Soul" model aesthetics. |
| **Gemini 1.5 Pro** | Google | Context Specialist | 2M token window to ingest massive campaign documentation, brand books, and research. |

### Document & Visual Processing

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Docling** (IBM) | v2.96+ | Parsing | High-fidelity extraction of layouts from campaign PDFs and brand books. |
| **Zod** | v4.4+ | Validation | Strict enforcement of Soul V2/Seedance 2.0 prompt formulas (Subject + Camera + Movement). |
| **Sharp** | v0.33+ | Image Metadata | Local processing of moodboards to extract color palettes and aspect ratios before LLM analysis. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **Zustand** | v4.5+ | State Management | Managing the "Input Checklist" and to-do list state across sessions. |
| **Commander.js** | v12.0+ | CLI Interface | Providing a secondary entry point for manual prompt generation without an agent host. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| **Orchestration** | Vercel AI SDK | LangChain | LangChain's overhead and "magic" abstractions make debugging MCP tools significantly harder. |
| **Parsing** | Docling | MarkItDown | Docling provides superior layout preservation for complex creative PDFs (moodboards/briefs). |
| **Language** | TypeScript | Python | While Python is native for AI, the MCP ecosystem for Claude Code is currently most mature and performant in Node.js. |

## Installation

### Development Environment

# Core MCP Server & SDKs

# Types and Dev Tools

# Document Parsing (Requires Python 3.10+)

## What NOT to Use and Why

## Sources

- [MCP Official Documentation](https://modelcontextprotocol.io) (v1.29.0)
- [Vercel AI SDK Changelog](https://sdk.vercel.ai/docs) (v6.0.193)
- [Higgsfield Soul V2 / Seedance 2.0 Prompting Guides](https://higgsfield.ai/docs) (Confirmed formulas)
- [IBM Docling Repository](https://github.com/DS4SD/docling) (v2.96.1)

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
