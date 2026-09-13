# DopaTeam

Team: DopaTeam · Track: Life Sciences · Initial source snapshot

## What should we measure next in Alzheimer’s research?

DopaTeam explores a practical research decision: when the same evidence fits different explanations, which additional measurement could tell them apart?

Imagine an imaging result that is compatible with two explanations. In one, circuit function is preserved. In the other, it is reduced. Another measurement is useful if its expected result differs between those explanations.

The intended user is an Alzheimer’s research team choosing its next experiment. The proposed value is a clearer reason for that choice, with the assumptions visible before time and resources are committed.

## Run the initial code

This first code parcel contains the starting layer: a deterministic synthetic dataset, regional pattern comparison and a command line example. The full application already exists locally and will be added in later repository parcels. These releases describe what becomes available in the repository, not an invented timeline of discovery.

Use Node.js with the built in test runner. This snapshot was checked with Node.js 23.10.0 and needs no downloaded packages.

```sh
npm run demo
npm test
```

The demo compares one synthetic structural pattern across 82 illustrative regions with 30 synthetic reference maps. It returns the five strongest rank correlations and shows how each changes when one region is omitted. All inputs are invented. A high correlation here illustrates pattern comparison; it does not identify a neurotransmitter mechanism or cell function.

Code locations:

- `src/core/molecular.mjs`: tied ranks, correlations and sensitivity calculations.
- `src/data/synthetic.mjs`: deterministic synthetic inputs.
- `scripts/demo.mjs`: the executable starting example.
- `tests/molecular.test.mjs`: numerical and input checks.

The functional model, three view React application and optional local research importer are scheduled for a later code parcel. The website explains the proposed workflow with a simple written example.

## Explore the project explanation

The website has three short pages with shared styling. Keep `index.html`, `impact.html`, `hackathon.html` and `site.css` together, then open `index.html` in a browser.

- [The project](index.html): the idea and what has already been built.
- [Why it matters](impact.html): human impact, treatment needs, market context and a short pitch.
- [For the hackathon](hackathon.html): the next steps and submission requirements.

The site explains the work in plain English. The interactive research prototype runs separately and is scheduled for a later source parcel.

The earlier [five minute spoken pitch](docs/pitch.md) remains available as a separate draft.

The website is public at [dopateam.vercel.app](https://dopateam.vercel.app). This repository supplies its source and the initial runnable comparison module. Automatic deployment from GitHub and teammate editing access require separate setup; publishing this repository alone does not enable either. See [how to edit and publish](docs/deployment.md).

## What has been built

A full browser prototype already exists locally. It has views for molecular context, competing functional states and the next experiment, together with an independent Python numerical reference and software tests.

This repository snapshot contains the three page explanation and the initial runnable pattern comparison module. The full application and its source are planned for the next snapshot. The [release plan](ROADMAP.md) sets out the sequence. These are staged repository updates; they do not imply that the existing work was created on each publication date.

## What the demonstration establishes

The example deliberately holds imaging inputs and reference maps fixed while assuming two different functional responses. An independent functional measurement distinguishes that constructed pair in the noiseless model. Greater assumed noise makes the distinction less clear.

All values in this portable example are simulated. The result depends on the model’s assumptions. It does not identify disease states in patients or establish the performance of a laboratory assay. Its usefulness for choosing real experiments still needs to be tested.

## Scientific origin

João Valério Rocha and collaborators’ MINNT research motivates the original neuroimaging question. The initial code here comes from our DopaTeam implementation and uses invented inputs. No MINNT notebook, original research CSV or saved notebook output is part of this public parcel. See [source and contribution record](PROVENANCE.md).

## Project

Project lead: Ricardo Félix Morais · Life Sciences

The organizers' latest Discord clarification identifies the shared Drive folder as the preferred checkpoint destination and GitHub primarily as the code record after the hackathon. Publishing a repository is not confirmation that a checkpoint or final submission has been received.

Ricardo leads DopaTeam with his colleagues Alex Chen and Seika Karamatsu. He is a neuroradiologist, researcher and MIT Sloan Fellows MBA student. Codex assisted with code, documentation and review.

Ricardo is the first author of a [2025 study in Neurobiology of Disease](https://pubmed.ncbi.nlm.nih.gov/40194635/) on brain structure and neurotransmitter reference maps. That study provides scientific context; it does not validate the new simulation or its research utility.
