---
title: Quick Start
description: Run your first Hivemind TaskFlow in 5 minutes
order: 2
---

# Quick Start

## Your First TaskFlow

A TaskFlow is a deterministic execution plan. Create one:

```bash
hivemind flow create refactor-utils
```

This generates a TaskFlow definition:

```yaml
# .hivemind/taskflows/refactor-utils.yaml
name: refactor-utils
scope:
  - src/utils/**/*.ts
steps:
  - name: analyze
    action: scan
    description: "Identify code smells and patterns"
  - name: refactor
    action: transform
    parallel: true
    max_agents: 3
    description: "Apply refactoring patterns"
  - name: verify
    action: test
    description: "Run tests and type checks"
  - name: review
    action: diff
    requires_approval: true
```

## Execute the Flow

```bash
hivemind run refactor-utils
```

Hivemind will:

1. **Plan** — Parse the TaskFlow and resolve dependencies
2. **Execute** — Spin up scoped agents in parallel
3. **Verify** — Run automated checks with bounded retries
4. **Review** — Present clean diffs for your approval

## Monitor Execution

Watch the event stream in real time:

```bash
hivemind events --follow
```

Or inspect a specific step:

```bash
hivemind inspect refactor-utils:analyze
```

## Approve or Reject

When execution reaches a review step:

```bash
# View the diff
hivemind diff refactor-utils

# Approve and merge
hivemind approve refactor-utils

# Or reject and rollback
hivemind reject refactor-utils
```
