# Navi UI Repository Control

## Canonical identity

- Local path: `C:\Users\nira\Documents\Codex\2026-07-17\rec\navi-ui`
- GitHub target: `https://github.com/ni1ra/navi-ui`
- Package target: `navi-ui@1.0.0` (publish only after release gates)
- Git author: `andreashoug <andreashoug@gmail.com>`

## Operating facts

- This repository is greenfield. Do not copy legacy Dartio code.
- Dartio is the first production consumer and the compatibility gate.
- Source tokens are semantic; themes do not fork component implementations.
- Required themes: deep black, bright silver, blood red.
- Never store secret values in repository files or documentation.

## Canonical commands

- `pnpm install --frozen-lockfile`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm --dir playground build`
- `pnpm pack --dry-run`

## External systems

- GitHub CLI authenticated as `ni1ra`.
- npm authenticated as `la1in`.
- Figma file: `Navi UI · Dartio`, key `66vJbECYwPmU9oWxnWO07j`.
- Figma connection is authenticated as `hougspam@gmail.com`, but the current Starter/View seat permits only one variable mode. The required Black/Silver/Blood variable collection is blocked until the file is moved to a plan and editor seat supporting at least three modes. The failed write was rolled back; the file has no partial variables or components.
- Local package evidence: 29 tests pass; types, lint, library build, playground build, package-content dry run, accessibility keyboard behavior, and responsive browser checks pass.
- Publishing remains gated on committed GitHub CI and Dartio consuming the releaseable package contract.
