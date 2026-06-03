# Phase 02: Visual Synthesis & Image Engineering - Context

**Gathered:** 2026-06-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Transform creative direction into optimized image prompts. Deliver prompt generation tools for Soul V2 (stylized) and Soul Cinema (cinematic) based on extracted creative briefs and shot breakdowns.
</domain>

<decisions>
## Implementation Decisions

### Shot Input Strategy
- **D-01:** The prompt generation tools will rely on starter **SHOT BREAKDOWNS** included in the ingested brief documents, rather than inventing shots independently.

### Formula Strictness (Soul V2)
- **D-02:** Use a **STRICT** application of the Soul V2 formula (`Subject + Outfit + Pose + Camera`) combined with **WAVIBOY's AOC framework** (`Action`, `Object`, `Context`). The prompt must clearly weave the subject and outfit into the *Object*, the pose into a dynamic *Action*, and the camera/lighting into the cinematic *Context*.

### Cinematography Vocabulary (Soul Cinema)
- **D-03:** Use a **predefined vocabulary** of valid camera and lighting terms to ensure compatibility with Soul Cinema, rather than allowing the LLM to invent free-form descriptions.

### Tool Separation
- **D-04:** Provide **separate tools** for each model (e.g., `generate_soul_v2_prompt` and `generate_cinema_prompt`) rather than a single unified tool.

### Claude's Discretion
- Selection of the specific predefined cinematography vocabulary list for Soul Cinema.
- Exact mapping logic from `CreativeBriefSchema` and shot breakdowns into the AOC framework.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Foundation
- `.planning/PROJECT.md` — Core value and requirements (IMG-01, IMG-02, IMG-03).
- `.planning/REQUIREMENTS.md` — Requirement specifications.
- `.planning/ROADMAP.md` — Phase 2 goals and success criteria.

### External Frameworks
- **WAVIBOY's AOC Framework** — (Action, Object, Context) structure for cinematic prompt generation.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/schema/brief.ts` — Use `CreativeBriefSchema` as the foundation, expanding it to support shot breakdowns.
- `src/mcp/server.ts` — Example of existing tool registration and Vercel AI SDK usage.
</code_context>

<specifics>
## Specific Ideas
- The Soul V2 prompt must strictly adhere to the AOC (Action, Object, Context) structure to avoid generic "plastic" AI looks.
</specifics>

<deferred>
## Deferred Ideas
None — discussion stayed within phase scope.
</deferred>

---

*Phase: 02-visual-synthesis-image-engineering*
*Context gathered: 2026-06-02*
