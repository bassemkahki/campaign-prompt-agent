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

---

## 📦 Installation

To install the Campaign Prompt Agent locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/campaign-prompt-agent.git
cd campaign-prompt-agent
```

### 2. Install & Build
Ensure you have **Node.js 18+** installed.
```bash
npm install
npm run build
```

### 3. Register the Agent
The project includes a dedicated installation script that automatically configures both Claude Code and Gemini CLI. It will:
1. Copy the agent definition to your user agent folders (`~/.claude/agents` and `~/.gemini/agents`).
2. Register the MCP server in your local configuration files.

```bash
npm run install-agent
```

---

## 🛠 Setup & Options

### Multi-CLI Support
The agent is compatible with:
*   **Claude Code**: Registers in `~/.claude/claude.json`.
*   **Gemini CLI**: Registers in `~/.gemini/settings.json`.

### Local Persistence
The agent creates a `.campaign/` directory in your current project root. This folder contains:
*   `sources/`: Raw documents for parsing.
*   `briefs/`: Extracted JSON representations of your campaigns, enabling persistent memory across sessions.

---

## ⚙️ Configuration

The agent requires an AI model for document synthesis and shot extraction. You can configure this via a `config.json` file in your project root or via environment variables.

### 1. Using `config.json`
Copy the template and add your API keys:
```bash
cp config.template.json config.json
```

| Key | Description |
|-----|-------------|
| `anthropicApiKey` | Your Anthropic API key (required for Claude-based extraction). |
| `googleApiKey` | Your Google AI (Gemini) API key. |
| `openaiApiKey` | Your OpenAI API key. |
| `storageRoot` | Root folder for campaign data (default: `.campaign`). |

### 2. Using Environment Variables
Alternatively, you can export these variables in your shell:
```bash
export ANTHROPIC_API_KEY="your_key_here"
export GOOGLE_API_KEY="your_key_here"
```

---

## 📖 Usage Examples

Once installed, restart your CLI and invoke the agent:

### 1. In Claude Code
```bash
/agent campaign-prompt-agent
```

### 2. In Gemini CLI
```bash
/agent campaign-prompt-agent
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
