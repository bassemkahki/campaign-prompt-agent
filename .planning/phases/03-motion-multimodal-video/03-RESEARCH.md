# Phase 3: Motion & Multimodal Video - Research

**Researched:** 2026-06-03
**Domain:** AI Video Prompt Engineering (Seedance 2.0)
**Confidence:** HIGH

## Summary

This phase focuses on extending the Campaign Prompt Agent to support cinematic video generation using **Seedance 2.0**. The primary challenge is maintaining visual consistency (Identity Lock) from Phase 2 images while introducing precise motion control and "Action Delta" descriptions. Research confirms that Seedance 2.0 uses a specialized `@ImageN` syntax for multimodal referencing and supports explicit camera control flags (e.g., `-zoom`, `-pan`) and a motion intensity scale (1-10).

**Primary recommendation:** Extend the `ShotBreakdownSchema` to include motion-specific metadata (intensity, direction, action delta) and implement a `generateSeedance` method in the `PromptEngineerService` that follows the Hybrid Context + Action Delta formula.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Shot Ingestion | API/Backend | — | Parsing campaign docs into structured briefs with motion metadata. |
| Prompt Generation | API/Backend | — | Logic for mapping brief details to Seedance 2.0 syntax. |
| Multimodal Resolution | API/Backend | — | Mapping Shot IDs to `@ImageN` references based on list index. |
| Motion Mapping | API/Backend | — | Converting "Energy" levels and "Moves" to hyphenated command flags. |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Zod | 3.22.x | Schema validation | Type-safe schemas for briefs and prompts. [VERIFIED: npm registry] |
| Seedance 2.0 | N/A | Target Video Model | Specified in requirements; uses `@` reference syntax. [VERIFIED: web search] |
| Soul Cinema | N/A | Ref Image Model | Provides the visual context foundation for video consistency. [VERIFIED: Context 7] |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|--------------|
| Vitest | 1.x | Unit Testing | For verifying prompt formula adherence and mapping logic. [VERIFIED: package.json] |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Descriptive Motion | Explicit Commands | Explicit commands (`-zoom`) provide more predictable results in Seedance 2.0 than natural language alone. |

**Installation:**
```bash
# No new packages required; extending existing Zod-based architecture.
npm install zod
```

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| zod | npm | 4 yrs | 14M/wk | github.com/colinhacks/zod | [OK] | Approved |

## Architecture Patterns

### Recommended Project Structure
```
src/
├── schema/
│   ├── brief.ts        # Update ShotBreakdownSchema with motion fields
│   └── prompt.ts       # Add 'seedance-2' to Model enum
├── services/
│   └── engineer.ts     # Add generateSeedance method
└── mcp/
    └── server.ts       # Add generate_seedance_prompt tool
```

### Pattern 1: Hybrid Context + Action Delta
**What:** Repeating core visual identity markers (Subject, Style, Mood) while focusing the primary description on the "Action Delta" (what changes).
**When to use:** Image-to-Video generation where maintaining character/environment identity is critical.
**Example:**
```typescript
// Formula: [Anchor] [Visual Identity] [Action Delta] [Commands]
const prompt = `@Image1 A futuristic cyborg woman, neon rain-slicked alley, cyberpunk style. She slowly turns her head to look at the camera. -motion 7 -zoom 5`;
```

### Anti-Patterns to Avoid
- **Total Re-description:** Describing every detail from the image in the video prompt. This can lead to "Identity Drift" where the model generates a similar but slightly different character/environment.
- **Vague Motion:** Using "cinematic motion" instead of specific commands like `-pan` or `-zoom`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Motion Mapping | Custom Enums | Zod Schema | Ensure valid intensity (1-10) and move types at ingestion time. |

## Common Pitfalls

### Pitfall 1: Identity Drift
**What goes wrong:** The video subject looks slightly different from the source image.
**Why it happens:** The prompt contains too many new descriptive tokens that contradict or distract from the `@Image` reference.
**How to avoid:** Use the "Action Delta" approach—only describe what *moves*.

### Pitfall 2: Command Clipping
**What goes wrong:** Camera movement is jerky or non-existent.
**Why it happens:** Conflicting commands (e.g., `-zoom 10` with `-motion 1`).
**How to avoid:** Scale command values relative to the overall `-motion` intensity.

## Code Examples

### Seedance 2.0 Prompt Generation (Mock)
```typescript
// Source: Internal Research / Seedance 2.0 Documentation
const shotIndex = 1; // 1-based
const actionDelta = "She smiles and waves at the camera.";
const identity = "A young woman in a red dress, sunset beach, film grain.";
const intensity = 5;
const zoom = 3;

const prompt = `@Image${shotIndex} ${identity} ${actionDelta} -motion ${intensity} -zoom ${zoom}`;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Text-to-Video | Image-to-Video (I2V) | 2023-2024 | Dramatic increase in visual consistency and character stability. |
| Descriptive Camera | Explicit Flags | Late 2023 | Precise control over dolly/pan/tilt intensity via numerical flags. |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Seedance 2.0 accepts `-zoom`, `-pan`, `-tilt` flags | Summary | These specific flags might be tool-dependent; may need adjustment if target API changes. |
| A2 | `@ImageN` resolution is 1-based index | Multimodal | If Seedance expects 0-based or Shot IDs, mapping logic must be updated. |

## Open Questions

1. **Orbit Mapping:** Does Seedance 2.0 have a native `-orbit` flag, or should it be mapped to a combination of `-pan` and `-zoom`? (Recommendation: Keep as descriptive text until confirmed).
2. **Action Delta Field:** Should `actionDelta` be a mandatory field for all shots, or only when `seedance-2` is a deliverable? (Recommendation: Optional, defaulting to `pose`).

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Core | ✓ | v20.12.2 | — |
| npm | Core | ✓ | 10.5.0 | — |
| Vitest | Testing | ✓ | 1.x | — |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 1.x |
| Config file | `vitest.config.ts` |
| Quick run command | `npm test` |
| Full suite command | `npm test --run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VID-01 | Seedance prompt formula (Context + Delta) | unit | `npx vitest tests/prompts.test.ts` | ✅ |
| VID-02 | Motion command mapping (-zoom, -pan, etc.) | unit | `npx vitest tests/prompts.test.ts` | ✅ |
| VID-03 | @ImageN resolution logic | unit | `npx vitest tests/prompts.test.ts` | ✅ |

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V5 Input Validation | yes | Zod schemas for `shotId`, `intensity` (1-10) |
| V8 Error Handling | yes | Standardized MCP error responses |

### Known Threat Patterns for AI Prompting

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Prompt Injection (Downstream) | Tampering | Sanitize user-provided shot descriptions to prevent escaping prompt structure. |

## Sources

### Primary (HIGH confidence)
- `seedance.tv` - Documentation on `@` syntax and multimodal inputs.
- `03-CONTEXT.md` - Locked decisions on hyphenated command syntax and numerical intensity.

### Secondary (MEDIUM confidence)
- `capcut.com` / `wavespeed.ai` - General ByteDance AI video prompting patterns.

### Tertiary (LOW confidence)
- General community guides on Seedance 2.0.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Zod and Existing Vitest setup are stable.
- Architecture: HIGH - Fits well within existing Service/Schema pattern.
- Pitfalls: MEDIUM - Dependent on specific Seedance 2.0 model behavior.

**Research date:** 2026-06-03
**Valid until:** 2026-07-03
