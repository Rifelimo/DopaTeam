import React,{useState} from 'react';
import {defaults,evaluate,rankMaps,validateBundle} from './core/model.mjs';
import {syntheticBundle} from './data/synthetic.mjs';
import StateView from './components/StateView.jsx';
import MolecularView from './components/MolecularView.jsx';
import ExperimentView from './components/ExperimentView.jsx';
import Provenance from './components/Provenance.jsx';
import StudyEvidence from './components/StudyEvidence.jsx';
export default function App(){
 const [tab,setTab]=useState(0),[params,setParams]=useState({...defaults}),[bundle,setBundle]=useState(syntheticBundle),[profileId,setProfileId]=useState('synthetic'),[notice,setNotice]=useState('');
 const profile=bundle.profiles.find(p=>p.id===profileId)||bundle.profiles[0];const result=evaluate(params);
 const update=(key,value)=>setParams(p=>({...p,[key]:value}));
 const reset=()=>setParams({...defaults});
 function go(value){setTab(value);setNotice('');}
 async function onImport(event){const file=event.target.files?.[0];if(!file)return;try{if(file.size>1000000)throw new Error('Use an aggregate JSON smaller than 1 MB.');const data=validateBundle(JSON.parse(await file.text()));setBundle(data);setProfileId(data.profiles[0].id);setNotice(`Loaded ${data.regions.length} regions, ${data.profiles.length} profiles and ${data.maps.length} reference maps into local memory.`);}catch(e){setNotice(`Import rejected: ${e.message}`);}event.target.value='';}
 function onSynthetic(){setBundle(syntheticBundle);setProfileId('synthetic');setNotice('Restored the portable synthetic example.');}
 function exportEvidence(){const data={project:'DopaTeam',version:'0.4.0',exportedAt:new Date().toISOString(),claim:'Function is not identifiable from the specified fixed structural and reference-map observations within this illustrative observation model.',dataKind:bundle.kind,source:bundle.source,profile:{id:profile.id,label:profile.label},parameters:params,result,associations:rankMaps(profile.values,bundle.maps).map(m=>({id:m.id,name:m.name,rho:m.rho})),inference:'Descriptive associations only. No spatial null inference. No clinical or cellular validation.',limitations:['S is latent, not MRI volume or neuron count.','F=S*C and thresholds are toy assumptions.','An independent scalar functional measurement separates the constructed pair only.','SST attribution needs cell identity plus functional evidence.','No real transition clock is identified.'],priorResearch:'João Valério Rocha and collaborators, MINNT. Predates the hackathon.',newContribution:'Original conditional simulation, audit interface and measurement comparison.',rawImportedArraysIncluded:false};const a=document.createElement('a');const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.href=url;a.download='dopateam_evidence.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setNotice('Evidence exported locally. No data was sent.');}
 const titles = ['Follow the evidence. Then ask what comes next.','Explore a regional comparison.','Same observations. Different model states.','What would distinguish the explanations?'];
 const descriptions = ['Compare reported results from two studies, with their source and statistical meaning in view.','A separate sandbox for synthetic examples or independently aligned aggregate inputs.','Explore what regional patterns leave uncertain about neuronal function.','Change hypothetical measurements and noise assumptions. This is not measured assay performance.'];
 return <><header><a className="wordmark" href="index.html" aria-label="StarLens home">StarLens</a><span className="workspace-label">Research workspace</span>{tab>0&&<button className="outline" onClick={exportEvidence}>Export workspace</button>}</header><main>
  <div className="hero"><h1>{titles[tab]}</h1><p>{descriptions[tab]}</p></div>
  <nav className="workflow workflow-four" aria-label="Research workflow">{['Study evidence','Regional sandbox','Competing states','Next experiment'].map((name,i)=><button key={name} className={tab===i?'active':''} onClick={()=>go(i)} aria-current={tab===i?'step':undefined}>{i+1} <span>{name}</span></button>)}</nav>
  {notice&&<div className="notice" role="status">{notice}</div>}
  {tab===0?<StudyEvidence onNext={()=>go(2)}/>:tab===1?<MolecularView bundle={bundle} profile={profile} onProfile={setProfileId} onImport={onImport} onSynthetic={onSynthetic} onNext={()=>go(2)}/>:tab===2?<StateView params={params} update={update} reset={reset} result={result} profile={profile} bundle={bundle} onNext={()=>go(3)}/>:<ExperimentView params={params} update={update}/>}
  <footer><span>{tab===0?'Reported study aggregates. Research context only.':'Constructive simulation. Research use only. No patient prediction.'}</span><span>Scientific basis · Morais and colleagues · Rocha, Cunha and Morais</span></footer>
  {tab>0&&<Provenance bundle={bundle}/>}
 </main></>;
}
