# Requirements: Campaign Prompt Agent

## v1 Requirements

### Core Backbone (MCP)

- [x] **BACK-01**: MCP Server Integration — Implement an MCP server that exposes prompt engineering tools to Claude Code and Gemini CLI.
- [x] **BACK-02**: Local Project Installation — Ensure the agent can be installed and configured within a local project folder.

### Analysis & Ingestion

- [x] **ANAL-01**: Multi-Format Creative Ingestion — Parse campaign documentation from PDF, PPTX, and Markdown formats using high-fidelity extraction (Docling recommended).
- [x] **ANAL-02**: Art Direction Synthesis — Extract key visual elements, art direction, and moodboard inspiration into a structured creative brief.

### Image Prompt Engineering

- [x] **IMG-01**: Soul V2 Formula Generation — Generate optimized prompts for Soul V2 following the `Subject + Outfit + Pose + Camera` formula.
- [x] **IMG-02**: Soul Cinema Cinematic Prompts — Generate prompts for Soul Cinema with exact camera, cinematography, and lighting details based on the creative brief.
- [x] **IMG-03**: Stylized Image Consistency — Ensure generated prompts maintain the campaign's stylization and art direction.

### Video Prompt Engineering

- [ ] **VID-01**: Seedance 2.0 Image-to-Video Prompts — Generate prompts for Seedance 2.0 that accurately translate scripts into motion.
- [ ] **VID-02**: Motion Directing Details — Include exact motion and cinematography details (Dolly, Orbit, etc.) based on script energy.
- [ ] **VID-03**: Multimodal Referencing — Implement the `@mention` syntax (e.g., `@Image1`) to maintain visual identity from image to video.

### Workflow & State Management

- [ ] **WORK-01**: Input Checklist Generation — Automatically identify missing creative data (e.g., missing colors, Soul IDs) and generate a to-do list for the user.
- [x] **WORK-02**: Project-Level Isolation — Ensure all campaign data and prompts remain within the local project environment.

## v2 Requirements (Deferred)

- [ ] **Soul HEX Auto-Extraction**: Automatically extract color palettes (Soul HEX) from moodboard images.
- [ ] **Identity Lock (Soul ID)**: Automated character consistency management across all campaign phases.
- [ ] **Script Modularization**: Automatically break long scripts into 3-5 second action beats for video generation.

## Out of Scope

- **Direct Asset Generation**: The agent generates text prompts, not the final images or videos.
- **Asset Hosting**: No management or hosting of generated media files.
- **Full Scriptwriting**: The tool focuses on visual execution of existing scripts, not creative writing.

## Traceability

| REQ-ID | Phase | Status |
|--------|-------|--------|
| BACK-01 | Phase 1 | Complete |
| BACK-02 | Phase 1 | Complete |
| ANAL-01 | Phase 1 | Complete |
| ANAL-02 | Phase 2 | Complete |
| IMG-01 | Phase 2 | Complete |
| IMG-02 | Phase 2 | Complete |
| IMG-03 | Phase 2 | Complete |
| VID-01 | Phase 3 | Pending |
| VID-02 | Phase 3 | Pending |
| VID-03 | Phase 3 | Pending |
| WORK-01 | Phase 4 | Pending |
| WORK-02 | Phase 1 | Complete |
