# StateLens

## What should we measure next in Alzheimer’s research?

StateLens explores a practical research decision: when the same evidence fits different explanations, which additional measurement could tell them apart?

Imagine an imaging result that is compatible with two explanations. In one, circuit function is preserved. In the other, it is reduced. Another measurement is useful if its expected result differs between those explanations.

The intended user is an Alzheimer’s research team choosing its next experiment. The proposed value is a clearer reason for that choice, with the assumptions visible before time and resources are committed.

## Explore the first snapshot

Download [the project explanation](index.html) and open it in a browser. It is a single HTML file with its own styling and JavaScript. It works without installation or an external service.

The page includes:

- A clear explanation of the research question and the work completed.
- An interactive comparison of three possible measurements.
- The model assumptions, numerical results and limits of the evidence.
- The proposed validation plan and a spoken pitch of about 90 seconds.

Choose **Measure function independently**, then change the assumed noise. The expected readings stay fixed while their uncertainty changes. The calculation can be expanded below the example.

The [spoken pitch](docs/pitch.md) is also available as text.

## What has been built

A full browser prototype already exists locally. It has views for molecular context, competing functional states and the next experiment, together with an independent Python numerical reference and software tests.

This first repository snapshot contains the explanation and a smaller interactive illustration. The runnable application and its source are planned for the next snapshot. The [release plan](ROADMAP.md) sets out the sequence. These are staged repository updates; they do not imply that the existing work was created on each publication date.

## What the demonstration establishes

The example deliberately holds imaging inputs and reference maps fixed while assuming two different functional responses. An independent functional measurement distinguishes that constructed pair in the noiseless model. Greater assumed noise makes the distinction less clear.

All values in this portable example are simulated. The result depends on the model’s assumptions. It does not identify disease states in patients or establish the performance of a laboratory assay. Its usefulness for choosing real experiments still needs to be tested.

## Project

Ricardo Félix Morais · Solo participant · Life Sciences

Ricardo directed the project. Codex assisted with code, documentation and review.
