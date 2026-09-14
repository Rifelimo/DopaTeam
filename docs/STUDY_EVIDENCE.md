# Reported study evidence

Added locally on 14 September 2026, after the existing state-demo explanation update `814ad45`.

## Included sources and values

Morais and colleagues, *Differential involvement of neurotransmitter pathways in AD, bvFTD and MCI: Whole-brain MRI analysis*, Neurobiology of Disease 209, 106897 (2025). [DOI](https://doi.org/10.1016/j.nbd.2025.106897). Source Table 2, PDF page 6. The demo includes all 39 reported mean-rho, t and p triples across 13 targets and three clinical cohorts.

Rocha, Cunha and Morais, *Multimodal and multiscale mapping of neurochemical and cellular vulnerability in Alzheimer’s disease*, submitted to Brain on 6 September 2026, manuscript BRAIN-2026-02951. The supplied PDF is marked for peer review. Acceptance or publication is not established. Results on physical PDF pages 12–13 provide the selected 16 exact correlations. Exact q values are retained where given. Figure 2A on physical PDF page 26 supplies 44 printed, two-decimal Cohen’s d labels across 11 regions and four clinical-group versus CN contrasts. Printed manuscript page numbers are one lower than physical PDF pages.

These facts were transcribed from the supplied documents and checked against rendered pages. No original PDF, correspondence information, individual participant records or complete regional arrays are distributed in the source tree.

## Statistical boundaries

The 2025 table reports group summaries of participant-level Spearman correlations over 83 regions. Its mean-rho averaging convention is not specified, and its p columns do not identify correction status. Values are presented as reported. Results text says 89 AD and 74 bvFTD participants, whereas Table 1 says 88 and 75. Table 2 has no n column, so its sample sizes are not reconstructed.

The 2026 manuscript correlates group-level atrophy maps with normative reference maps over 82 non-brainstem regions. The cohort comprises 201 AD, 264 LMCI, 387 EMCI, 293 SMC and 290 CN participants, totaling 1,435. Its stated spatial-null and FDR procedure differs from the 2025 study. These two statistics should not be treated as directly interchangeable or a replication score.

There are four unavailable marker-by-group numerical selections in the displayed 2026 subset. They stay null, including VIP in SMC and D2 outside AD. A missing exact q is distinct from the source reporting an FDR-significant result. No p or q is recalculated from rounded correlations.

The 11 regional rows were selected by AD effect-size magnitude in Figure 2A. The other 71 regions remain unavailable. The source display `-0.00` is retained. Cohen’s d is a standardized group difference, not percentage tissue loss. Stronger absolute spatial correlation does not mean greater atrophy, and cross-sectional cohort contrasts are not a person’s longitudinal trajectory.

The separate 3D atlas is not connected to these values. No anatomical crosswalk is inferred from the PDFs. The original gain, noise and decay model remains explicitly hypothetical and receives no paper-derived parameters.

## Implementation

- `src/data/reported-studies.json` contains only the transcribed aggregate records and source locations.
- `src/data/studies.mjs` defines study metadata, missing-value behavior, source exports and numerical heatmap colors.
- `src/components/StudyEvidence.jsx` is shared by the homepage and the first workspace view.
- `src/site/study-entry.jsx` loads the homepage view on demand.
- `src/study-evidence.css` scopes its responsive appearance.
- `tests/study-evidence.test.mjs` checks reported values, negative zero, missing entries, source scopes and exports.

Edit aggregate values only after checking the corresponding table or figure. Keep source precision and page locations. Do not fill missing regions or calibrate the model from these summaries. Raw regional analysis would require authorized arrays, verified anatomy, code and a separately audited statistical workflow.

## Verification

31 Node tests and 16 Python tests passed. A separate audit compared all 39 published rho/t/p triples, all 16 available manuscript correlations and all 44 effect-size labels, with no differences. All 59 selectable exports were exercised and preserve nulls and source status without local file paths.

The production build passed. Browser checks covered study and cohort switching, LMCI CUMI rho -0.871 with q 0.003, MCI SERT rho -0.093 with p 0.005, missing VIP-SMC display, the 44-cell heatmap and its coordinated column selection, desktop and 390px mobile views, horizontal table scrolling, and the separate model workflow. An actual exported JSON was reopened and matched the selected MCI SERT result with reanalysis and patient-data flags false.
