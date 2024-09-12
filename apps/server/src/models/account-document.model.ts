import { Schema, model, Document, Types } from "mongoose";

export interface IAccountDocumentSchema extends Document {
  userId: Types.ObjectId;
  documentId: string;
  status: string;
  type: string;
  title: string;
  description: string;
  responsible: {
    name: string | null;
    type: string;
  };
  onboardingUrl?: string;
  documents: any[];
}

const accountDocumentSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "AccountUser", required: true },
    documentId: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    responsible: {
      name: { type: String, default: null },
      type: { type: String, required: true },
    },
    onboardingUrl: { type: String },
    documents: { type: Array, default: [] },
  },
  {
    timestamps: true,
    collection: "account-documents",
  },
);

export const AccountDocumentModel = model<IAccountDocumentSchema>(
  "AccountDocument",
  accountDocumentSchema,
);