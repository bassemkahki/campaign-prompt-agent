import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import os from 'os';

const HOME = os.homedir();
const PROJECT_ROOT = process.cwd();
const AGENT_NAME = 'campaign-prompt-agent';
const DIST_PATH = path.join(PROJECT_ROOT, 'dist', 'mcp', 'server.js');

async function install() {
  console.log('🚀 Starting Campaign Prompt Agent installation...');

  // 1. Build the project
  console.log('📦 Building project...');
  try {
    execSync('npm install && npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Build failed. Please ensure Node.js and npm are installed.');
    process.exit(1);
  }

  // 2. Install Agent Definition File
  const agentSource = path.join(PROJECT_ROOT, 'install', `${AGENT_NAME}.md`);
  const targets = [
    path.join(HOME, '.claude', 'agents'),
    path.join(HOME, '.gemini', 'agents')
  ];

  for (const targetDir of targets) {
    if (fs.existsSync(path.dirname(targetDir))) {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const targetFile = path.join(targetDir, `${AGENT_NAME}.md`);
      fs.copyFileSync(agentSource, targetFile);
      console.log(`✅ Copied agent definition to ${targetFile}`);
    }
  }

  // 3. Register MCP Server
  const mcpConfig = {
    command: 'node',
    args: [DIST_PATH]
  };

  // Update Claude Config
  const claudeConfigPath = path.join(HOME, '.claude', 'claude.json');
  updateMcpConfig(claudeConfigPath, AGENT_NAME, mcpConfig);

  // Update Gemini Config
  const geminiConfigPath = path.join(HOME, '.gemini', 'settings.json');
  updateMcpConfig(geminiConfigPath, AGENT_NAME, mcpConfig);

  console.log('\n✨ Installation complete!');
  console.log(`\nTo use the agent, restart your CLI and type:`);
  console.log(`  /agent ${AGENT_NAME}`);
}

function updateMcpConfig(configPath, serverName, config) {
  if (!fs.existsSync(configPath)) {
    // If directory exists but config doesn't, create a basic one
    if (fs.existsSync(path.dirname(configPath))) {
      const initialConfig = { mcpServers: { [serverName]: config } };
      fs.writeFileSync(configPath, JSON.stringify(initialConfig, null, 2));
      console.log(`✅ Created and registered MCP server in ${configPath}`);
    }
    return;
  }

  try {
    const rawData = fs.readFileSync(configPath, 'utf8');
    const data = JSON.parse(rawData);

    if (!data.mcpServers) {
      data.mcpServers = {};
    }

    data.mcpServers[serverName] = config;

    fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
    console.log(`✅ Registered MCP server in ${configPath}`);
  } catch (error) {
    console.error(`⚠️ Failed to update ${configPath}: ${error.message}`);
  }
}

install().catch(console.error);
