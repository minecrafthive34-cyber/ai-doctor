import type { StructuredSearchResultData, GroundedSearchResultData } from '../types';

export const formatStructuredResultForSharing = (data: StructuredSearchResultData, translatedSections: Record<string, string>, translatedDisclaimer: string): string => {
  const { medicalInfo } = data;
  let summary = `Medical Information Summary: ${medicalInfo.name}\n\n`;

  summary += `Description:\n${medicalInfo.description}\n\n`;

  summary += `${translatedSections.symptoms}:\n`;
  medicalInfo.symptoms.forEach(symptom => {
    summary += `- ${symptom}\n`;
  });
  summary += '\n';

  summary += `${translatedSections.causes}:\n`;
  medicalInfo.causes.forEach(cause => {
    summary += `- ${cause}\n`;
  });
  summary += '\n';

  summary += `${translatedSections.treatments}:\n`;
  medicalInfo.commonTreatments.forEach(treatment => {
    summary += `- ${treatment}\n`;
  });
  summary += '\n';

  summary += `${translatedSections.medicines}:\n`;
  medicalInfo.medicines.forEach(medicine => {
    summary += `- ${medicine}\n`;
  });
  summary += '\n';

  summary += `${translatedSections.prevention}:\n`;
  medicalInfo.prevention.forEach(prevention => {
    summary += `- ${prevention}\n`;
  });
  summary += '\n';

  summary += `Disclaimer: ${translatedDisclaimer}\n`;

  return summary;
};

export const formatGroundedResultForSharing = (data: GroundedSearchResultData, translatedDisclaimer: string): string => {
  let summary = `Medical Information Summary: ${data.term}\n\n`;
  summary += `Summary:\n${data.summary}\n\n`;

  if (data.sources.length > 0) {
    summary += 'Sources:\n';
    data.sources.forEach(source => {
      summary += `- ${source.title} (${source.uri})\n`;
    });
    summary += '\n';
  }

  summary += `Disclaimer: ${translatedDisclaimer}\n`;

  return summary;
};


export const formatSectionForSharing = (conditionName: string, sectionTitle: string, items: string[], translatedDisclaimer: string): string => {
  let summary = `Medical Information for ${conditionName}: ${sectionTitle}\n\n`;
  
  items.forEach(item => {
    summary += `- ${item}\n`;
  });
  summary += '\n';

  summary += `Disclaimer: ${translatedDisclaimer}\n`;

  return summary;
};