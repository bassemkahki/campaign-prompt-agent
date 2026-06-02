# Domain Pitfalls

**Domain:** AI-Driven Creative Campaign Execution
**Researched:** June 2, 2026

## Critical Pitfalls

### Pitfall 1: Visual Identity Drift
**What goes wrong:** Generating video (Seedance 2.0) without strictly referencing the character identity from the hero image (Soul V2).
**Why it happens:** Attempting to redescribe the character in the video prompt instead of using the `@Image1` multimodal reference.
**Consequences:** The character's face or outfit changes between the image and video frames, ruining campaign consistency.
**Prevention:** Force the use of `@Image1` references in the Seedance 2.0 prompt template.

### Pitfall 2: Technical/Artistic Gap
**What goes wrong:** Using generic terms like "cool lighting" instead of specific cinematic terms like "Chiaroscuro" or "Rembrandt lighting."
**Why it happens:** LLMs default to "average" descriptions if not explicitly instructed to use professional cinematic vocabulary.
**Prevention:** Inject a "Cinematic Dictionary" into the agent's system prompt.

## Moderate Pitfalls

### Pitfall 1: MCP Tool Overload
**What goes wrong:** Exposing too many tiny tools (e.g., `get_color_1`, `get_color_2`) instead of high-level intent tools (`analyze_moodboard`).
**Prevention:** Group tool capabilities by intent.

### Pitfall 2: Local File Permission Issues
**What goes wrong:** The agent fails to read PDFs in certain OS environments due to locked files or path issues.
**Prevention:** Use robust paths and include error handling for permission-denied scenarios.

## Minor Pitfalls

### Pitfall 1: Hallucinating Model Capabilities
**What goes wrong:** Prompting for "8K resolution" or "Raytracing" in models that don't use those specific technical keywords.
**Prevention:** Maintain a strict list of supported keywords per model version.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Foundation | MCP SDK v2.0 Breaking Changes | Stick to stable v1.x for the initial build. |
| Ingestion | Docling Heavy Dependencies | Ensure Python/Docling is clearly marked as a prerequisite. |
| Generation | Over-Stylization | Allow the user to toggle "Creative Intensity" levels. |

## Sources

- [Higgsfield Community Discord / Troubleshooting](https://higgsfield.ai/community)
- [Anthropic MCP Best Practices Guide](https://modelcontextprotocol.io/docs/concepts/tools)
