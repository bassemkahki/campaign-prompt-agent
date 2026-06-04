# Campaign Prompt Agent 🎬✨

A high-end AI agent designed for **Claude Code** and **Gemini CLI**. It transforms complex creative campaign documentation (PDFs, PPTX, or Markdown) into highly optimized, technical prompts for professional visual AI models: **Soul V2**, **Soul Cinema**, and **Seedance 2.0**.

---

## 🚀 Key Features

*   **Intelligent Documentation Ingestion**: Automatically parses creative decks, scripts, and moodboards using IBM Docling.
*   **Structured Brief Extraction**: Synthesizes unstructured creative direction into consistent, actionable campaign briefs.
*   **Readiness Validation**: Proactively identifies missing critical data (lighting, lens choice, color palettes, or character IDs) to ensure high-fidelity generation.
*   **Technical Prompt Engineering**: 
    *   **Soul V2**: Stylized, artistic prompts focused on "soul" and emotion.
    *   **Soul Cinema**: Photorealistic, technical cinematic prompts with precise lens and camera specifications.
    *   **Seedance 2.0**: High-motion video prompts with dynamic physical parameters.
*   **Local-First & Private**: All creative briefs are stored locally within your project folder in `.campaign/`.
*   **No API Keys**: The agent runs inside your CLI and uses that host's own model for synthesis — nothing to configure, no keys to manage.

---

## 📦 Installation

To install the Campaign Prompt Agent locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/bassemkahki/campaign-prompt-agent.git
cd campaign-prompt-agent
```

### 2. Install & Build
Ensure you have **Node.js 20+** installed.
```bash
npm install
npm run build
```

### 3. Register the Agent
The project includes a dedicated installation script that automatically configures both Claude Code and Gemini CLI. It will:
1. **Claude Code** — install the subagent definition to `~/.claude/agents/` and register the MCP server at user scope (via `claude mcp add`, falling back to `~/.claude.json`).
2. **Gemini CLI** — install a `/campaign-prompt-agent` slash command to `~/.gemini/commands/` and register the MCP server in `~/.gemini/settings.json`.

```bash
npm run install-agent
```

> Restart your CLI afterwards so it picks up the new MCP server. In Claude Code you can verify with `claude mcp list`.

---

## 🛠 Setup & Options

### Multi-CLI Support
The agent is compatible with:
*   **Claude Code**: MCP server at user scope (`claude mcp add`, or `~/.claude.json`) + subagent in `~/.claude/agents/`.
*   **Gemini CLI**: MCP server in `~/.gemini/settings.json` + `/campaign-prompt-agent` command in `~/.gemini/commands/`.

### Local Persistence
The agent creates a `.campaign/` directory in your current project root. This folder contains:
*   `sources/`: Raw documents for parsing.
*   `briefs/`: Extracted JSON representations of your campaigns, enabling persistent memory across sessions.

---

## ⚙️ How It Works (Keyless)

There are **no API keys** to configure. The agent runs inside your CLI, and your CLI's own model
(Claude in Claude Code, Gemini in Gemini CLI) performs the brief synthesis. Ingestion is a simple
two-phase exchange handled transparently for you:

1. The agent calls `ingest_campaign_doc` with the document path. The MCP server parses the file
   (PDF/PPTX via **Docling**, Markdown directly) and returns the extracted text plus an extraction
   schema.
2. The agent's host model reads that text, synthesizes a structured creative brief, and calls
   `ingest_campaign_doc` again with the brief — which the server validates (Zod) and saves to
   `.campaign/briefs/`.

The remaining tools (`check_campaign_readiness`, `generate_soul_v2_prompt`,
`generate_cinema_prompt`, `generate_seedance_prompt`) are fully deterministic.

### Optional `config.json`
A `config.json` is **not required**. If you want to customize behavior, copy the template:
```bash
cp config.template.json config.json
```

| Key | Description |
|-----|-------------|
| `projectName` | Display name used by the agent (default: `Campaign Prompt Agent`). |
| `storageRoot` | Root folder for campaign data (default: `.campaign`). |

> PDF/PPTX ingestion requires [IBM Docling](https://github.com/DS4SD/docling) on your `PATH`
> (`pip install docling`). Markdown files need no extra tooling.

---

## 📖 Usage Examples

Once installed, restart your CLI and just talk to the agent — it will call the tools for you.

### 1. In Claude Code
Ask directly, or route to the subagent:
```text
@campaign-prompt-agent ingest my campaign deck at ./docs/summer_launch.pdf
```

### 2. In Gemini CLI
Run the slash command, or ask directly:
```text
/campaign-prompt-agent
```

### Example Workflow

#### Step A: Ingest a Creative Deck
The agent will parse your document and extract the core creative direction.
> **User**: "Ingest my campaign deck at `./docs/summer_launch.pdf`"
>
> **Agent**: "Successfully ingested Summer Launch. Extracted 5 shots including a cinematic sunset scene. Brief saved as `summer_launch.json`."

#### Step B: Check Readiness
Ensure your brief has everything needed for professional-grade results.
> **User**: "Is the summer_launch brief ready for generation?"
>
> **Agent**: "I found a few gaps: Missing a specific color palette and Lens choice for Shot 2. Please provide these for better results."

#### Step C: Generate Optimized Prompts
Get model-specific technical prompts.
> **User**: "Generate a Soul Cinema prompt for the sunset shot."
>
> **Agent**: "Here is your technical prompt: `Extreme close-up, golden hour lighting, anamorphic 35mm lens, slow dolly-in on subject...`"

---

## 🧪 Development & Testing

Run the test suite to verify your local setup:
```bash
npm test
```

To run the MCP server in development mode:
```bash
npm run mcp
```

---

## 📄 License
ISC © 2026
