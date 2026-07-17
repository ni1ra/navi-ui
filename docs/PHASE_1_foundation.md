# Phase 1 — Foundation and Dartio Adoption

Status: active

## Outcome

Ship Navi UI `v1.0.0` as a standalone, documented, tested package and use it as Dartio's only product UI system.

## Workstreams

- [x] Repository and contracts
  - [x] Initialize a fresh Git repository with TypeScript package tooling.
  - [x] Lock package exports, token schema, theme schema, and version contract.
  - [x] Verify build, types, lint, tests, and package contents.
- [x] Theme blueprint
  - [x] Implement semantic token primitives independent of product branding.
  - [x] Implement deep-black, bright-silver, and blood-red reference themes.
  - [x] Cover focus, success, warning, destructive, disabled, and reduced-motion states.
  - [x] Verify theme switching without component forks.
- [x] React system
  - [x] Implement providers, navigation, buttons, fields, feedback, layout, and data-display primitives needed by Dartio.
  - [x] Implement component state contracts and accessibility behavior.
  - [x] Verify keyboard, focus, overflow, and responsive behavior.
- [ ] Documentation and release
  - [x] Create a visual playground and usage documentation.
  - [x] Consume the package from Dartio without copied component code.
  - [ ] Publish GitHub repository and `v1.0.0` release.
  - [ ] Publish npm package only after package/release gates pass.
- [ ] Phase closure
  - [ ] Audit public API and delete unused abstractions.
  - [ ] Run production readiness and package-consumer verification.
  - [ ] Reconcile docs and close the phase.

## Risks

- Theme flexibility could become an unbounded styling DSL; keep the schema semantic and finite.
- Package publishing could outrun API stability; Dartio consumption is the release gate.
- Visual richness could reduce accessibility or performance; browser proof is mandatory.
