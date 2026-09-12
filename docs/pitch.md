# DopaTeam spoken pitch

About five minutes at a measured pace, including a short live demonstration.

I’m Ricardo Félix Morais, a neuroradiologist and neuroimaging researcher with a PhD in Health Sciences. I lead the Portuguese Medical Association’s council for medical evidence and health research, and I’m an MIT Sloan Fellows MBA student. Together with my colleagues Alex Chen and Seika Karamatsu, I’m building DopaTeam to help researchers choose the next experiment in Alzheimer’s disease. Alex brings neuroscience research experience, including dopamine signaling, and currently works at Brigham and Women’s Hospital. Seika brings a background in psychology and experience with AI projects.

Think about making breakfast, finding your way home or following a conversation. When those abilities become unreliable, everyday life changes. Families reorganize work, sleep and plans around caring for someone they love.

WHO estimates that 57 million people were living with dementia worldwide in 2021. Alzheimer’s is its most common cause. The estimated global cost was 1.3 trillion US dollars in 2019, including informal care. In the United States, unpaid caregivers provided an estimated 19.6 billion hours of care for Alzheimer’s and other dementias in 2025. Behind those numbers are people trying to preserve ordinary life.

Progress depends on understanding what is happening in the brain. In this challenge, the question is whether brain cells are adapting, compensating for a problem or losing their ability to function. Those explanations can lead researchers toward very different experiments.

Our project starts with a difficulty I recognize from neuroimaging research: a clear image can still leave us with an unclear explanation. The next measurement helps if it can tell the competing explanations apart.

This question comes from published science. I am the first author of a 2025 study in Neurobiology of Disease that examined brain structure alongside neurotransmitter reference maps in Alzheimer’s and related conditions. These maps describe patterns in the brain’s chemical signalling systems. DopaTeam takes the next question: what evidence would tell us whether function is being maintained?

Our biological motivation is a group of brain cells that help regulate other cells’ activity. We ask how compensation might be distinguished from dysfunction. The current demo does not identify those cells’ functional state from a brain scan. It makes the missing information explicit.

Here is the demonstration. Two simulated scenarios have exactly the same imaging inputs. In one, a stronger response preserves useful output. In the other, output falls below a threshold defined for the example.

Choose what to measure next. Repeat the same structural observation and the scenarios still look alike. Calculate another score from the same information and they remain indistinguishable. Measure function independently and their expected readings separate. Increase the assumed noise and the distinction becomes less clear.

That is the decision we want to make easier to examine before an experiment begins. We have built the interactive prototype, made the assumptions visible and checked the calculations with an independent implementation. The new demonstration uses simulated data. The earlier publication does not validate this new model.

The intended users are research teams deciding which experiment deserves their time and resources. Our next test is practical: compare researchers using DopaTeam with researchers given the same information in a static report. Can they identify the unresolved explanations, choose a measurement that separates them and explain why? Then test the chosen measurement in an appropriate biological system using independent data.

We have built a way to expose an important uncertainty and show what could resolve it. Faster discovery and better patient outcomes remain goals to work toward.

For families, the goal is more years of independence and more time together. Our contribution begins with the next experiment: knowing why it is worth doing, and what answer would actually change our understanding.

## Source notes, not spoken

- [WHO dementia fact sheet](https://www.who.int/news-room/fact-sheets/detail/dementia): 57 million people worldwide in 2021; US$1.3 trillion global dementia cost in 2019.
- [Alzheimer’s Association 2026 report, page 52](https://www.alz.org/getmedia/ef8f48f9-ad36-48ea-87f9-b74034635c1e/alzheimers-facts-and-figures.pdf#page=54): 19.6 billion unpaid US care hours in 2025.
- [Published study](https://pubmed.ncbi.nlm.nih.gov/40194635/): Ricardo is first author. The paper did not evaluate DopaTeam.
- [Official Life Sciences brief](https://docs.google.com/document/d/1NhHbo8ccaufwQraju_mApEUghlrkpl5V/edit): a scoped counterexample and experiment design are accepted forms of contribution.
