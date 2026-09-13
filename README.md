# DopaTeam

Team: DopaTeam · Track: Life Sciences · Code parcel 02 of 04

Code: [Rifelimo/DopaTeam](https://github.com/Rifelimo/DopaTeam) · Website: [dopateam.vercel.app](https://dopateam.vercel.app)

## Research analysis and pitch

DopaTeam analyses a research article coauthored by Ricardo Félix Morais, with João Valério Rocha and João Paulo Silva Cunha: *Multimodal and multiscale mapping of neurochemical and cellular vulnerability in Alzheimer’s disease* (2026 research manuscript).

The presentation starts with the human and economic burden of Alzheimer’s disease, then examines the article’s findings, the strength of the evidence and its implications for treatment research and other diseases.

The practical question is how a biological clue from brain imaging could inform the next experiment. This is an analysis of existing research. The initial code below is a separate numerical illustration, not a reproduction of the article’s results.

## Run the current code

Parcel 01 provides the synthetic regional comparison. Parcel 02 adds the existing conditional state model, a runnable state comparison, an independent Python numerical reference and tests. Later parcels add local input validation and the existing interactive prototype source.

Use Node.js 20 or later and Python 3.10 or later. The current command line code uses built in libraries and needs no downloaded packages. The combined test suite needs both runtimes.

```sh
npm run demo
npm run states
npm run reference
npm test
npm run test:python
```

The demo compares one synthetic structural pattern across 82 invented regions with 30 invented reference maps. It returns the five strongest rank correlations and shows how each changes when one region is omitted. All inputs are invented. A high correlation here illustrates pattern comparison; it does not identify a neurotransmitter mechanism or cell function.

Code locations:

- `src/core/molecular.mjs`: tied ranks, correlations and sensitivity calculations.
- `src/data/synthetic.mjs`: deterministic synthetic inputs.
- `scripts/demo.mjs`: the executable starting example.
- `tests/molecular.test.mjs`: numerical and input checks.

The invented regions and maps in this example are separate from the participants, measurements and findings reported in the article.


### What parcel 02 adds

`npm run states` constructs two illustrative functional states with identical structural observations. Under the stated model, their outputs differ because an unobserved response gain differs. It also compares hypothetical measurements and calculates threshold crossing in arbitrary model time. `npm run reference` independently calculates the example in Python. See [the model and assumptions](THEORY.md).

New source: `src/core/model.mjs`, `scripts/state_demo.mjs`, `scripts/reference.py`, `tests/model.test.mjs` and `tests/test_reference.py`. These modules come from the existing local prototype; the command line wrapper and cross language comparison are added for this release. This is staged publication of existing implementation, not newly obtained biological evidence.

The local aggregate importer, its input validator and the interactive interface are not included yet. [The four parcel plan](ROADMAP.md) identifies their release order.

## Explore the project explanation

The website has three short pages with shared styling. Keep `index.html`, `impact.html`, `hackathon.html` and `site.css` together, then open `index.html` in a browser.

- [The project](index.html): the article, its findings and our interpretation.
- [Why it matters](impact.html): human impact, treatment needs, market context and a short pitch.
- [For the hackathon](hackathon.html): the next steps and submission requirements.

The site explains the research in plain English and separates reported findings from proposed applications and future tests.

The [spoken pitch](docs/pitch.md) follows the current research presentation.

The website is public at [dopateam.vercel.app](https://dopateam.vercel.app). This repository supplies its source and the initial runnable comparison module. Automatic deployment from GitHub and teammate editing access require separate setup; publishing this repository alone does not enable either. See [how to edit and publish](docs/deployment.md).

## Initial comparison retained

- **Included:** the published synthetic generator, regional comparison module, command line demonstration and numerical tests, alongside the website source.
- **What it establishes:** the documented calculation can run on invented inputs and its numerical behavior can be checked. It does not reproduce the paper’s results or validate a biological interpretation.
- **Next planned test:** specify a measurable functional outcome and a comparison that could distinguish a proposed biological explanation from alternatives. This will be an experiment proposal grounded in the article, not a claim that the experiment has been performed.

The [release plan](ROADMAP.md) follows the research analysis and presentation. Repository updates record what is added or changed; their publication dates do not imply that earlier research was created during the event.

## What the demonstration establishes

The regional comparison ranks invented maps and checks sensitivity to omitting one region. The added state model explores hypothetical functional outputs under explicit assumptions. Its reference and tests check numerical behavior and agreement across JavaScript and Python.

All values in this example are simulated. A correlation does not identify a neurotransmitter mechanism, a cellular state or an effective treatment. Neither software tests nor the presentation establish biological validity or clinical usefulness.

## Scientific origin

The 2026 manuscript and João Valério Rocha and collaborators’ MINNT research predate this hackathon. Our analysis and presentation build on that work with explicit attribution. The initial code here comes from our DopaTeam implementation and uses invented inputs. No MINNT notebook, original research CSV or saved notebook output is part of this public parcel. See [source and contribution record](PROVENANCE.md).

## Project

Project lead: Ricardo Félix Morais · Life Sciences

In the [12 September announcement at 19:54 ET](https://discord.com/channels/1547616640559218718/1547627043619864656), Cameron Cooper identifies the shared folder as the preferred submission destination and GitHub primarily for after the hackathon. The relevant track destination is the [Life Sciences folder](https://drive.google.com/drive/folders/1Z3mxv0A4jusjYH8oOOFUs3D6oI590wnJ). Publishing this repository does not confirm that a checkpoint or final submission has been received.

Ricardo leads DopaTeam with his colleagues Alex Chen and Seika Karamatsu. He is a neuroradiologist, researcher and MIT Sloan Fellows MBA student. Codex assisted with code, documentation and review.

Ricardo is also the first author of a separate [2025 study in Neurobiology of Disease](https://pubmed.ncbi.nlm.nih.gov/40194635/) on brain structure and neurotransmitter reference maps. It supplies scientific context and is distinct from the 2026 manuscript analysed here. Neither study validates the invented code example.
