# Technology Stack

**Project:** Campaign Prompt Agent
**Researched:** June 2, 2026
**Overall Confidence:** HIGH

## Recommended Stack

The stack is centered around the **Model Context Protocol (MCP)** to ensure seamless integration with Claude Code and Gemini CLI, allowing the agent to function as a first-class tool within the user's development environment.

### Core Framework & Orchestration
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Node.js** | v20+ | Runtime | Standard for MCP server development and local CLI tools. |
| **TypeScript** | v5.4+ | Language | Type safety for complex prompt schemas and tool definitions. |
| **@modelcontextprotocol/sdk** | v1.29.0 | Protocol | The industry standard for connecting AI agents to local tools/data. |
| **Vercel AI SDK** | v6.0+ | LLM Orchestration | Best-in-class support for streaming, tool calling, and structured outputs. |

### Models (via API)
| Model | Provider | Role | Rationale |
|-------|----------|------|-----------|
| **Claude 3.5 Sonnet** | Anthropic | Lead Creative | Superior nuance for creative direction, cinematography, and "Soul" model aesthetics. |
| **Gemini 1.5 Pro** | Google | Context Specialist | 2M token window to ingest massive campaign documentation, brand books, and research. |

### Document & Visual Processing
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Docling** (IBM) | v2.96+ | Parsing | High-fidelity extraction of layouts from campaign PDFs and brand books. |
| **Zod** | v4.4+ | Validation | Strict enforcement of Soul V2/Seedance 2.0 prompt formulas (Subject + Camera + Movement). |
| **Sharp** | v0.33+ | Image Metadata | Local processing of moodboards to extract color palettes and aspect ratios before LLM analysis. |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **Zustand** | v4.5+ | State Management | Managing the "Input Checklist" and to-do list state across sessions. |
| **Commander.js** | v12.0+ | CLI Interface | Providing a secondary entry point for manual prompt generation without an agent host. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| **Orchestration** | Vercel AI SDK | LangChain | LangChain's overhead and "magic" abstractions make debugging MCP tools significantly harder. |
| **Parsing** | Docling | MarkItDown | Docling provides superior layout preservation for complex creative PDFs (moodboards/briefs). |
| **Language** | TypeScript | Python | While Python is native for AI, the MCP ecosystem for Claude Code is currently most mature and performant in Node.js. |

## Installation

### Development Environment
```bash
# Core MCP Server & SDKs
npm install @modelcontextprotocol/sdk ai zod sharp

# Types and Dev Tools
npm install -D typescript @types/node

# Document Parsing (Requires Python 3.10+)
pip install docling
```

## What NOT to Use and Why

1.  **Generic Prompt Templates**: Avoid using "one-size-fits-all" image prompt libraries. Soul V2 and Seedance 2.0 require specific `@mention` syntax and subculture keywords found in Higgsfield-specific documentation.
2.  **Vector Databases (Chroma/Pinecone)**: For local campaign folders, a vector DB is overkill. Use **Gemini 1.5 Pro's** massive context window to ingest everything directly, or simple local JSON/Markdown files for state.
3.  **Heavyweight UI Frameworks**: This is a CLI/Agent-first tool. Do not build a React/Electron dashboard unless specifically requested; keep the logic focused on being a "headless" agent.

## Sources

- [MCP Official Documentation](https://modelcontextprotocol.io) (v1.29.0)
- [Vercel AI SDK Changelog](https://sdk.vercel.ai/docs) (v6.0.193)
- [Higgsfield Soul V2 / Seedance 2.0 Prompting Guides](https://higgsfield.ai/docs) (Confirmed formulas)
- [IBM Docling Repository](https://github.com/DS4SD/docling) (v2.96.1)
