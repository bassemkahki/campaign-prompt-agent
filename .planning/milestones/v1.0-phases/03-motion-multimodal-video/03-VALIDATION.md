# Phase 3: Motion & Multimodal Video - Validation Architecture

## Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 1.x |
| Config file | `vitest.config.ts` |
| Quick run command | `npm test` |
| Full suite command | `npm test --run` |

## Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VID-01 | Seedance prompt formula (Context + Delta) | unit | `npx vitest tests/prompts.test.ts` | ✅ |
| VID-02 | Motion command mapping (-zoom, -pan, etc.) | unit | `npx vitest tests/prompts.test.ts` | ✅ |
| VID-03 | @ImageN resolution logic | unit | `npx vitest tests/prompts.test.ts` | ✅ |

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V5 Input Validation | yes | Zod schemas for `shotId`, `intensity` (1-10) |
| V8 Error Handling | yes | Standardized MCP error responses |

### Known Threat Patterns for AI Prompting

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Prompt Injection (Downstream) | Tampering | Sanitize user-provided shot descriptions to prevent escaping prompt structure. |
