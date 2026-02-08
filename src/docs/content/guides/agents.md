---
title: Working with Agents
description: Configure and manage AI agent runtimes
order: 5
---

# Working with Agents

Hivemind is **runtime-agnostic**. Use Claude Code, Codex, OpenCode, Gemini — or swap later without changing your TaskFlows.

## Configuring Runtimes

```yaml
# .hivemind/config.yaml
runtimes:
  default: claude-code
  available:
    - name: claude-code
      adapter: "@hivemind/adapter-claude"
      config:
        model: claude-sonnet-4-5-20250514
    - name: codex
      adapter: "@hivemind/adapter-codex"
    - name: gemini
      adapter: "@hivemind/adapter-gemini"
```

## Agent Isolation

Every agent runs in a **scoped environment**:

- **File locks** — Exclusive access to assigned files
- **Read boundaries** — Agents can only read files in their scope
- **Output validation** — All writes are validated before committing
- **Resource limits** — CPU, memory, and time bounds per agent

```typescript
// Agent scope definition
interface AgentScope {
  files: string[];           // Exclusive write access
  readAccess: string[];      // Read-only access
  timeout: number;           // Max execution time (ms)
  maxRetries: number;        // Bounded retry count
}
```

## Monitoring Agents

```bash
# List running agents
hivemind agents

# Watch a specific agent
hivemind watch agent-03

# View agent event history
hivemind events --agent agent-03
```

## Custom Adapters

Build your own runtime adapter:

```typescript
import { AgentAdapter } from '@hivemind/sdk';

export class MyAdapter implements AgentAdapter {
  async execute(task: AgentTask): Promise<AgentResult> {
    // Your runtime logic here
  }

  async cancel(agentId: string): Promise<void> {
    // Cleanup logic
  }
}
```
