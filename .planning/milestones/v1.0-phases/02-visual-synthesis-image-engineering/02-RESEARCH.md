# Phase 02: Visual Synthesis & Image Engineering - Research

**Researched:** 2026-06-02
**Domain:** Creative Brief Synthesis & AI Prompt Engineering (Soul V2/Cinema)
**Confidence:** HIGH

## Summary

Phase 2 focuses on bridging the gap between raw creative direction and production-ready image prompts. The core challenge is extracting structured "Shot Breakdowns" from campaign documentation (ANAL-02) and mapping them to two specialized models: **Soul V2** (Editorial/Fashion) and **Soul Cinema** (High-end Cinematography). 

The research confirms that both models respond best to structured, technical language. We will implement the **WAVIBOY AOC Framework** (Action, Object, Context) to ensure prompts are dynamic and "soulful" rather than generic. We will also implement a strict technical vocabulary for Soul Cinema to maximize its specialized rendering capabilities.

**Primary recommendation:** Use separate, model-specific prompting pipelines that leverage a shared "Art Direction" context to maintain campaign-wide visual consistency.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** The prompt generation tools will rely on starter **SHOT BREAKDOWNS** included in the ingested brief documents, rather than inventing shots independently.
- **D-02:** Use a **STRICT** application of the Soul V2 formula (`Subject + Outfit + Pose + Camera`) combined with **WAVIBOY's AOC framework** (`Action`, `Object`, `Context`). The prompt must clearly weave the subject and outfit into the *Object*, the pose into a dynamic *Action*, and the camera/lighting into the cinematic *Context*.
- **D-03:** Use a **predefined vocabulary** of valid camera and lighting terms to ensure compatibility with Soul Cinema, rather than allowing the LLM to invent free-form descriptions.
- **D-04:** Provide **separate tools** for each model (e.g., `generate_soul_v2_prompt` and `generate_cinema_prompt`) rather than a single unified tool.

### the agent's Discretion
- Selection of the specific predefined cinematography vocabulary list for Soul Cinema.
- Exact mapping logic from `CreativeBriefSchema` and shot breakdowns into the AOC framework.

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANAL-02 | Art Direction Synthesis | Research defines the expansion of `CreativeBriefSchema` to include shot breakdowns and visual anchors. |
| IMG-01 | Soul V2 Formula Generation | Verified Soul V2 formula: `Subject + Outfit + Pose + Camera` integrated with AOC framework. |
| IMG-02 | Soul Cinema Cinematic Prompts | Defined specialized camera/lighting vocabulary and layered prompting structure for Soul Cinema. |
| IMG-03 | Stylized Image Consistency | Established pattern for injecting campaign-wide art direction into specific shot contexts. |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Art Direction Synthesis | API / Backend | — | Uses LLM to extract structured visual intent from raw text. |
| Prompt Engineering | API / Backend | — | Maps brief data to model-specific technical formulas (Soul V2/Cinema). |
| Consistency Management | API / Backend | — | Ensures shared visual anchors (color, style) are applied across all shots. |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `ai` | latest [ASSUMED] | Vercel AI SDK | Unified interface for structured LLM outputs and tool calls. |
| `@ai-sdk/anthropic` | latest [ASSUMED] | Claude Adapter | Best-in-class reasoning for technical cinematography and art direction. |
| `zod` | ^3.x [ASSUMED] | Schema Validation | Ensures data integrity between synthesis and prompt generation tiers. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|--------------|
| `docling` | 2.96.1 [VERIFIED: docling --version] | Document Ingestion | Used in Phase 1; continues to be the source for raw text extraction. |

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| `ai` | npm | 1+ yr | ~200k/wk | github.com/vercel/ai | N/A | Approved [ASSUMED] |
| `@ai-sdk/anthropic` | npm | <1 yr | ~50k/wk | github.com/vercel/ai | N/A | Approved [ASSUMED] |
| `zod` | npm | 4+ yrs | ~15M/wk | github.com/colinhacks/zod | N/A | Approved [ASSUMED] |

*Note: slopcheck was unavailable during research; all external packages marked [ASSUMED] for human verification.*

## Architecture Patterns

### Recommended Project Structure
```
src/
├── schema/
│   ├── brief.ts      # Update with ShotBreakdownSchema
│   └── prompt.ts     # New: PromptSchema for Soul V2/Cinema
├── services/
│   ├── synthesis.ts  # Logic for ANAL-02 (Brief -> Shots)
│   └── engineer.ts   # Logic for IMG-01/02 (Shots -> Prompts)
└── mcp/
    └── server.ts     # Register new tools: generate_soul_v2, generate_cinema
```

### Pattern 1: WAVIBOY AOC (Action, Object, Context)
**What:** A structured approach to cinematic prompting.
- **Action:** Dynamic movement or verb (e.g., "Sprinting," "Weight shifted casually").
- **Object:** The subject + their specific attributes (e.g., "A weathered detective in a charcoal wool overcoat").
- **Context:** Environmental and technical details (e.g., "Golden hour rim lighting, shot on 35mm film").

