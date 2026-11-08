# TrakSpool Site — TODO

## Bugs

<!-- - [ ] Description of bug — *file/area affected* -->

## Tasks

### Open-source launch
- [ ] When a repository goes public, set `published: true` (and its `href` if empty) in `src/data/project.js`. Every card, the header GitHub icon, the footer and the Contact page follow. CAD, PCB and BOM have no location yet (`href: null`).
- [ ] Fill in `LICENSE` in `src/data/project.js` once the licenses are chosen (Build page and FAQ show "to be announced" until then).
- [ ] Fill in the Build it guide (`/build`): photos into `public/build/`, then each step's `images`, `instructions` and `tip` in `src/data/buildGuide.js`, plus the "At a glance" facts (time, difficulty, skills) and the full tool list. The step titles are an outline; rename, add or remove steps there. Steps 1–5 (hardware) have no instructions yet.
- [ ] Publish the API reference and contributing guide; they are "Coming soon" cards on the Docs page (`src/pages/Resources.jsx`).
- [ ] `public/og-image.png` (social preview) still shows the old violet / cyan design.
- [ ] The user docs in `public/docs/` (copied from TrakSpool-docs) still describe a boxed product ("What's in the Box") and firmware 0.1.1 in their headers. Update them in TrakSpool-docs, then copy them here.
- [ ] Privacy and Terms: the text was kept, apart from removing the waitlist section and the "don't redistribute" clause. Review it against what the site actually uses (Vercel Web Analytics, esp-web-tools from unpkg.com on the updater page).

## UI/UX Modernization

<!-- Part of the workspace-wide UI/UX initiative — see ../TODO.md -->

- [x] Site moved to the admin console's "Workshop" design (Nov 2026): `src/styles/theme.css` is a verbatim copy of the console's, `components.css` copies the console kit's primitives, system fonts only (Google Fonts removed), console logo (`public/spool-logo.svg`).
- [x] Removed the settings panel (font picker, text size), the simulated newsletter form, and the unused DashboardPreview / FeatureIcon / ThemeContext / Timeline components.
- [ ] Become a consumer of a shared web design system package instead of copying `theme.css` and the kit from the console (see ../TODO.md). Until then, change shared rules in both repos.
- [ ] Accessibility sweep with a screen reader (focus states, contrast and keyboard use were checked in the redesign, not with assistive technology).

## Notes

- `public/logo.svg`, `logo.jpeg` and `logo-optimized.jpeg` are no longer used by the pages; kept because outside links may point at them.
