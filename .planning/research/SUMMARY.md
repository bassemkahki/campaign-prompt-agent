# Research Summary: Campaign Prompt Agent

**Domain:** AI-Driven Creative Campaign Execution
**Researched:** June 2, 2026
**Overall confidence:** HIGH

## Executive Summary

The Campaign Prompt Agent is a specialized AI tool designed to bridge the gap between high-level creative direction and technical prompt engineering for next-generation image/video models (Soul V2, Soul Cinema, Seedance 2.0). By leveraging the **Model Context Protocol (MCP)**, the agent integrates directly into the creative team's developer tools (Claude Code, Gemini CLI), allowing it to "read" local project documentation and "act" as a prompt architect.

The core value lies in its ability to translate subjective creative briefs into precise, model-specific formulas that include cinematography, lighting, and cultural nuances. The research confirms that the "Soul" ecosystem by Higgsfield requires highly specific @mention syntax and multi-step workflows (Hero Image -> Animation) to achieve professional results.

## Key Findings

**Stack:** Node.js/TypeScript MCP Server using Vercel AI SDK v6, Claude 3.5 Sonnet, and Gemini 1.5 Pro.
**Architecture:** Headless tool-based architecture where the agent exposes specialized capabilities (Parsing, Validation, Generation) to a host LLM.
**Critical pitfall:** Ignoring the multi-modal @mention system of Seedance 2.0, which leads to "identity drift" in video generation.

## Implications for Roadmap

Based on research, suggested phase structure:

1.  **Phase 1: Foundation & MCP Integration** - Build the MCP server backbone and implement Docling for high-fidelity brief ingestion.
    -   Addresses: Analyzing campaign documentation.
2.  **Phase 2: Soul V2 Image Engine** - Implement the editorial-level realism prompt formulas and color/style extraction (Soul HEX/Soul ID patterns).
    -   Addresses: Generating stylized image prompts.
3.  **Phase 3: Soul Cinema & Seedance 2.0 Motion** - Develop the "Image-to-Video" pipeline focusing on camera movement and multimodal @mentions.
    -   Addresses: Cinematic video prompt generation.
4.  **Phase 4: Optimization & Feedback Loop** - Build the "Input Checklist" state management to ensure all creative gaps are filled before generation.

**Phase ordering rationale:**
-   Starting with MCP ensures the agent is usable from day one.
-   Image generation (Soul V2) is the dependency for Video generation (Seedance 2.0), following the platform's native workflow.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | MCP is the definitive standard for 2025 agent tools. |
| Features | HIGH | Specific formulas for Higgsfield models are well-documented. |
| Architecture | MEDIUM | MCP SDK v2.0 is in alpha; recommend sticking to stable v1.29.0 for now. |
| Pitfalls | MEDIUM | Community "tricks" for these models evolve rapidly. |

## Gaps to Address

-   **API Availability**: While the prompt formulas are known, the specific Higgsfield API for Soul ID/HEX integration (if desired for automation) needs verification.
-   **Vision Performance**: Evaluating the cost/latency of using Claude 3.5 Sonnet for iterative "moodboard review" turns.
