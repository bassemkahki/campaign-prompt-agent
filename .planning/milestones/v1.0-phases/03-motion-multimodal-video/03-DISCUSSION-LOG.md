# Phase 03: Motion & Multimodal Video - Discussion Log

**Date:** 2026-06-03
**Phase:** 03 - Motion & Multimodal Video

## Gray Areas & Decisions

### Motion Intensity Strategy
- **Question:** How should we handle motion energy? Seedance 2.0 is sensitive to numerical scales.
- **Options presented:** Numerical Scale (1-10), Descriptive Mapping.
- **Selection:** **Numerical Scale (1-10)**.
- **Notes:** Allows for precise energy control in the Seedance output.

### Reference Image Mapping
- **Question:** How should the video tool identify its source image?
- **Options presented:** Auto-Link by Shot ID, Manual @Mention Mapping.
- **Selection:** **Auto-Link by Shot ID**.
- **Notes:** Ensures consistency without extra user tagging.

### Prompt Structure for Motion
- **Question:** Should the video prompt focus only on the motion (Delta) or repeat full image context?
- **Options presented:** Action-Only Delta, Full Context Repeat.
- **Selection:** **Hybrid (BOTH)**.
- **Notes:** Keep visual "Soul" but emphasize motion transitions.

### Cinematography Command Mapping
- **Question:** How should we output cinematography moves? Seedance has specific command syntax.
- **Options presented:** Explicit Commands, Natural Language.
- **Selection:** **Explicit Commands**.
- **Notes:** Use `-zoom`, `-pan`, etc. for precise control.

## Noted for Later
None.

## Claude's Discretion Items
- Exact mapping logic from natural language moves to Seedance command values.
- Specific token balancing between context and action in prompts.
