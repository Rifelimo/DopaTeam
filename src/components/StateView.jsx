import React from 'react';
import {RegionalChart,FunctionBars} from './Charts.jsx';
import {ParameterRail,ResultBand,Legend} from './Controls.jsx';
export default function StateView({params,update,reset,result,profile,bundle,onNext}){
 return <>
  <div className="state-interaction-guide">
   <span className="state-guide-label">Try it</span>
   <p>Move a slider to change a model assumption. Follow the <a href="#state-model-outputs">live model outputs</a> <span className="state-guide-desktop">on the right</span><span className="state-guide-mobile">below</span>.</p>
  </div>
  <div className="workspace state-workspace">
   <ParameterRail params={params} update={update} reset={reset}/>
   <section className="plot-panel">
    <h2>Fixed structural input</h2>
    <Legend/>
    <RegionalChart values={profile.values}/>
    <p className="plot-caption">Both models share this input. The curves overlap and stay fixed when you move the sliders.</p>
    <p className="data-note">{bundle.kind==='synthetic'?'Synthetic regional profile. No patient MRI is displayed.':`${profile.label} · imported research aggregate, reproduction pending. No patient MRI is displayed.`}</p>
   </section>
   <aside className="states-rail" id="state-model-outputs" tabIndex={-1}>
    <h2>Live model outputs</h2>
    {[result.a,result.b].map((s,i)=><div className={`state-value ${i?'state-b':'state-a'}`} key={i}><h3>Model {i?'B':'A'} function</h3><strong data-testid={i?'function-b':'function-a'}>{s.output.toFixed(2)}</strong><div className="state-label">{s.label}</div></div>)}
    <FunctionBars a={result.a} b={result.b} threshold={params.threshold}/>
    <p className="hint">F = substrate × efficacy. Labels use an assumed threshold and do not classify biological cells.</p>
   </aside>
  </div>
  <ResultBand title={result.functionGap<1e-8?'The two functions now coincide.':'These observations do not identify function.'} button="Choose the next measurement" onClick={onNext}>{result.functionGap<1e-8?'Equal gains remove this counterexample. Change a gain to construct different outputs.':'Within this observation model, a functional measurement can separate the two explanations.'}</ResultBand>
 </>;
}
