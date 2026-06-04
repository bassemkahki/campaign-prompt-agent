# Summary - Plan 02-02

## Goal
Implement the stylized prompt generation for Soul V2.

## Achievements
- Defined `PromptOutputSchema` in `src/schema/prompt.ts` to standardize prompt outputs.
- Implemented `PromptEngineerService` in `src/services/engineer.ts` with the `generateSoulV2` method.
- Strictly followed the Soul V2 formula: `[Subject] wearing [Outfit], [Pose/Action], shot on [Camera] with [Lighting]`.
- Integrated campaign-wide art direction (`visualStyle`) and `mood` into the prompts.
- Exposed the `generate_soul_v2_prompt` tool via the MCP server.
- Verified logic with comprehensive unit tests in `tests/prompts.test.ts`.

## Changes
- `src/schema/prompt.ts`: New schema for prompt outputs.
- `src/services/engineer.ts`: New service for stylized prompt engineering.
- `src/mcp/server.ts`: Registered the new Soul V2 prompt tool.
- `tests/prompts.test.ts`: Added unit tests for prompt generation.

## Verification Results
- All tests passing.
- Soul V2 prompts correctly reflect shot data and campaign style.

---
*Phase: 02-visual-synthesis-image-engineering*
*Plan: 02*
*Date: 2026-06-03*
