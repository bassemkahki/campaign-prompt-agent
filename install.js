import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import os from 'os';

const HOME = os.homedir();
const PROJECT_ROOT = process.cwd();
const AGENT_NAME = 'campaign-prompt-agent';
const DIST_PATH = path.join(PROJECT_ROOT, 'dist', 'mcp', 'server.js');
const MCP_ENTRY = { command: 'node', args: [DIST_PATH] };

async function install() {
  console.log('🚀 Starting Campaign Prompt Agent installation...');

  // 1. Build the project
  console.log('📦 Building project...');
  try {
    execSync('npm install && npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Build failed. Please ensure Node.js 20+ and npm are installed.');
    process.exit(1);
  }

  if (!fs.existsSync(DIST_PATH)) {
    console.error(`❌ Build output missing at ${DIST_PATH}. Aborting.`);
    process.exit(1);
  }

  // 2. Claude Code — subagent definition + MCP registration
  installClaude();

  // 3. Gemini CLI — custom command + MCP registration
  installGemini();

  console.log('\n✨ Installation complete!');
  console.log('\nRestart your CLI, then:');
  console.log(`  • Claude Code: ask the agent to "ingest my campaign deck at ./path.pdf", or invoke the subagent with "@${AGENT_NAME}".`);
  console.log(`  • Gemini CLI:  run "/${AGENT_NAME}", or ask it to ingest a campaign doc.`);
  console.log('\nNo API keys required — synthesis runs on your CLI\'s own model.');
}

// ---------------------------------------------------------------------------
// Claude Code
// ---------------------------------------------------------------------------
function installClaude() {
  const claudeDir = path.join(HOME, '.claude');
  if (!fs.existsSync(claudeDir)) {
    console.log('ℹ️  ~/.claude not found — skipping Claude Code install.');
    return;
  }

  // Subagent definition
  const agentSource = path.join(PROJECT_ROOT, 'install', `${AGENT_NAME}.md`);
  const agentsDir = path.join(claudeDir, 'agents');
  if (!fs.existsSync(agentsDir)) fs.mkdirSync(agentsDir, { recursive: true });
  fs.copyFileSync(agentSource, path.join(agentsDir, `${AGENT_NAME}.md`));
  console.log(`✅ Installed Claude subagent → ${path.join(agentsDir, AGENT_NAME + '.md')}`);

  // MCP registration — prefer the official CLI (writes the correct format for the
  // installed version), fall back to merging ~/.claude.json (user scope).
  if (registerViaClaudeCli()) return;
  mergeMcpServer(path.join(HOME, '.claude.json'), true);
}

function registerViaClaudeCli() {
  try {
    execSync('claude --version', { stdio: 'ignore' });
  } catch {
    return false; // CLI not on PATH
  }
  try {
    // Idempotent: drop any prior registration before re-adding.
    try { execSync(`claude mcp remove --scope user ${AGENT_NAME}`, { stdio: 'ignore' }); } catch {}
    execSync(`claude mcp add --scope user ${AGENT_NAME} -- node "${DIST_PATH}"`, { stdio: 'ignore' });
    console.log('✅ Registered MCP server with Claude Code (user scope).');
    return true;
  } catch (error) {
    console.log('⚠️  `claude mcp add` failed; falling back to editing ~/.claude.json.');
    return false;
  }
}

// ---------------------------------------------------------------------------
// Gemini CLI
// ---------------------------------------------------------------------------
function installGemini() {
  const geminiDir = path.join(HOME, '.gemini');
  if (!fs.existsSync(geminiDir)) {
    console.log('ℹ️  ~/.gemini not found — skipping Gemini CLI install.');
    return;
  }

  // Custom slash command (/campaign-prompt-agent)
  const tomlSource = path.join(PROJECT_ROOT, 'install', `${AGENT_NAME}.toml`);
  if (fs.existsSync(tomlSource)) {
    const commandsDir = path.join(geminiDir, 'commands');
    if (!fs.existsSync(commandsDir)) fs.mkdirSync(commandsDir, { recursive: true });
    fs.copyFileSync(tomlSource, path.join(commandsDir, `${AGENT_NAME}.toml`));
    console.log(`✅ Installed Gemini command → /${AGENT_NAME}`);
  }

  // MCP registration (Gemini reads ~/.gemini/settings.json → mcpServers)
  mergeMcpServer(path.join(geminiDir, 'settings.json'), false);
}

// ---------------------------------------------------------------------------
// Shared JSON merge for MCP server registration
// ---------------------------------------------------------------------------
function mergeMcpServer(configPath, createIfMissing) {
  let data = {};
  if (fs.existsSync(configPath)) {
    try {
      data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
      console.error(`⚠️  Could not parse ${configPath}: ${error.message}. Skipping.`);
      return;
    }
  } else if (!createIfMissing) {
    return;
  }

  if (!data.mcpServers) data.mcpServers = {};
  data.mcpServers[AGENT_NAME] = MCP_ENTRY;

  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
  console.log(`✅ Registered MCP server in ${configPath}`);
}

install().catch(console.error);
