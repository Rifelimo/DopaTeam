// Published from the existing local DopaTeam prototype in parcel 02.
// Illustrative model units only; no biological parameter estimation.
export { ranks, pearson, spearman, standardize, rankMaps, looRange } from './molecular.mjs';

export const defaults = Object.freeze({substrate:0.72,gainA:1.4,gainB:0.8,threshold:0.8,noise:0.10,rate:0.10});
const finite = values => values.every(Number.isFinite);
export function state(substrate,gain,threshold) {
  const output=substrate*gain;
  const label=output<=threshold?'Dysfunction compatible':gain>1.1?'Compensation compatible':'Preserved output';
  return {substrate,gain,output,label};
}
export function evaluate(params) {
  if(!finite(Object.values(params))) throw new Error('All model parameters must be finite.');
  if(params.substrate<0||params.gainA<0||params.gainB<0||params.threshold<=0||params.noise<=0||params.rate<=0)throw new Error('Invalid model parameter.');
  const a=state(params.substrate,params.gainA,params.threshold),b=state(params.substrate,params.gainB,params.threshold);
  return {a,b,functionGap:Math.abs(a.output-b.output),structuralGap:0,normalizedSeparation:Math.abs(a.output-b.output)/params.noise,sameLabel:a.label===b.label};
}
export function transitionTime(substrate,gain,threshold,rate) {
  if(!finite([substrate,gain,threshold,rate])||substrate<0||gain<0||threshold<=0||rate<=0)throw new Error('Invalid transition parameters.');
  return substrate*gain<=threshold?0:Math.log(substrate*gain/threshold)/rate;
}
export function measurementScores(params){const {a,b}=evaluate(params);return [
 {id:'structural',name:'Another structural observation',a:0.72,b:0.72,noise:params.noise,separation:0,meaning:'Equal by construction. Does not separate this pair.',limit:'A different observation model may give a different result.'},
 {id:'atlas',name:'Another normative atlas score',a:0,b:0,noise:params.noise,separation:0,meaning:'Same observed vector and fixed reference maps.',limit:'More descriptors of identical inputs cannot recover an omitted variable.'},
 {id:'function',name:'Independent functional output',a:a.output,b:b.output,noise:params.noise,separation:Math.abs(a.output-b.output)/params.noise,meaning:'Direct model readout: Y = F + noise.',limit:Math.abs(a.output-b.output)>1e-8?'Separates the constructed pair. Does not identify SST cells or a biological clock.':'Equal functional outputs leave this pair indistinguishable, even without noise.'}
 ];}
