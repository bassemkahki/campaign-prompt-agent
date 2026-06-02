# Roadmap: Campaign Prompt Agent

## Phases

- [ ] **Phase 1: Foundation & Analysis** - Establish MCP backbone and high-fidelity creative ingestion.
- [ ] **Phase 2: Visual Synthesis & Image Engineering** - Transform creative direction into optimized image prompts.
- [ ] **Phase 3: Motion & Multimodal Video** - Create cinematic motion prompts with visual consistency.
- [ ] **Phase 4: Workflow Optimization** - Ensure production readiness and input validation.

## Phase Details

### Phase 1: Foundation & Analysis
**Goal**: Establish the MCP backbone and creative ingestion pipeline.
**Mode**: mvp
**Depends on**: Nothing
**Requirements**: BACK-01, BACK-02, ANAL-01, WORK-02
**Success Criteria**:
  1. User can install the agent in a local folder and confirm it is connected to Claude Code/Gemini CLI via MCP.
  2. User can provide a campaign brief (PDF or Markdown) and receive a confirmation that the data was extracted.
  3. User can verify that campaign data is stored and processed locally within the project folder.
**Plans**: TBD

### Phase 2: Visual Synthesis & Image Engineering
**Goal**: Transform creative direction into optimized image prompts.
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: ANAL-02, IMG-01, IMG-02, IMG-03
**Success Criteria**:
  1. User receives a structured creative brief synthesized from their documentation.
  2. User can generate stylized prompts for Soul V2 that include specific subject, outfit, and camera details.
  3. User can generate cinematic prompts for Soul Cinema that specify lighting and cinematography.
**Plans**: TBD

### Phase 3: Motion & Multimodal Video
**Goal**: Create cinematic motion prompts with visual consistency.
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: VID-01, VID-02, VID-03
**Success Criteria**:
  1. User can generate Seedance 2.0 prompts that reference previously generated images using the `@ImageN` syntax.
  2. User can specify motion energy and receive prompts with corresponding motion directing details (e.g., Dolly, Orbit).
  3. User can verify that video prompts maintain the character/style identity from the source image prompts.
**Plans**: TBD

### Phase 4: Workflow Optimization
**Goal**: Ensure production readiness and input validation.
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: WORK-01
**Success Criteria**:
  1. User is automatically notified of missing critical information (like color hex codes or Soul IDs) before generation.
  2. User can view a "Campaign Readiness Checklist" to track what inputs are still needed.
**Plans**: TBD

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Analysis | 0/0 | Not started | - |
| 2. Visual Synthesis & Image Engineering | 0/0 | Not started | - |
| 3. Motion & Multimodal Video | 0/0 | Not started | - |
| 4. Workflow Optimization | 0/0 | Not started | - |
