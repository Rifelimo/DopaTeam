# StarLens website redesign

Prepared 2026-09-14 from main revision `14a7791`, preserving the two deployment and reproduction updates after the user-specified `befcfd9` source.

## Pages and ownership

- `index.html` is the overview and an embedded reported-study explorer.
- `impact.html` explains the scientific motivation, prior research and its limits.
- `hackathon.html` connects working features to source evidence and next validation steps.
- `prototype.html` mounts the existing React research workspace.
- `site.css` and `site.js` control the three public pages.
- `src/workspace-theme.css` overrides workspace presentation after the original stylesheet.
- `src/site/constellation.js` renders the decorative brain. It supports pause, reduced motion, resize and offscreen suspension.
- `public/brand/` holds the 7,200 sampled points, original SVG mark and required FreeSurfer license. Preserve the license when distributing the geometry.

The illustration's colors are decorative. The first workspace view now presents source-linked aggregate findings from a 2025 publication and a 2026 submitted manuscript. The separate regional sandbox retains 82 invented region IDs and 30 synthetic references. The Neural Observatory has 68 cortical regions and 14 deep structures; no anatomical crosswalk or connection from paper values to that atlas has been added. See [reported study evidence](STUDY_EVIDENCE.md) for source scope, statistics and verification.

## Design references

The user selected [this Refero style](https://styles.refero.design/style/e5f5f8cf-e68d-4ed1-bbf5-6b67569af648), describing the Dala website. Its black background, generous whitespace, large regular headings, violet actions and particle brain inform the design. No Dala logo, marketing copy or image asset was copied. A secondary Linear changelog reference informed dated source links on the build page. Noto Sans JP follows the user's typography preference.

## Local development and publishing

Use Node 22.12 or later. Run `npm ci`, then `npm run dev`, and open `http://127.0.0.1:5184/`.

Run `npm run build` to generate `prototype-dist/`. `npm run preview` serves the compiled result. Vite has four HTML entry points and copies `public/` assets. Vercel builds with `npm run build`; no Unix-only file-copy command is needed. `.vercelignore` includes all required source and public assets.

Edit the HTML for copy and links, `site.css` for public-page presentation, or `src/workspace-theme.css` for the analysis theme. The homepage and first workspace view share `StudyEvidence.jsx`, with scoped styling in `src/study-evidence.css`. Reported coefficients are transcribed source values. The independent synthetic workflow retains the existing core calculations.

## Initial redesign verification

All 26 existing Node tests and all 16 Python tests passed. Windows testing used a process-local `python3` alias to the bundled Python 3.12.14 executable because the original cross-language tests invoke `python3`. No test or model source was changed for this environment adjustment.

The four-page production build passed. In the browser, the particle canvas loaded, pause and play worked, and the three synthetic references produced 0.818, 0.782 and -0.731. These match the original calculation. Model A changed from 1.01 to 1.02 after one keyboard increment to its response gain, and Reset restored defaults. All three workspace views rendered without browser console errors.

The public pages and workspace were inspected at desktop width and 390-pixel mobile width. The mobile menu opens, closes with Escape and returns focus to its button. No horizontal overflow was observed. The existing published 3D atlas was opened and its standard-anatomy and no-study-data state confirmed.

Software verification establishes interface and implementation behavior. It does not validate diagnosis, cellular state estimation, drug selection or patient benefit.

## Current paper demo verification

After the separate fixed-input guidance update `814ad45`, the paper demo added a fourth workspace view and replaced the homepage's synthetic comparison. All 31 Node tests and 16 Python tests passed, as did the production build. Study and cohort selection, missing values, source exports, the 44-cell regional heatmap, desktop and mobile behavior, and the original model workflow were checked. Full current coverage and limitations are in [STUDY_EVIDENCE.md](STUDY_EVIDENCE.md).

## Stop or revert

Stop a local server with Ctrl+C. A deployed release can be rolled back in Vercel, or the redesign commit can be reverted with a new commit. Do not delete prior source history or overwrite another contributor's uncommitted work.
