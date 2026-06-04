---
phase: 03-motion-multimodal-video
plan: 02
subsystem: Prompt Engineering
tags: [video, seedance, motion, prompt-engineering]
requires: ["03-01"]
provides: ["VID-01", "VID-02"]
affects: [src/services/engineer.ts]
tech-stack: [vitest, typescript]
key-files: [src/services/engineer.ts, tests/prompts.test.ts]
decisions:
  - "Use @ImageN syntax for multimodal resolution in Seedance 2.0"
  - "Map natural language motion keywords to explicit hyphenated flags (-zoom, -pan, -tilt)"
  - "Scale motion flags proportionally to motionIntensity"
  - "Sanitize action descriptions by removing ' -' patterns to prevent flag injection"
metrics:
  duration: 4m
  completed_date: "2026-06-04"
---

# Phase 03 Plan 02: Motion & Hybrid Logic Summary

Implemented the core video prompt generation logic for Seedance 2.0, including the Hybrid Context + Action Delta formula and cinematography-to-command mapping.

## Key Changes

### Prompt Engineering Logic
- Updated `generateSeedance` in `PromptEngineerService` to follow the formula: `@ImageN [Identity]. [Action Delta]. [Flags]`.
- Implemented **Visual Identity** extraction (Subject, Environment, Style, Mood).
- Implemented **Action Delta** support (using `actionDelta` or `pose`).
- Implemented **Command Mapping** for `motionIntensity` and `motionDirection`.
- Added **Dynamic Scaling** for motion flags (`-zoom`, `-pan`, `-tilt`) based on `motionIntensity`.

### Security & Sanitization
- Added a `sanitize` helper to prevent prompt injection via `actionDelta` or `motionDirection`. It strips leading hyphens that could be interpreted as command flags (T-03-03).

## Verification Results

### Automated Tests
- Ran `npx vitest tests/prompts.test.ts --run`
- All 7 tests passed, including new tests for Seedance 2.0 Hybrid Prompts and Command Mapping.

## Deviations from Plan

### Auto-fixed Issues
**1. [Rule 2 - Security] Added sanitization for motion inputs**
- **Found during:** Post-implementation review against threat model.
- **Issue:** `actionDelta` and `motionDirection` were directly interpolated, allowing potential flag injection.
- **Fix:** Added `sanitize` function to remove ` -` patterns from user inputs.
- **Files modified:** `src/services/engineer.ts`
- **Commit:** 2054923

## Self-Check: PASSED
- [x] All tasks executed
- [x] Each task committed individually
- [x] All deviations documented
- [x] SUMMARY.md created
- [x] STATE.md updated (Pending)
- [x] ROADMAP.md updated (Pending)
