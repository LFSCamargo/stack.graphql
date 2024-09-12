import { Schema, model, Document, Types } from "mongoose";

export interface IDocumentEventSchema extends Document {
  eventId: string;
  eventType: string;
  dateCreated: Date;
  accountStatus: {
    id: string;
    commercialInfo: string;
    bankAccountInfo: string;
    documentation: string;
    general: string;
  };
}

const documentEventSchema = new Schema(
  {
    eventId: { type: String, required: true },
    eventType: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    accountStatus: {
      id: { type: String, required: true },
      commercialInfo: { type: String, required: true },
      bankAccountInfo: { type: String, required: true },
      documentation: { type: String, required: true },
      general: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    collection: "document-events",
  },
);

export const DocumentEventModel = model<IDocumentEventSchema>(
  "DocumentEvent",
  documentEventSchema,
);