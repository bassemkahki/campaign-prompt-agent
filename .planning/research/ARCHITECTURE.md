# Architecture Patterns

**Domain:** AI-Driven Creative Campaign Execution
**Researched:** June 2, 2026

## Recommended Architecture

The system follows a **"Headless MCP Agent"** pattern. It doesn't have its own LLM instance; instead, it exposes a set of specialized tools that a host LLM (like Claude 3.5 Sonnet) uses to achieve campaign goals.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **MCP Server** | Entry point, tool discovery, and routing. | Host (Claude Code/Gemini CLI) |
| **Doc Processor** | High-fidelity parsing and layout extraction. | LLM (for analysis) |
| **Prompt Architect** | Translating creative intent into @mention formulas. | Zod (for validation) |
| **State Manager** | Persistent storage of "Input Checklist" and project memory. | Local Filesystem |

### Data Flow

1.  **Ingestion**: User points the agent to a campaign folder.
2.  **Indexing**: `analyze_campaign` tool runs Docling to parse files; summaries stored in `.memory.json`.
3.  **Gap Analysis**: LLM compares parsed data against the "Input Checklist" schema.
4.  **Prompt Generation**: LLM uses `generate_soul_prompt` tool, which enforces the Soul V2 formula via Zod schemas.
5.  **Output**: Final prompts are written to a `PROMPTS.md` file in the project folder.

## Patterns to Follow

### Pattern 1: Tool-Chain Validation
**What**: Every generated prompt must be validated against a strict schema *before* being shown to the user.
**Why**: Models like Soul V2 fail silently or produce poor results if specific tokens (e.g., camera movements) are missing or malformed.
**Example**:
```typescript
const SoulPromptSchema = z.object({
  subject: z.string(),
  outfit: z.string(),
  camera: z.string(),
  lighting: z.string().optional(),
  preset: z.string().default("Cinematic"),
});
```

### Pattern 2: Multi-Modal Reference (@Mentions)
**What**: When generating Seedance 2.0 prompts, always include a placeholder for `@Image1` or `@Video1` as specified in the platform documentation.

## Anti-Patterns to Avoid

### Anti-Pattern 1: The "Black Box" Prompt
**What**: Generating a single massive paragraph with no structure.
**Why bad**: Hard for creative directors to tweak and hard for the model to follow.
**Instead**: Use the formulaic approach: `[Subject] + [Outfit] + [Camera]`.

## Scalability Considerations

| Concern | At 1 campaign | At 100 campaigns |
|---------|---------------|------------------|
| **Latency** | Inconsequential. | Parallelize document parsing using Docling workers. |
| **Context** | Fits in 128k context. | Use Gemini 1.5 Pro's 2M context for brand-wide cross-referencing. |

## Sources

- [Model Context Protocol Specs](https://modelcontextprotocol.io)
- [Zod Documentation](https://zod.dev)
