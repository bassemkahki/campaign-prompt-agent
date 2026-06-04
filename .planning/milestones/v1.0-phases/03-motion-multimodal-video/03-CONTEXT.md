# Phase 03: Motion & Multimodal Video - Context

**Gathered:** 2026-06-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Create cinematic motion prompts with visual consistency. Deliver prompt generation tools for Seedance 2.0 (image-to-video) that accurately translate scripts into motion while maintaining character and style identity from Phase 2 images.
</domain>

<decisions>
## Implementation Decisions

### Motion Energy Control
- **D-01: Numerical Intensity**: Use a **numerical scale (1-10)** within the shot breakdown for motion intensity. This allows for precise energy control (e.g., `-motion 5`) in the Seedance output.

### Reference Mapping
- **D-02: Auto-Link by Shot ID**: The video generation tool will **automatically link** to the image prompt generated for the same `shotId`. This ensures the video has a consistent starting frame and visual identity without manual re-tagging.

### Prompt Composition
- **D-03: Hybrid Context + Action Delta**: Video prompts will use a **hybrid structure**. They will repeat core visual identity markers (Subject, Style, Mood) but focus primarily on describing the **action delta** (the specific motion or transformation happening in the clip).

### Cinematography Commands
- **D-04: Explicit Command Syntax**: Map natural language cinematography terms (Zoom, Pan, Tilt) to **Seedance explicit command syntax** (e.g., `-zoom`, `-pan`, `-tilt`) rather than keeping them as purely descriptive strings.

### Carrying Forward from Phase 2
- **Shot-Based Generation**: Continuing to use the `ShotBreakdownSchema` as the foundation.
- **Tool Separation**: Providing a dedicated tool for Seedance 2.0 (e.g., `generate_seedance_prompt`).
- **Cinematography Vocab**: Reusing the approved camera/lens vocabulary from Phase 2 for cross-model descriptive consistency.

### Claude's Discretion
- Exact mapping logic from natural language moves (e.g., "Fast Dolly In") to Seedance command values (e.g., `-zoom 8`).
- The specific blend of "Context" vs "Action" tokens in the hybrid prompt structure.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Foundation
- `.planning/PROJECT.md` — Core value and requirements (VID-01, VID-02, VID-03).
- `.planning/REQUIREMENTS.md` — Requirement specifications.
- `.planning/ROADMAP.md` — Phase 3 goals and success criteria.

### Phase Context
- `.planning/phases/02-visual-synthesis-image-engineering/02-CONTEXT.md` — Foundation for image prompt generation and cinematography vocab.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/schema/brief.ts` — `CreativeBriefSchema` and `ShotBreakdownSchema`.
- `src/services/engineer.ts` — `PromptEngineerService` (base for adding Seedance generation).
- `src/schema/prompt.ts` — `PromptOutputSchema` (needs update to support Seedance).

### Integration Points
- `PromptEngineerService.generateSeedance` — New method to implement.
- `src/mcp/server.ts` — Registering the new video prompt tool.
</code_context>

<specifics>
## Specific Ideas
- The `@ImageN` syntax mentioned in requirements should be internally resolved by the tool using the `shotId` linkage.
</specifics>

<deferred>
## Deferred Ideas
None — discussion stayed within phase scope.
</deferred>

---

*Phase: 03-motion-multimodal-video*
*Context gathered: 2026-06-03*
