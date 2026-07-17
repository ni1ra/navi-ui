# Cycle 1 — Bootstrap the Real Package

Status: complete (2026-07-17)

Derived from: `PHASE_1_foundation.md`

## Slice

- [x] Initialize the package as `navi-ui` version `1.0.0` with React/TypeScript exports.
- [x] Implement the semantic token contract and three reference themes.
- [x] Implement the provider plus the smallest component set required for a real Dartio shell.
- [x] Add a responsive playground that exercises every theme and state.
- [x] Add focused tests for token completeness, provider behavior, and package exports.
- [x] Verify build, types, lint, tests, package contents, keyboard focus, and mobile/desktop rendering.
- [x] Update Phase 1 evidence and REPO_CONTROL with actual receipts.

## Acceptance proof

- `package.json` reports `1.0.0` and a stable public export map.
- All three themes satisfy the same semantic token schema.
- A consumer imports components and themes from the package without source copying.
- Canonical checks pass and the packed artifact contains only intended runtime/types/docs surfaces.

## Evidence

- `pnpm check`: lint, typecheck, 29/29 tests, library build, and playground build passed.
- `pnpm audit --audit-level high`: no known vulnerabilities.
- `pnpm pack --dry-run`: 13 intended files; runtime JS/CSS, declarations/maps, README, license, and package metadata only.
- Browser proof: Black/Silver/Blood switching, keyboard tab navigation, modal Escape, visible focus, and desktop/tablet/mobile overflow checks passed.
- Dartio consumes the package through its public exports; no Navi source is copied into Dartio.
- Remaining phase gates are release operations and the externally blocked three-mode Figma library.
