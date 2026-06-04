# Campaign Prompt Agent

## What This Is

A high-end AI agent designed to run on Claude Code and/or Gemini CLI, installable within local project folders. It takes campaign creative documentation, research, scripts, and ideas to generate highly optimized prompts for executing visual campaigns.

## Core Value

The agent must translate complex campaign creative direction into precise, optimized prompts for image and video generation models, following a strict workflow to ensure visual consistency and high production value.

## Requirements

### Validated

- [x] **Analyze Campaign Documentation**: Parse and analyze campaign creative documentation, art direction, moodboards, and inspiration. (Validated in Phase 1: Foundation & Analysis)
- [x] **Generate Image Prompts**: Generate optimized image prompts for Soul V2 and Soul Cinema with exact camera and cinematography details. (Validated in Phase 2: Visual Synthesis)
- [x] **Generate Image-to-Video Prompts**: Generate optimized video prompts for Seedance 2 with @ImageN referencing and motion control. (Validated in Phase 3: Motion & Multimodal Video)
- [x] **Input Checklist**: Automatically identify missing creative data and generate a readiness to-do list. (Validated in Phase 4: Workflow Optimization)

### Active

- [ ] **Soul HEX Auto-Extraction**: Automatically extract color palettes (Soul HEX) from moodboard images.
- [ ] **Identity Lock (Soul ID)**: Automated character consistency management across all campaign phases.
- [ ] **Script Modularization**: Automatically break long scripts into 3-5 second action beats for video generation.

### Out of Scope

- [Direct Execution] — The agent generates prompts for external tools (Soul V2, Soul Cinema, Seedance 2) rather than executing the generation itself.
- [Asset Hosting] — The agent does not host or manage the generated visual assets.

## Context

The agent is a specialized tool for creative teams, bridging the gap between creative direction and technical prompt engineering. It is fully integrated with Claude Code and Gemini CLI via MCP.

**Current State**: v1.0 complete. The agent supports full campaign ingestion, shot synthesis, and technical prompt generation for image (Soul V2, Soul Cinema) and video (Seedance 2.0) models. It includes a validation layer to ensure campaign readiness.

## Constraints

- **Platform**: Must run on Claude Code and/or Gemini CLI — To ensure compatibility with modern developer-centric AI tools.
- **Environment**: Installable in a local project folder — For project-specific creative workflows and data privacy.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| MCP Stdio | Standard compatibility with Claude Code/Gemini CLI without local server. | Implemented |
| IBM Docling | High-fidelity parsing of PDF and PPTX creative decks. | Implemented |
| Vercel AI SDK v6 | Standardized structured output extraction from documents. | Implemented |
| Local Persistence | Store briefs in `.campaign/` JSON files for project isolation. | Implemented |
| @ImageN Syntax | 1-based relative referencing for Seedance 2.0 multimodal consistency. | Implemented |
| Hybrid Formula | Combined identity and action deltas for optimal video prompt fidelity. | Implemented |
| Non-blocking Validation | Warn rather than block to maintain creative flexibility. | Implemented |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: June 4, 2026 after v1.0 Milestone*
