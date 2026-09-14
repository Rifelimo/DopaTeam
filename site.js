import {mountConstellation} from './src/site/constellation.js';
import {spearman} from './src/core/molecular.mjs';
import {syntheticBundle} from './src/data/synthetic.mjs';

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
const chart = document.querySelector('#comparison-chart');
if (chart) {
  const NS = 'http://www.w3.org/2000/svg';
  const values = syntheticBundle.profiles[0].values;
  const maps = syntheticBundle.maps.filter(map => ['reference-17','reference-5','reference-20'].includes(map.id));
  const extent = Math.ceil(Math.max(...values.map(Math.abs), ...maps.flatMap(map => map.values.map(Math.abs))) * 2) / 2;
  const x = value => 68 + (value + extent) / (extent * 2) * 480;
  const y = value => 338 - (value + extent) / (extent * 2) * 300;
  function svg(tag, attrs, label) {
    const element = document.createElementNS(NS, tag);
    for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, String(value));
    if (label !== undefined) element.textContent = label;
    return element;
  }
  const plot = svg('g', {'aria-hidden':'true'});
  plot.append(svg('line', {x1:68,y1:338,x2:548,y2:338,class:'chart-axis'}),svg('line',{x1:68,y1:38,x2:68,y2:338,class:'chart-axis'}));
  plot.append(svg('line',{x1:x(0),x2:x(0),y1:38,y2:338,class:'chart-zero'}),svg('line',{x1:68,x2:548,y1:y(0),y2:y(0),class:'chart-zero'}));
  for (const tick of [-2,-1,0,1,2]) {
    if (Math.abs(tick)>extent) continue;
    plot.append(svg('text',{x:x(tick),y:360,'text-anchor':'middle',class:'chart-label'},tick));
    plot.append(svg('text',{x:52,y:y(tick)+4,'text-anchor':'end',class:'chart-label'},tick));
  }
  plot.append(svg('text',{x:308,y:393,'text-anchor':'middle',class:'chart-label'},'Synthetic structural profile'));
  plot.append(svg('text',{x:15,y:188,transform:'rotate(-90 15 188)','text-anchor':'middle',class:'chart-label'},'Synthetic reference map'));
  const points = values.map((value,i) => {
    const circle = svg('circle',{cx:x(value),cy:y(0),r:3.8,class:'chart-dot'});
    circle.append(svg('title',{},syntheticBundle.regions[i].label)); plot.append(circle); return circle;
  });
  chart.append(plot);
  function selectReference(id) {
    const map = maps.find(item=>item.id===id);
    if (!map) return;
    const rho = spearman(values,map.values);
    points.forEach((point,i)=>point.setAttribute('cy',String(y(map.values[i]))));
    document.querySelectorAll('[data-reference]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.reference===id)));
    document.querySelector('#association-value').textContent = rho.toFixed(3);
    document.querySelector('#comparison-status').textContent = map.name + ' selected. Association is not a measure of clinical accuracy.';
    document.querySelector('#chart-description').textContent = '82 synthetic region identifiers compared with ' + map.name + '. Spearman association ' + rho.toFixed(3) + '. Values are standardized and illustrative.';
  }
  document.querySelectorAll('[data-reference]').forEach(button=>button.addEventListener('click',()=>selectReference(button.dataset.reference)));
  selectReference('reference-17');
}
