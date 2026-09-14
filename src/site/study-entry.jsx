import React from 'react';
import {createRoot} from 'react-dom/client';
import StudyEvidence from '../components/StudyEvidence.jsx';

export function mountStudyEvidence(element) {
  const root = createRoot(element);
  root.render(<StudyEvidence compact/>);
  element.removeAttribute('aria-busy');
  return () => root.unmount();
}
