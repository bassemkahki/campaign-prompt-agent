# Feature Landscape

**Domain:** AI-Driven Creative Campaign Execution
**Researched:** June 2, 2026

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Multi-Format Parsing** | Briefs come in PDF, PPTX, and Markdown. | Medium | Use Docling for best results. |
| **Soul V2 Formula Generation** | Core requirement for image generation. | Low | Must include Subject + Outfit + Camera. |
| **Seedance 2.0 Motion Directing** | Necessary for cinematic video output. | Medium | Requires understanding of @mention syntax. |
| **Local Project Isolation** | Data privacy and project-specific context. | Low | Achieved via MCP local tool config. |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Soul HEX extraction** | Automatically steals color palettes from moodboards. | Medium | Requires vision analysis and HEX mapping. |
| **Cinematics Engine** | Suggests camera movement (Dolly, Orbit) based on script energy. | Medium | Translates "energetic" to specific movements. |
| **Identity Lock (Soul ID)** | Remembers character descriptions across prompts. | High | Requires maintaining a "Character Sheet" state. |
| **Handoff (PICKUP.md)** | Perfect state persistence between agent turns. | Low | Standard 2025 "Agent Continuity" pattern. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Direct Asset Generation** | High cost, complex hosting, and platform-specific lock-in. | Generate optimized prompts for external tools. |
| **Vector DB Storage** | Unnecessary complexity for local campaign folders. | Use Gemini 1.5 Pro's context window. |
| **Full Scriptwriting** | Dilutes the "Visual Execution" value prop. | Focus on translating *existing* scripts to visuals. |

## Feature Dependencies

```
Doc Parsing → Soul V2 Prompts → Seedance 2.0 Prompts
```

## MVP Recommendation

Prioritize:
1.  **MCP Server Backbone**: Basic tool-calling for Claude Code.
2.  **Soul V2 Formula Generator**: High-quality static image prompt logic.
3.  **Seedance 2.0 Animation Logic**: Basic motion and camera movement.
4.  **Input Checklist**: Simple to-do list for missing creative data.

Defer: **Soul ID/HEX automation**: These require more complex vision-to-API mapping.

## Sources

-   [Higgsfield Platform Feature Guide](https://higgsfield.ai)
-   [Creative Workflow Interviews / Case Studies](https://medium.com/creative-ai)
