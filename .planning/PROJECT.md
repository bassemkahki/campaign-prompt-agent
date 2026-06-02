# Campaign Prompt Agent

## What This Is

A high-end AI agent designed to run on Claude Code and/or Gemini CLI, installable within local project folders. It takes campaign creative documentation, research, scripts, and ideas to generate highly optimized prompts for executing visual campaigns.

## Core Value

The agent must translate complex campaign creative direction into precise, optimized prompts for image and video generation models, following a strict workflow to ensure visual consistency and high production value.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Analyze Campaign Documentation**: Parse and analyze campaign creative documentation, art direction, moodboards, and inspiration.
- [ ] **Generate Image Prompts**: Generate optimized image prompts for Soul V2 and Soul Cinema, starting with stylized images and including exact camera and cinematography details.
- [ ] **Generate Image-to-Video Prompts**: Generate optimized image-to-video prompts for Seedance 2 with exact details based on script and direction.
- [ ] **Input Checklist**: Ensure all required inputs (such as moodboards and colors for Soul Cinema and Soul V2) are prompted to the user in a document and listed as a to-do list.

### Out of Scope

- [Direct Execution] — The agent generates prompts for external tools (Soul V2, Soul Cinema, Seedance 2) rather than executing the generation itself.
- [Asset Hosting] — The agent does not host or manage the generated visual assets.

## Context

The agent is intended to be a specialized tool for creative teams, similar in function to GSD but focused on the visual campaign execution pipeline. It bridges the gap between creative direction and technical prompt engineering.

## Constraints

- **Platform**: Must run on Claude Code and/or Gemini CLI — To ensure compatibility with modern developer-centric AI tools.
- **Environment**: Installable in a local project folder — For project-specific creative workflows and data privacy.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Initial Workflow | Follow the 4-step creative-to-prompt pipeline specified in the idea. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: June 2, 2026 after initialization*
