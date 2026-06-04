---
plan_id: "04-01"
plan_name: "Workflow Optimization"
one_liner: "Implement Campaign Readiness Checklist and automated input validation."
key-files:
  created:
    - "src/services/validation.ts"
    - "tests/validation.test.ts"
  modified:
    - "src/mcp/server.ts"
    - "src/schema/brief.ts"
    - "tests/mcp.test.ts"
requirements:
  - "WORK-01"
---

# Summary: Workflow Optimization

Implemented the `ValidationService` to perform automated checks on creative briefs, and integrated it into the MCP server via the `check_campaign_readiness` tool. Added proactive warning injection to all generation tools.
