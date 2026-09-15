import reported from './reported-studies.json' with {type:'json'};

// Reported aggregates transcribed from supplied papers. Not a new cohort analysis.
export const studies = [
  {
    id:'morais2025', year:2025, shortLabel:'Three clinical cohorts', status:'Published study',
    authors:'Morais and colleagues', title:'Differential involvement of neurotransmitter pathways in AD, bvFTD and MCI: Whole-brain MRI analysis',
    url:'https://doi.org/10.1016/j.nbd.2025.106897', n:214, nRegions:83,
    heading:'Different cohorts, different associations.',
    description:'Reported correlations between adjusted regional brain volumes and 13 normative neurotransmitter maps.',
    groups:[
      {id:'AD',label:'AD · Alzheimer’s disease',shortLabel:'AD',detail:'89 AD participants in the Results text. Table 1 lists 88. Table 2 does not specify its sample size.'},
      {id:'bvFTD',label:'bvFTD · Behavioral variant frontotemporal dementia',shortLabel:'bvFTD',detail:'74 bvFTD participants in the Results text. Table 1 lists 75. Table 2 does not specify its sample size.'},
      {id:'MCI',label:'MCI · Mild cognitive impairment',shortLabel:'MCI',detail:'51 MCI participants in the Results text and Table 1. No healthy control cohort is listed.'}
    ],
    markers:[['5HT1a','5-HT1A'],['5HT1b','5-HT1B'],['5HT2a','5-HT2A'],['D1','D1'],['D2','D2'],['DAT','DAT'],['FDOPA','FDOPA'],['GABAa','GABA-A'],['Mu opioid','Mu-opioid'],['NAT','NAT'],['SERT','SERT'],['VAChT','VAChT'],['mGluR5','mGluR5']].map(([id,label])=>({id,label})),
    defaultGroup:'AD',defaultMarker:'D2',associations:reported.published,atrophy:[],
    statistic:'Reported group mean ρ', axis:0.1, tableLocation:'Table 2 · PDF page 6',
    chartDescription:'All 13 target maps in the source table. Blue indicates a negative value, amber a positive value.',
    axisNote:'Magnified axis from −0.10 to +0.10. These are small group mean correlations. N/R means not numerically reported.',
    interpretation:'The sign describes a regional volume–reference-map association. It does not measure neurotransmitter concentration, receptor loss or cell function in a patient.',
    pNote:'p is shown exactly as reported. Table 2 does not identify its correction status. No corrected-significance badge is inferred.',
    method:'Participant-level Spearman correlations were computed across 83 regions from volumes adjusted for age, sex and intracranial volume. Methods describe Fisher z transformation for statistical testing. Table 2 labels its summary Mean rho without specifying the averaging or back-transformation convention.',
    comparability:'This participant-level group summary is not the same statistic as the 2026 study’s correlation of a group atrophy map across regions. Do not compare their magnitudes as evidence of stronger disease or replication.',
    caveats:['Single-center convenience sample. No healthy control cohort is listed. Results text gives 89 AD and 74 bvFTD participants, while Table 1 gives 88 and 75.','The table reports p values but does not specify the correction family. No confidence intervals or patient-level distributions can be reconstructed from these summaries.','Normative maps come from healthy reference participants. The paper does not establish patient-specific target activity or a treatment response.'],
    takeaways:{AD:'D2 and GABA-A have negative mean ρ in AD, with p = 0.038 and 0.012 as reported. The values are associations, not a demonstration that either receptor causes atrophy.',bvFTD:'The mu-opioid map has negative mean ρ in bvFTD, with p = 0.027 as reported. This is a group-level clue for further investigation.',MCI:'DAT and SERT have negative mean ρ in MCI, with p = 0.024 and 0.005 as reported. This cross-sectional comparison does not establish when transmitter changes began.'}
  },
  {
    id:'rocha2026',year:2026,shortLabel:'Atrophy & cellular context',status:'Submitted manuscript',
    authors:'Rocha, Cunha and Morais',title:'Multimodal and multiscale mapping of neurochemical and cellular vulnerability in Alzheimer’s disease',
    manuscriptId:'BRAIN-2026-02951',submittedDate:'2026-09-06',n:1435,nRegions:82,
    heading:'Where anatomy meets molecular context.',
    description:'Reported regional atrophy associations with normative receptor maps and transcriptomic cell-type signatures in ADNI.',
    groups:[
      {id:'AD',label:'AD vs CN · Alzheimer’s disease',shortLabel:'AD vs CN',detail:'201 AD participants and 290 cognitively normal controls. Baseline cross-sectional comparison.'},
      {id:'LMCI',label:'LMCI vs CN · Late mild cognitive impairment',shortLabel:'LMCI vs CN',detail:'264 LMCI participants and 290 cognitively normal controls. Baseline cross-sectional comparison.'},
      {id:'EMCI',label:'EMCI vs CN · Early mild cognitive impairment',shortLabel:'EMCI vs CN',detail:'387 EMCI participants and 290 cognitively normal controls. Baseline cross-sectional comparison.'},
      {id:'SMC',label:'SMC vs CN · Subjective memory concerns',shortLabel:'SMC vs CN',detail:'293 SMC participants and 290 cognitively normal controls. Baseline cross-sectional comparison.'}
    ],
    markers:[{id:'cumi',label:'5-HT1A · CUMI',description:'A normative serotonin 5-HT1A receptor map based on the CUMI radioligand.'},{id:'way',label:'5-HT1A · WAY',description:'A normative serotonin 5-HT1A receptor map based on the WAY radioligand.'},{id:'sst',label:'SST · layers 5–6',description:'Somatostatin-related inhibitory-neuron enrichment in cortical layers 5–6.'},{id:'vip',label:'VIP · layers 3–6',description:'Vasoactive intestinal peptide-related inhibitory-neuron enrichment in cortical layers 3–6.'},{id:'d2',label:'D2 · fallypride',description:'A normative dopamine D2 receptor map based on fallypride.'}],
    defaultGroup:'AD',defaultMarker:'sst',associations:reported.manuscript,atrophy:reported.atrophy,
    statistic:'Across-region Spearman ρ',axis:1,tableLocation:'Results · PDF pages 12–13',
    chartDescription:'Five selected markers from the Results text. SST and VIP rows are cell-type signatures, not receptor measurements.',
    axisNote:'Axis from −1 to +1. Missing entries are not zero and are not newly classified as significant or nonsignificant.',
    interpretation:'A negative correlation means higher normative reference values tend to coincide with lower clinical-group volume. This is spatial colocalization, not direct measurement of receptor activity or cell survival.',
    method:'ComBat-harmonized baseline MRI was summarized as clinical-group versus CN Cohen’s d across 82 aligned regions, excluding the brainstem. The manuscript reports 5,000 spatially constrained surrogates and Benjamini–Hochberg FDR within diagnostic contrasts and map families.',
    comparability:'These across-region correlations differ from the participant-level mean ρ in the 2025 paper. Cohorts, atrophy definitions and testing also differ. The two studies are shown separately.',
    caveats:['The supplied document is a manuscript submitted for peer review on 6 September 2026. Its acceptance or publication has not been established.','Only explicitly reported values are included. Eleven regional effect-size rows are rounded labels from Figure 2A. The other 71 regions are unavailable here.','The map families are normative references. Cell-type enrichment is not a measurement of cell loss, compensation or function in an individual. Cross-sectional group differences do not show individual progression.'],
    takeaways:{AD:'The manuscript reports AD associations for 5-HT1A, SST and VIP, with a weaker D2 association. Left hippocampus has a reported Cohen’s d of −1.44 in the selected regional results.',LMCI:'LMCI has the strongest reported 5-HT1A and SST spatial associations. A stronger spatial correlation does not mean more tissue loss than AD.',EMCI:'The manuscript reports negative 5-HT1A, SST and VIP associations in EMCI, while regional effect sizes are generally closer to zero than in AD.',SMC:'5-HT1A and SST correlations are reported for SMC. The selected VIP and D2 numerical coefficients are not given here. Weak regional effects are not a patient-level forecast.'}
  }
];

