---
title: Architecture Overview
description: How Hivemind orchestrates AI agents safely
order: 3
---

# Architecture Overview

Hivemind is built on an **event-driven architecture** that treats agent execution like a distributed system — with plans, state machines, event sourcing, and explicit boundaries.

## Core Components

### Control Plane

The control plane manages the lifecycle of all agent activity:

- **TaskFlow Engine** — Parses and executes deterministic plans
- **Scheduler** — Manages parallel agent allocation
- **Event Bus** — Captures and routes all execution events
- **Checkpoint Manager** — Handles incremental state persistence

### Agent Runtime

Each agent runs in an **isolated scope**:

```
┌─────────────────────────────┐
│         Control Plane        │
│  ┌───────┐  ┌───────────┐  │
│  │ Sched │  │ Event Bus  │  │
│  └───┬───┘  └─────┬─────┘  │
│      │            │         │
│  ┌───▼────────────▼─────┐  │
│  │    TaskFlow Engine    │  │
│  └───┬──────┬──────┬────┘  │
│      │      │      │       │
│  ┌───▼──┐┌──▼──┐┌──▼──┐   │
│  │Agent ││Agent││Agent│   │
│  │  01  ││  02 ││  03 │   │
│  └──────┘└─────┘└─────┘   │
└─────────────────────────────┘
```

### Event Sourcing

Every action emits an event. Events are immutable, ordered, and inspectable:

```typescript
interface HivemindEvent {
  id: string;
  timestamp: number;
  agent: string;
  action: 'file_read' | 'file_write' | 'test_run' | 'checkpoint';
  payload: Record<string, unknown>;
  parent?: string;  // event chain
}
```

## Design Principles

1. **No hidden state** — Everything is observable
2. **Bounded execution** — Retries have limits, loops have exits
3. **Explicit merges** — No surprise commits to your codebase
4. **Graceful degradation** — If an agent fails, the system continues
