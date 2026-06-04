---
phase: 03-motion-multimodal-video
plan: 01
subsystem: Core / Prompt Engineering
tags: [schema, seedance, motion, multimodal]
requires: []
provides: [seedance-foundation]
affects: [src/schema/brief.ts, src/schema/prompt.ts, src/services/engineer.ts]
tech-stack: [zod, vitest, typescript]
key-files: [src/schema/brief.ts, src/schema/prompt.ts, src/services/engineer.ts, tests/prompts.test.ts]
decisions:
  - Added motion-specific fields to ShotBreakdownSchema as optional to maintain backward compatibility.
  - Implemented 1-based @ImageN resolution for Seedance 2.0 prompts.
metrics:
  duration: 15m
  completed_date: "2026-06-03"
---

# Phase 3 Plan 01: Motion Foundation Summary

Established the schema and service foundation for Phase 3, enabling motion-specific metadata ingestion and 1-based @ImageN resolution logic for Seedance 2.0 prompts.

## Key Changes

### Schema Updates
- **src/schema/brief.ts**: Added `motionIntensity`, `motionDirection`, and `actionDelta` to `ShotBreakdownSchema`.
- **src/schema/prompt.ts**: Added `seedance-2` to the model enum in `PromptOutputSchema`.

### Prompt Engineering
- **src/services/engineer.ts**: Implemented `generateSeedance` method.
  - Correctly resolves 1-based `@ImageN` reference based on the shot's position in the brief.
  - Prepends the reference to the prompt as required by Seedance 2.0 multimodal logic.

### Testing
- **tests/prompts.test.ts**: Added a comprehensive test case for `generateSeedance` verifying correct `@ImageN` resolution across multiple shots.

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

### Automated Tests
- `npx vitest tests/prompts.test.ts --run`: PASSED (5/5 tests)
- `npm test`: PASSED (19/19 tests)

### Type Checking
- `npx tsc --noEmit`: Project compiles (with pre-existing deprecation warning for `baseUrl` in `tsconfig.json`).

## Self-Check: PASSED
- [x] Created files exist
- [x] Commits exist
- [x] @ImageN resolution logic verified with multiple shots