export function findRecord(studyId, groupId, markerId) {
  const study = studies.find(item=>item.id===studyId);
  if (!study || !study.groups.some(item=>item.id===groupId) || !study.markers.some(item=>item.id===markerId)) throw new Error('Unknown study, cohort or marker.');
  return study.associations.find(item=>item.groupId===groupId&&item.markerId===markerId) ?? {
    markerId,groupId,rho:null,p:null,q:null,fdrReported:null,
    missingReason:'An exact coefficient for this comparison is not numerically reported in the selected Results text. It has not been filled with zero.',
    qNote:'No exact q value is supplied for this missing numerical result.',
    source:{location:'Results narrative and Figure 2',pdfPage:12,printedPage:11}
  };
}

export function evidenceExport(studyId, groupId, markerId) {
  const study = studies.find(item=>item.id===studyId);
  const selected = findRecord(studyId,groupId,markerId);
  return {schemaVersion:1,project:'StarLens',dataKind:'reported-study-aggregates',source:{title:study.title,authors:study.authors,year:study.year,status:study.status,doi:studyId==='morais2025'?'10.1016/j.nbd.2025.106897':null,manuscriptId:study.manuscriptId??null},selection:{studyId,groupId,markerId},statistic:study.statistic,method:study.method,selectedResult:selected,groupResults:study.markers.map(marker=>findRecord(studyId,groupId,marker.id)),regionalEffectSizes:study.atrophy.map(region=>({region:region.label,cohensD:region.values[groupId]===null?null:Number(region.values[groupId]),sourceDisplay:region.values[groupId],source:region.source})),limitations:study.caveats,rawPatientDataIncluded:false,reanalysisPerformed:false,clinicalInference:false};
}

export function atrophyColor(value) {
  if (value===null || !Number.isFinite(Number(value))) return {backgroundColor:'#333333',color:'#ffffff'};
  const number=Number(value),neutral=[237,241,237],end=number<0?[29,80,133]:[244,187,87];
  const amount=Math.min(1,Math.abs(number)/(number<0?1.5:.2));
  const rgb=neutral.map((channel,i)=>Math.round(channel+(end[i]-channel)*amount));
  const linear=rgb.map(channel=>{const v=channel/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});
  const luminance=.2126*linear[0]+.7152*linear[1]+.0722*linear[2];
  return {backgroundColor:`rgb(${rgb.join(',')})`,color:luminance<.179?'#ffffff':'#000000'};
}
