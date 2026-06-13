# TrakSpool Site — TODO

## Bugs

<!-- - [ ] Description of bug — *file/area affected* -->

## Tasks

<!-- - [ ] Description of task -->

## UI/UX Modernization

<!-- Part of the workspace-wide UI/UX initiative — see ../TODO.md -->

### Quick wins
- [ ] Tokenize hardcoded button gradients — *src/styles/components.css*.
- [ ] Verify mobile header/nav parity with the admin console fix (shared `layout.css` lineage) — *src/styles/layout.css*.

### Larger
- [ ] Become a consumer of the shared web design system (see ../TODO.md); stop maintaining a divergent copy of theme.css / global.css / layout.css / components.css.
- [ ] Reconcile duplicated components with the console (ThemeToggle, SettingsPanel, Timeline, DashboardPreview, FeatureIcon, NewsletterSignup) — single source.
- [ ] Marketing visual refresh aligned to the locked brand system (hero, Features, Store, DocViewer typography).
- [ ] Accessibility sweep — focus-visible coverage, contrast, keyboard nav.

## Notes

<!-- General notes, observations, or things to investigate -->
- Web surface is already on design tokens + light/dark — this is consolidation/polish, not a rewrite.
