# DopaTeam: four code parcels

The existing local implementation is published in four cumulative code parcels. Each parcel adds specific executable modules. Release dates record publication; the underlying scientific work and previously written implementation retain their provenance.

| Parcel | Code added | GitHub target, Boston time |
| --- | --- | --- |
| 01 | Synthetic regional comparison, map ranking, command line example and initial numerical tests | Published 12 September |
| 02 | Conditional state model, state command line example, independent Python reference, model tests and method documentation | 13 September, current release |
| 03 | Local aggregate import script, input bundle validator, import checks and usage instructions | 13 September at 21:59 |
| 04 | Remaining interactive prototype source, components, local run configuration and complete setup instructions | 14 September at 09:59 |
| Final verification | Verify the complete parcel 04 tree and any later authorized fixes; tag the final version | 14 September at 21:59 |

The final check is not a fifth code parcel. The public presentation pages remain separate from the local runnable prototype. The final target includes all portable code from the existing prototype, with the shared comparison module and the current presentation retained. Original MINNT notebooks, participant records and research value arrays are outside this portable code target.

## Release verification

For every parcel, verify the previous remote commit, add only the listed modules, run relevant checks, update the README and publish a normal Git commit. Use `parcel-02`, `parcel-03` and `parcel-04` to identify the corresponding code releases. An existing tag is never rewritten. `checkpoint-24h` identifies the earlier website and documentation snapshot; `parcel-02` identifies the actual next code addition.

The final source and its file hashes are fixed locally before later parcels are published. Later user edits must be reconciled instead of overwritten. A repeated source commit is not described as new code.

## Requirements

The [Life Sciences brief](https://docs.google.com/document/d/1NhHbo8ccaufwQraju_mApEUghlrkpl5V/edit) asks for an inspectable or reproducible artifact, its assumptions, sources and next test. The current example uses simulated inputs and does not reproduce the article's analysis. Model time is not calendar time, and numerical tests are not biological validation.

The organizer confirmed on 12 September at 20:13 in [Discord](https://discord.com/channels/1547616640559218718/1547628793982885990) that a public repository link and video can be provided in the checkpoint folder. This workflow manages GitHub only. Video and checkpoint folder submission are handled separately.
