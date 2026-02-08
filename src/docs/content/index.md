---
title: Hivemind Documentation
description: A local-first orchestration system for AI agents that work on real codebases
order: 0
---

# Welcome to Hivemind

Hivemind is a **local-first orchestration system** for AI agents that work on real codebases — with full observability, explicit control, and human authority at every critical boundary.

## Core Philosophy

- **Observability is truth** — if it happened, you can see it
- **Explicit structure beats implicit magic** — nothing is assumed
- **Human authority at critical boundaries** — agents work fast, humans decide what ships
- **Local-first, tool-agnostic** — your code stays on your machine
- **Replaceable intelligence, stable system** — models change, architectures shouldn't break

## Quick Start

```bash
# Install Hivemind
npm install -g @hivemind/cli

# Initialize in your project
hivemind init

# Run your first TaskFlow
hivemind run refactor --scope src/utils
```

## Architecture Overview

Hivemind coordinates agents the same way serious systems coordinate services: with **plans**, **state**, **events**, and **rules**.

| Concept | Description |
|---------|-------------|
| **TaskFlows** | Deterministic execution plans — not prompts |
| **Agents** | Scoped, parallel, isolated workers |
| **Events** | Every action emits inspectable events |
| **Checkpoints** | Incremental commits for diffs, undo, retries |
