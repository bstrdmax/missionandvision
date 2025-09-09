
export interface BusinessInfo {
  name: string;
  industry: string;
  audience: string;
  services: string;
  usp: string; // Unique Selling Proposition
  culture: string;
}

export interface CoreValue {
  value: string;
  description: string;
}

export interface GeneratedContentData {
  missionStatement: string;
  coreValues: CoreValue[];
}
