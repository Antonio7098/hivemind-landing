---
title: Installation
description: Get Hivemind up and running in your project
order: 1
---

# Installation

## Prerequisites

- **Node.js** 20 or later
- **Git** 2.30+
- A supported AI runtime (Claude Code, Codex, OpenCode, or Gemini CLI)

## Install the CLI

```bash
npm install -g @hivemind/cli
```

Or with your preferred package manager:

```bash
# yarn
yarn global add @hivemind/cli

# pnpm
pnpm add -g @hivemind/cli
```

## Initialize Your Project

Navigate to your project root and run:

```bash
hivemind init
```

This creates a `.hivemind/` directory with:

```
.hivemind/
├── config.yaml        # Project configuration
├── taskflows/         # Your TaskFlow definitions
├── checkpoints/       # Execution checkpoints
└── events/            # Event log
```

## Verify Installation

```bash
hivemind doctor
```

This checks your environment, verifies runtime adapters, and confirms everything is ready.

## Configuration

Edit `.hivemind/config.yaml` to set your preferences:

```yaml
runtime: claude-code
parallel_agents: 4
checkpoint_strategy: incremental
merge_policy: explicit-approval
```
