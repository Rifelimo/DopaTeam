import test from 'node:test';
import assert from 'node:assert/strict';
import {studies,findRecord,evidenceExport,atrophyColor} from '../src/data/studies.mjs';

test('published table keeps all 39 cells and its reported signed examples',()=>{
  const study=studies.find(x=>x.id==='morais2025');
  assert.equal(study.associations.length,39);
  for(const group of study.groups) for(const marker of study.markers) assert.ok(Number.isFinite(findRecord(study.id,group.id,marker.id).rho));
  assert.equal(findRecord(study.id,'AD','D2').rho,-.036);
  assert.equal(findRecord(study.id,'AD','GABAa').p,.012);
  assert.equal(findRecord(study.id,'bvFTD','Mu opioid').rho,-.054);
  assert.equal(findRecord(study.id,'MCI','SERT').rho,-.093);
  assert.equal(findRecord(study.id,'MCI','SERT').p,.005);
  assert.equal(findRecord(study.id,'MCI','SERT').fdrReported,null);
});

test('manuscript exact correlations retain q values and missing exact q',()=>{
  assert.equal(findRecord('rocha2026','LMCI','cumi').rho,-.871);
  assert.equal(findRecord('rocha2026','LMCI','cumi').q,.003);
  assert.equal(findRecord('rocha2026','AD','sst').rho,-.639);
  assert.equal(findRecord('rocha2026','AD','sst').q,.002);
  const absentQ=findRecord('rocha2026','AD','way');
  assert.equal(absentQ.q,null);
  assert.equal(absentQ.fdrReported,true);
});

test('unreported coefficients remain null and invalid selections are rejected',()=>{
  assert.equal(findRecord('rocha2026','SMC','vip').rho,null);
  assert.equal(findRecord('rocha2026','LMCI','d2').rho,null);
  assert.throws(()=>findRecord('morais2025','CN','D2'));
  assert.throws(()=>findRecord('rocha2026','AD','GABAa'));
});

test('Figure 2A preserves all 44 rounded labels including negative zero',()=>{
  const study=studies.find(x=>x.id==='rocha2026');
  assert.equal(study.atrophy.length,11);
  assert.equal(study.atrophy.flatMap(x=>Object.values(x.values)).length,44);
  assert.equal(study.atrophy.find(x=>x.sourceLabel==='L hippocampus').values.AD,'-1.44');
  assert.equal(study.atrophy.find(x=>x.sourceLabel==='L hippocampus').values.SMC,'0.08');
  assert.equal(study.atrophy.find(x=>x.sourceLabel==='R middle temporal').values.SMC,'-0.00');
  assert.equal(study.atrophy.find(x=>x.sourceLabel==='L entorhinal').values.SMC,'-0.16');
  assert.notDeepEqual(atrophyColor(null),atrophyColor(0));
  assert.notDeepEqual(atrophyColor(-1),atrophyColor(.1));
});

test('source scopes and evidence exports cannot silently become patient predictions',()=>{
  assert.deepEqual(studies.map(x=>[x.n,x.nRegions]),[[214,83],[1435,82]]);
  const data=evidenceExport('rocha2026','SMC','vip');
  assert.equal(data.selectedResult.rho,null);
  assert.equal(data.source.status,'Submitted manuscript');
  assert.equal(data.reanalysisPerformed,false);
  assert.equal(data.clinicalInference,false);
  assert.equal(data.rawPatientDataIncluded,false);
  assert.equal(data.regionalEffectSizes.length,11);
  assert.equal(data.regionalEffectSizes[0].source.pdfPage,26);
  assert.doesNotMatch(JSON.stringify(data),/Users[\\/]|sourcePdfLocalPath/);
});
