# StarLens final checkpoint

[Website](https://starlens-dopateam.vercel.app/) · [Pinned source](https://github.com/Rifelimo/DopaTeam/tree/82d565fd689fd562450327d37c6a83f13692cd38) · [Download the reproducibility package](StarLens_Final_Package_82d565f.zip)

We brought the reported research and the synthetic workflow into one website. The final version adds a study explorer, comparison groups, selected regional effect sizes and JSON exports with their sources. The synthetic sandbox and the model remain separate from the reported research.

## What we verified

The package includes all 60 tracked files from the pinned source, synthetic inputs, actual browser exports, reproduction steps and full test logs. All 31 JavaScript tests and 16 Python tests passed. The production build passed, and all 15 generated files match the public website byte for byte.

The synthetic comparison returns a strongest correlation of 0.818308. All 30 exported associations match the source calculation. With the observations held fixed, the model gives outputs of 1.008 and 0.576 under different assumed gains. The gap is 0.432, or 4.32 times the assumed noise standard deviation.

The selected reported SST result is rho -0.639 with reported q 0.002. Its browser export matches the source. All 59 study, group and marker export selections preserve their source and missing-value rules. This verifies the display and export, not a new analysis of participants.

## What remains

Independent biological validation and a real functional experiment remain future work. No drug was tested and no patient benefit was established. The linked 3D atlas is optional and separate. Its compiled snapshot is included, but its original editable source is not required for the main website and is not included.

The archive also contains a short summary and a four minute demo guide. Start with its README and run `python3 verification/check_package.py` before installing dependencies into a separate working copy.

Archive SHA256: `3214908317b45aacbc70f911445a5f5fa01ae85864345012ef85f4b7e9a7f00f`.
