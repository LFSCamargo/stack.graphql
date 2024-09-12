import { AsaasDocumentType } from '../enums/accountDocuments.enum';

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



export interface SubmitDocumentBody {
  documentFile: File;
  type: AsaasDocumentType;
}

export interface SubmitDocumentResponse {
  id: string;
  status: string;
}