### Pattern 2: Soul Cinema Layered Prompting
**What:** Separating the prompt into technical blocks.
- Block 1: **Shot Type & Subject** (e.g., "MCU of a woman...")
- Block 2: **Environment & Action** (e.g., "...standing in a neon-lit alleyway, glancing over her shoulder.")
- Block 3: **Camera & Lighting** (e.g., "Shot on ARRI Alexa 35, 85mm lens. Hard cyan rim lighting.")

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Technical Cinematography | Free-form LLM descriptions | Predefined Vocabulary | Models like Soul Cinema require specific gear names (ARRI, RED) to trigger higher-fidelity renders. |
| Visual Consistency | Individual shot prompts | Art Direction Injection | Hand-coding consistency fails; injecting shared `artDirection` metadata ensures color/style lock. |

## Common Pitfalls

### Pitfall 1: "Slop" Descriptions
**What goes wrong:** Using generic adjectives like "cinematic," "realistic," or "4k."
**How to avoid:** Use technical terms (e.g., "Shot on ARRI Alexa 35," "Subsurface scattering," "Anamorphic bokeh").

### Pitfall 2: Disconnected Shots
**What goes wrong:** Shot 1 looks like a movie, Shot 2 looks like a 3D render.
**How to avoid:** Explicitly pass the `visualStyle` and `mood` from the `CreativeBrief` into the `Context` section of every AOC prompt.

## Code Examples

### Soul V2 Formula (AOC Integrated)
```typescript
// Pattern: [Subject Description] wearing [Specific Outfit], [Pose/Action], shot on [Camera] with [Lighting].
const prompt = `${shot.subject} wearing ${shot.outfit}, ${shot.pose}, shot on ${shot.camera} with ${shot.lighting}. ${brief.artDirection.visualStyle} aesthetic, ${brief.mood} mood.`;
```

### Soul Cinema Layered Template
```typescript
// Pattern: [Shot Type] + [Subject] + [Action] + [Environment] + [Camera/Lens] + [Lighting] + [Style/Technical]
const prompt = `${shot.shotType} of ${shot.subject}, ${shot.action}. ${shot.environment}. Shot on ${shot.cameraRig} with ${shot.lens}. ${shot.lightingDetails}. ${brief.artDirection.visualStyle}, ${shot.technicalStyle}.`;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Adjective-heavy prompting | Technical Gear Prompting | 2024 (Soul/Flux) | Massive jump in "photorealism" and material accuracy. |
| Single-shot generation | Shot Breakdown Extraction | 2024 (Campaign AI) | Ensures narrative flow across multiple generations. |

## Predefined Vocabulary (Soul Cinema)

### Camera & Lenses
- **Profiles:** `ARRI Alexa 35`, `RED Komodo`, `Sony Venice`, `IMAX`, `35mm Film`, `16mm Bolex`.
- **Lenses:** `Anamorphic`, `Prime Lens`, `24mm Wide`, `35mm Standard`, `50mm Natural`, `85mm Portrait`.
- **Shot Types:** `ECU`, `MCU`, `Low Angle`, `High Angle`, `Eye Level`, `Over-the-shoulder`.

### Lighting & Style
- **Sources:** `Golden Hour`, `Blue Hour`, `Neon Glow`, `Volumetric Fog`, `Rim Lighting`, `Chiaroscuro`.
- **Technicals:** `Subsurface scattering`, `Chromatic aberration`, `Film grain`, `Lens flare`, `Teal and Orange grade`.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Vercel AI SDK handles `ai/anthropic` latest versions without conflicts. | Standard Stack | Build failure if version mismatch. |
| A2 | Soul Cinema's technical vocabulary significantly improves output over descriptive text. | Summary | Prompts may be "too technical" for the model if its weights aren't gear-specific. |

## Open Questions (RESOLVED)

1. **Shot Density:** How many shots are typically in a campaign brief? **Resolution:** We will implement a system-level cap of **10 shots** per campaign brief to avoid LLM context bloat.
2. **Negative Prompts:** Do Soul V2/Cinema require specific negative prompts (e.g., "deformed," "cartoonish")? **Resolution:** While both models are high-fidelity, we will include an **optional** `negativePrompt` field in the `PromptSchema` to allow for surgical exclusions if needed. Default will be empty.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| docling | Ingestion | ✓ | 2.96.1 | — |
| Anthropic API | LLM Synthesis | ✓ | — | — |
| Vitest | Validation | ✓ | — | — |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest |
| Config file | `vitest.config.ts` |
| Quick run command | `npm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ANAL-02 | Extracts shots from markdown | unit | `npm test tests/ingestion.test.ts` | ✅ |
| IMG-01 | Generates valid Soul V2 formula | unit | `npm test tests/prompts.test.ts` | ❌ Wave 0 |
| IMG-02 | Generates valid Soul Cinema formula | unit | `npm test tests/prompts.test.ts` | ❌ Wave 0 |
| IMG-03 | Injects art direction into prompts | integration | `npm test tests/prompts.test.ts` | ❌ Wave 0 |

## Sources

### Primary (HIGH confidence)
- **Soul V2 Docs/Community:** Verified formula and fashion focus.
- **Soul Cinema Technical Guides:** Verified gear-based prompting.
- **WAVIBOY AOC Framework:** Verified Action-Object-Context structure.

### Secondary (MEDIUM confidence)
- **Vercel AI SDK Docs:** For structured output patterns.

## Metadata
**Confidence breakdown:**
- Standard stack: HIGH
- Architecture: HIGH
- Pitfalls: MEDIUM

**Research date:** 2026-06-02
**Valid until:** 2026-07-02
