---
title: TaskFlows
description: Deterministic execution plans for agent orchestration
order: 4
---

# TaskFlows

TaskFlows are the core primitive in Hivemind. They replace ad-hoc prompts with **deterministic, replayable execution plans**.

## Anatomy of a TaskFlow

```yaml
name: migrate-api
version: 1
scope:
  include:
    - src/api/**/*.ts
    - src/routes/**/*.ts
  exclude:
    - "**/*.test.ts"

steps:
  - name: analyze
    action: scan
    output: analysis.json

  - name: transform
    action: transform
    input: analysis.json
    parallel: true
    max_agents: 4
    checkpoint: after-each

  - name: test
    action: test
    command: "npm run test:api"
    retries: 2

  - name: review
    action: diff
    requires_approval: true
```

## Step Types

| Action | Description | Parallelizable |
|--------|-------------|---------------|
| `scan` | Read and analyze files | No |
| `transform` | Modify files based on plan | Yes |
| `test` | Run test commands | No |
| `diff` | Generate and present diffs | No |
| `checkpoint` | Save execution state | No |

## Parallel Execution

When `parallel: true` is set, Hivemind distributes work across multiple agents. Each agent operates on a **scoped subset** of files — no two agents touch the same file.

```yaml
steps:
  - name: refactor-modules
    action: transform
    parallel: true
    max_agents: 4
    isolation: file-level  # each agent gets exclusive file locks
```

## Checkpoints

Checkpoints create incremental snapshots of the codebase during execution:

```bash
# List checkpoints for a flow
hivemind checkpoints migrate-api

# Restore to a specific checkpoint
hivemind restore migrate-api:transform:3

# Compare checkpoints
hivemind diff --checkpoint transform:2..transform:3
```
