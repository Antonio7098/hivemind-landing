---
title: Safety & Observability
description: How Hivemind keeps you in control
order: 6
---

# Safety & Observability

Hivemind is built on the principle that **AI agents are powerful and dangerous**. Every feature is designed to keep humans informed and in control.

## Event Stream

Every agent action emits an event. The event stream is your source of truth:

```bash
# Follow events in real-time
hivemind events --follow

# Filter by type
hivemind events --type file_write

# Export for analysis
hivemind events --format json > events.json
```

## Approval Gates

Critical operations require explicit human approval:

```yaml
steps:
  - name: deploy-changes
    action: diff
    requires_approval: true
    approval_timeout: 3600  # 1 hour timeout
    notify:
      - slack: "#engineering"
      - email: "team@example.com"
```

## Bounded Retries

Agents never loop forever. All retries are bounded:

```yaml
steps:
  - name: fix-tests
    action: transform
    retries: 3
    retry_strategy: exponential
    on_failure: halt  # or 'skip', 'rollback'
```

## Rollback

Every execution can be fully reversed:

```bash
# Rollback the last run
hivemind rollback

# Rollback to a specific checkpoint
hivemind rollback --to checkpoint-abc123

# Dry-run rollback (preview only)
hivemind rollback --dry-run
```

## Audit Trail

Hivemind maintains a complete audit trail:

- **Who** initiated each action
- **What** changed and why
- **When** it happened
- **Which** agent performed the work
- **How** it was approved or rejected
