import React, {useId, useState} from 'react';
import {studies, findRecord, evidenceExport, atrophyColor} from '../data/studies.mjs';
import '../study-evidence.css';

function saveEvidence(data) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'starlens_reported_evidence.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function StudyEvidence({compact=false, onNext}) {
  const uid = useId();
  const [studyId, setStudyId] = useState('rocha2026');
  const [groupId, setGroupId] = useState('AD');
  const [markerId, setMarkerId] = useState('sst');
  const [notice, setNotice] = useState('');
  const study = studies.find(item => item.id === studyId);
  const group = study.groups.find(item => item.id === groupId);
  const marker = study.markers.find(item => item.id === markerId);
  const record = findRecord(studyId, groupId, markerId);
  const selectedText = record.rho === null ? 'Not numerically reported' : record.rho.toFixed(3);
  function changeStudy(id) {
    const next = studies.find(item => item.id === id);
    setStudyId(id); setGroupId(next.defaultGroup); setMarkerId(next.defaultMarker); setNotice('');
  }
  function changeGroup(id) {setGroupId(id); setNotice('');}
  function exportSelection() {
    saveEvidence(evidenceExport(studyId, groupId, markerId));
    setNotice('Reported values and source locations exported. No patient records are included.');
  }
  return <section className={`study-evidence ${compact?'study-compact':''}`} aria-label="Explore study evidence">
    <div className="study-switch" role="group" aria-label="Choose a study">{studies.map(item => <button key={item.id} type="button" aria-pressed={item.id===studyId} onClick={()=>changeStudy(item.id)}><span>{item.year}</span>{item.shortLabel}<small>{item.status}</small></button>)}</div>
    <div className="study-context"><div><span className="study-kicker">{study.status} · {study.authors}</span><h3>{study.heading}</h3><p>{study.description}</p></div><div className="study-context-numbers"><span><strong>{study.n.toLocaleString('en-US')}</strong>participants</span><span><strong>{study.nRegions}</strong>regions in analysis</span></div></div>
    <div className="study-toolbar"><div><label htmlFor={`${uid}-group`}>{studyId==='rocha2026'?'Choose a comparison':'Choose a cohort'}</label><select id={`${uid}-group`} value={groupId} onChange={e=>changeGroup(e.target.value)}>{study.groups.map(item=><option key={item.id} value={item.id}>{item.label}</option>)}</select></div><p>{group.detail}</p><span className="study-source-stamp">{study.tableLocation}</span></div>
    <div className="study-results">
      <div className="study-chart"><div className="study-chart-heading"><h4>{study.statistic}</h4><span>Axis −{study.axis.toFixed(study.axis===1?0:2)} to +{study.axis.toFixed(study.axis===1?0:2)}</span></div><p className="study-chart-caption">{study.chartDescription} Select a row for its source and interpretation.</p>
        <div className="study-axis" aria-hidden="true"><span></span><div><span>−{study.axis}</span><span>0</span><span>+{study.axis}</span></div><span>ρ</span></div>
        <div className="study-chart-rows" role="group" aria-label="Reported markers">{study.markers.map(item=>{const entry=findRecord(studyId,groupId,item.id);const missing=entry.rho===null;const width=missing?0:Math.abs(entry.rho)/study.axis*50;return <button key={item.id} className={`study-marker ${item.id===markerId?'is-selected':''}`} type="button" aria-pressed={item.id===markerId} aria-label={`${item.label}, ${missing?'not numerically reported':entry.rho.toFixed(3)}`} onClick={()=>{setMarkerId(item.id);setNotice('');}}><span className="study-marker-label">{item.label}</span><span className="study-track" aria-hidden="true"><span className="study-zero"/>{!missing&&<span className={`study-bar ${entry.rho<0?'negative':'positive'}`} style={{left:`${entry.rho<0?50-width:50}%`,width:`${width}%`}}/>}</span><span className="study-rho">{missing?'N/R':entry.rho.toFixed(3)}</span></button>;})}</div>
        <p className="study-small">{study.axisNote}</p>
      </div>
      <aside className="study-detail" aria-live="polite"><span className="study-kicker">Selected result · {group.shortLabel}</span><h3>{marker.label}</h3>{marker.description&&<p className="study-small">{marker.description}</p>}<div className={`study-selected-value ${record.rho===null?'is-missing':''}`} data-testid="study-rho">{selectedText}</div><p className="study-selected-metric">{study.statistic}</p><div className="study-inference">{record.rho===null?<><strong>Missing is not zero.</strong><p>{record.missingReason}</p></>:<><strong>{studyId==='rocha2026'?'Spatial association with atrophy':'Reported association with regional volume'}</strong><p>{study.interpretation}</p></>}</div>
        {studyId==='morais2025'?<dl className="study-detail-stats"><div><dt>Reported p</dt><dd>{record.p?.toFixed(3)??'Not given'}</dd></div><div><dt>Reported t</dt><dd>{record.t?.toFixed(3)??'Not given'}</dd></div></dl>:<dl className="study-detail-stats"><div><dt>Reported FDR q</dt><dd>{record.q?.toFixed(3)??'Exact q not given'}</dd></div><div><dt>Source conclusion</dt><dd>{record.fdrReported===true?'FDR-significant as reported':record.rho===null?'Value not reported':'See source'}</dd></div></dl>}
        <p className="study-small">{studyId==='morais2025'?study.pNote:record.qNote}</p><p className="study-citation">{record.source.location}<br/>{study.year} {studyId==='rocha2026'?'manuscript':'paper'} · PDF page {record.source.pdfPage}{record.source.printedPage?` · manuscript page ${record.source.printedPage}`:''}</p>
      </aside>
    </div>
    <div className="study-takeaway"><span>Read the result</span><p>{study.takeaways[groupId]}</p></div>
    {!compact&&study.atrophy.length>0&&<section className="study-atrophy" aria-labelledby={`${uid}-atrophy-title`}><div className="study-section-heading"><div><span className="study-kicker">Where lower volume was reported</span><h3 id={`${uid}-atrophy-title`}>A regional view of atrophy.</h3></div><p>11 selected regions from Figure 2A. The other 71 regions are not supplied here. These are separate baseline groups, not one person progressing over time.</p></div><div className="atrophy-scroll" tabIndex={0} role="region" aria-label="Reported regional effect sizes, scroll horizontally on small screens"><table className="atrophy-table"><caption>Reported Cohen’s d, rounded to two decimals. Negative means lower clinical-group volume than CN.</caption><thead><tr><th scope="col">Selected region</th>{study.groups.map(item=><th className={item.id===groupId?'selected-group':''} scope="col" key={item.id}><button type="button" aria-pressed={item.id===groupId} onClick={()=>changeGroup(item.id)}>{item.shortLabel}</button></th>)}</tr></thead><tbody>{study.atrophy.map(region=><tr key={region.id}><th scope="row">{region.label}</th>{study.groups.map(item=>{const value=region.values[item.id];const colors=atrophyColor(value);return <td key={item.id} className={item.id===groupId?'selected-group':''} style={colors}><span>{value===null?'N/R':value}</span></td>;})}</tr>)}</tbody></table></div><div className="atrophy-legend"><span>More negative d</span>{[-1.5,-1,-.5,0,.2].map(value=><span className="atrophy-swatch" key={value} style={atrophyColor(value)}>{value.toFixed(1)}</span>)}<span>More positive d</span></div><p className="study-small">Source Figure 2A · PDF page 26 · manuscript page 25. −0.00 is the rounded label in the source. Cohen’s d is a standardized group difference, not a percentage of tissue lost. These values are not connected to the separate 3D atlas.</p></section>}
    <details className="study-methods"><summary>Methods, source and limits</summary><div className="study-methods-grid"><div><h4>What this number means</h4><p>{study.method}</p><p>{study.comparability}</p></div><div><h4>What is still missing</h4>{study.caveats.map(text=><p key={text}>{text}</p>)}</div></div><p className="study-full-citation">{study.authors}. {study.title}. {studyId==='morais2025'?<a href={study.url} target="_blank" rel="noreferrer">Neurobiology of Disease · DOI 10.1016/j.nbd.2025.106897 ↗</a>:<>Submitted to Brain on 6 September 2026, manuscript BRAIN-2026-02951. Publication or acceptance is not established.</>}</p><p className="study-small">Values were transcribed from the supplied PDFs and checked against their tables, figures and text. No individual records or source PDF files are distributed in this demo. The original raw regional arrays have not been reanalysed.</p></details>
    <div className="study-actions">{compact?<a className="study-action-primary" href="prototype.html">Explore all reported results <span aria-hidden="true">↗</span></a>:<><button className="study-action-primary" type="button" onClick={exportSelection}>Export this evidence <span aria-hidden="true">↓</span></button>{onNext&&<button className="study-action-text" type="button" onClick={onNext}>What can this tell us about function? <span aria-hidden="true">→</span></button>}</>}<p role="status">{notice||'Reported evidence and hypothetical model states are separate views.'}</p></div>
  </section>;
}
