export interface Responsible {
  name: string | null;
  type: string;
}

export interface SendedDocument {
  id: string;
  status: string;
  type: string;
  title: string;
  description: string;
  responsible: Responsible;
  onboardingUrl?: string;
  documents: any[];
}

export interface DocumentResponse {
  rejectReasons: any;
  data: SendedDocument[];
}