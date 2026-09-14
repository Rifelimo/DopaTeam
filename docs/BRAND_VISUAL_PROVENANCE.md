# Brain constellation provenance

Created 2026-09-14 for the StarLens website hero.

The constellation is a modified decorative rendering of the FreeSurfer fsaverage5 cortical pial surface. Its colored triangles are brand imagery. Their colors are independent of anatomical parcel labels and do not represent patient scans, receptor measurements, gene expression, atrophy, correlations, or research findings. The image is not a new analysis result.

## Source and licence

Geometry is sampled from the existing `software/DopaTeam-brain-atlas/public/atlas/lh.json` and `rh.json` assets in the sibling project. Those assets retain the pial surface geometry from FreeSurfer fsaverage5, distributed by netneurotools and cross-checked against Nilearn fsaverage5. Their source has 10,242 vertices and 20,480 triangles per hemisphere. No deep structures or synthetic numerical overlays were copied.

The source project records the geometry archive as `https://osf.io/download/q9hwd/`, with SHA-256 `7120acb88107a4e92ceffaf0b6ef79e5c214136e3d10c0f044c4cfc1b5d5d9f0`. This record was read from the existing asset provenance. The archive was not downloaded again for this illustration.

| Local source | SHA-256 |
| --- | --- |
| `lh.json` | `7d11f56ee968eb293f3c1b0376281692c56a7e8be8c03613bdd6eb97d4ca64aa` |
| `rh.json` | `7368f76c41f0b5bc305051c23e1f8b50bcc93601ddcd4de185e04d4a7b01926b` |
| `LICENSE-FreeSurfer.txt` | `574fcd632ac56db672074c9c8409735272c02225d8bccbac0b3dd8137405b909` |

The exact source licence, including its required MGH notice, is distributed unchanged at [`public/brand/LICENSE-FreeSurfer.txt`](../public/brand/LICENSE-FreeSurfer.txt). That licence applies to the derived geometry. Preserve it when copying or publishing this asset. This conversion and its display are modifications, and are not the original FreeSurfer software. No endorsement by MGH, FreeSurfer, netneurotools, or Nilearn is implied.

Source references retained from the existing project

* [netneurotools fsaverage distribution](https://netneurolab.github.io/netneurotools/generated/netneurotools.datasets.fetch_fsaverage.html)
* [Nilearn fsaverage5 files](https://github.com/nilearn/nilearn/tree/main/nilearn/datasets/data/fsaverage5)
* [FreeSurfer licence](https://surfer.nmr.mgh.harvard.edu/fswiki/FreeSurferSoftwareLicense)

## Derivation

The generated [`brain-points.json`](../public/brand/brain-points.json) contains 7,200 sampled vertices, 3,600 from each hemisphere. The file is 343,887 bytes before HTTP compression. It does not contain faces, parcel names, region identifiers, or research values.

For each hemisphere, all original vertex indices are ordered by the ascending unsigned integer hash of `index + 17`. The first 3,600 are selected and sorted again by their original index. The same deterministic selection procedure is used on both hemispheres. The hash uses JavaScript 32-bit integer operations exactly as follows.

```js
function hash(value) {
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  return (value ^ (value >>> 16)) >>> 0;
}
```

The original pial positions are centered on the joint bounding box center `[0.5285, -17.768, 15.4095]` millimeters and uniformly divided by `86.924`. Coordinates are rounded to four decimals. This display normalization preserves the source shape apart from rounding. It does not establish a patient or MRI registration.

At every source vertex, normals are computed by summing the cross products of adjacent oriented triangle edges, then normalizing the sum. Normals are rounded to three decimals. The source curvature divided by `0.35`, clamped to `[-1, 1]` and rounded to three decimals, is retained only to shade the folds. It is anatomical shape information, not a biological activity or disease measurement. Each flat record has seven values, `x, y, z, nx, ny, nz, curvatureForShading`.

Sampled coordinate bounds

| Axis | Minimum | Maximum |
| --- | --- | --- |
| x | -0.7974 | 0.7974 |
| y | -0.9946 | 0.9995 |
| z | -0.7340 | 0.7289 |

The renderer first maps surface RAS to display coordinates `(-y, z, -x)`. It then applies a yaw of `0.27` radians and pitch of `0.105` radians. This gives a slightly anterior and superior oblique view of the left lateral surface, with anterior to the left. Slow yaw and pitch oscillations and bounded pointer parallax retain that recognizable profile. Triangles are screen-facing markers, not the source mesh triangles. Their size, angle, and six decorative colors are deterministic.

## Integration and motion

```js
import { mountConstellation } from './src/site/constellation.js';

const cleanup = mountConstellation(canvas, { toggleButton });
// Call cleanup() when removing the hero.
```

The canvas needs explicit CSS dimensions within its parent. The module adapts its resolution to the canvas box, caps device pixel ratio at 1.5, batches triangle draws by color and opacity, and limits drawing to approximately 30 frames per second. No dependencies were added. Importing the module starts no global animation. The JSON is requested only when a canvas is mounted, from `./brand/brain-points.json`.

The first successful render sets `canvas.dataset.ready` to `true`. Unsupported Canvas2D sets `dataset.error` to `canvas-unavailable`. A fetch, parsing, or geometry error sets it to `asset-load-failed`. The surrounding HTML supplies the accessible caption and the fallback message.

The pause button is visible, with `aria-pressed="true"` when motion is paused. A reduced motion preference starts paused. A later preference change to reduced motion also pauses the illustration. The visitor can deliberately resume using the button. Pointer parallax is disabled while reduced motion is requested. IntersectionObserver suspends animation offscreen, and document visibility suspends it in a hidden tab. Cleanup cancels the request and scheduled frames and removes the observers and listeners.

## Verification scope

Source file hashes and licence equality were checked locally. The generated asset has 7,200 finite records, the expected bounds, and near-unit normals. JavaScript syntax was checked with Node. A local lifecycle test checked fetch initialization, button pause and resume, reduced motion, visibility and intersection suspension, and cleanup using DOM and canvas mocks. Mock checks do not establish browser rendering or visual quality. The parent website task performs the actual browser and responsive layout review after integration.
