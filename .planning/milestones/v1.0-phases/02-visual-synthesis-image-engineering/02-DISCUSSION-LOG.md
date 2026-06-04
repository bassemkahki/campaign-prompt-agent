# Phase 02: Visual Synthesis & Image Engineering - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-02
**Phase:** 02-visual-synthesis-image-engineering
**Areas discussed:** Shot Input Strategy, Formula Strictness, Cinematography Vocabulary, Tool Separation

---

## Shot Input Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| User-provided shot idea | User provides a raw shot idea (e.g., "woman in cafe"), and the tool stylizes it using the brief's art direction. | |
| Tool invents shots | Tool invents shot ideas entirely based on the brief's goals and deliverables. | |

**User's choice:** "The brief documents will include starter SHOT BREAKDOWNS"
**Notes:** The brief schema will need to be extended to capture these shot breakdowns during ingestion.

---

## Formula Strictness (Soul V2)

| Option | Description | Selected |
|--------|-------------|----------|
| Strict formula only | Strict Subject, Outfit, Pose, Camera. No extra flair. | |
| Formula with flair | Follow the formula, but allow stylization/flair to capture the brief's mood. | |

**User's choice:** "STRICT PLUS WAVIBOY's AOC framework"
**Notes:** Integrate Waviboy's Action-Object-Context method with the Soul V2 formula.

---

## Cinematography Vocabulary (Soul Cinema)

| Option | Description | Selected |
|--------|-------------|----------|
| Predefined vocabulary | Use a predefined list of valid camera/lighting terms to ensure compatibility with Soul Cinema. | ✓ |
| Free-form descriptions | Allow the LLM to invent cinematic descriptions based on the brief's mood. | |

**User's choice:** Predefined vocabulary
**Notes:** We will define a strict set of terms for the LLM to choose from.

---

## Tool Separation

| Option | Description | Selected |
|--------|-------------|----------|
| Unified tool | One tool (e.g., `generate_prompt`) that takes a `model` parameter (v2 or cinema). | |
| Separate tools | Separate tools (e.g., `generate_soul_v2_prompt`, `generate_cinema_prompt`). | ✓ |

**User's choice:** Separate tools
**Notes:** Creates clearer MCP tool boundaries.

---

## Claude's Discretion
- Selection of the specific predefined cinematography vocabulary list for Soul Cinema.
- Exact mapping logic from `CreativeBriefSchema` and shot breakdowns into the AOC framework.

## Deferred Ideas
None
