---
phase: 01
slug: foundation-analysis
status: draft
nyquist_compliant: true
wave_0_complete: false
created: June 2, 2026
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm run test:full` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test`
- **After every plan wave:** Run `npm run test:full`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | BACK-01 | T-01-SC | Manual package audit | manual | N/A | ✅ | ⬜ pending |
| 01-01-02 | 01 | 1 | BACK-01 | — | N/A | unit | `docling --version` | ✅ | ⬜ pending |
| 01-01-03 | 01 | 1 | BACK-01 | — | N/A | integration | `npm test` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 2 | BACK-02 | T-01-02 | .gitignore for secrets | unit | `npm test tests/setup.test.ts` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 2 | BACK-01 | T-01-01 | MCP SDK standard transport | integration | `npm test tests/mcp.test.ts` | ❌ W0 | ⬜ pending |
| 01-02-03 | 02 | 2 | BACK-01 | — | N/A | manual | N/A | ✅ | ⬜ pending |
| 01-03-01 | 03 | 3 | ANAL-01 | — | N/A | unit | `npm test tests/ingestion.test.ts` | ❌ W0 | ⬜ pending |
| 01-03-02 | 03 | 3 | WORK-02 | T-01-05 | Project-level isolation | unit | `npm test tests/storage.test.ts` | ❌ W0 | ⬜ pending |
| 01-03-03 | 03 | 3 | ANAL-01 | T-01-04 | Path sanitization | integration | `npm test tests/ingestion.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — Framework initialization (Plan 01).
- [ ] `tests/mcp.test.ts` — Stubs for BACK-01 (Plan 01).
- [ ] `tests/setup.test.ts` — Environment verification (Plan 01).
- [ ] `tests/ingestion.test.ts` — Stubs for ANAL-01 (Plan 03).
- [ ] `tests/storage.test.ts` — Stubs for WORK-02 (Plan 03).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Package Audit | BACK-01 | Security policy | Verify [ASSUMED] packages against registries. |
| MCP Installation | BACK-01 | Integration with host | Install as local tool in Claude Code and verify connectivity. |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
