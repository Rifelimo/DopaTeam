import {mountConstellation} from './src/site/constellation.js';



const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-navigation');
function setMenu(open) {
  menuToggle?.setAttribute('aria-expanded', String(open));
  if (menu) menu.dataset.open = String(open);
}
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
menu?.addEventListener('click', event => {if (event.target.closest('a')) setMenu(false);});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false); menuToggle.focus();
  }
});
document.addEventListener('click', event => {if (!event.target.closest('.site-header')) setMenu(false);});
const smallScreen = matchMedia('(max-width: 760px)');
smallScreen.addEventListener('change', () => setMenu(false));

const canvas = document.querySelector('#brain-constellation');
if (canvas) {
  const cleanup = mountConstellation(canvas, {toggleButton: document.querySelector('#motion-toggle')});
  window.addEventListener('pagehide', event => {if (!event.persisted) cleanup?.();});
}
const studyDemo = document.querySelector('#study-demo');
if (studyDemo) {
  import('./src/site/study-entry.jsx').then(({mountStudyEvidence}) => {
    mountStudyEvidence(studyDemo);
  }).catch(() => {
    studyDemo.removeAttribute('aria-busy');
    studyDemo.textContent = 'The evidence view could not load. Open the research workspace to try again.';
  });
}
