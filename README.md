# Claude Desktop

A desktop AI assistant powered by Anthropic's Claude API, with native file/code capabilities and real-time streaming.

<p align="center">
  <img src="public/favicon.png" alt="Claude Desktop" width="128" />
</p>

## Features

- **Native Desktop App** — Electron, runs on Windows / macOS / Linux
- **Real-time Streaming** — Native SSE streaming, no simulated delays
- **Tool Use** — Read, Write, Edit files, execute shell commands, search codebases
- **Extended Thinking** — Toggle extended thinking for complex reasoning
- **Projects** — Organize conversations with shared files and instructions
- **Skills** — Custom instruction sets loaded on demand
- **Dark Mode** — Full light / dark theme support
- **Auto Update** — Built-in updater for seamless upgrades
- **Multi-model** — Claude Sonnet, Opus, Haiku

## Quick Start

### Download (Recommended)

Download the latest installer from the [Releases](../../releases) page.

### Build from Source

```bash
git clone https://github.com/YOUR_USERNAME/claude-desktop.git
cd claude-desktop
npm install
npm run electron:dev
```

### Build Installer

```bash
npm run electron:build:win    # Windows (.exe)
npm run electron:build:mac    # macOS (.dmg)
npm run electron:build:linux  # Linux (.AppImage)
```

## Architecture

```
Electron App
├── React Frontend (Vite + TailwindCSS)
├── Bridge Server (Express, localhost:30080)
│   ├── CRUD: conversations, projects, files, skills
│   ├── Chat: spawns Claude Code engine per message
│   └── Vision: Bun subprocess for image analysis
├── Claude Code Engine (engine/)
│   ├── Full Claude Code TypeScript source
│   ├── 19+ tools (Read, Write, Edit, Bash, Glob, Grep, WebFetch, WebSearch, Agent...)
│   ├── Agentic loop with real SSE streaming
│   └── Session management with --resume
└── Electron Main Process
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, TailwindCSS |
| Build | Vite 6 |
| Desktop | Electron |
| Engine | Claude Code (TypeScript, runs via Bun) |
| Markdown | react-markdown, highlight.js, KaTeX, Mermaid |

## Prerequisites

- [Bun](https://bun.sh) — required for the Claude Code engine

## Configuration

Set a custom API key and base URL in **Settings > General** to use your own Anthropic API endpoint.

## License

Non-commercial use only. See [LICENSE](LICENSE) for details.
