import { Schema, model, Document } from "mongoose";

export interface IAccountUserSchema extends Document {
  name: string;
  cpfCnpj: string;
  email: string;
  password: string;
  phone: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  postalCode: string;
  externalReference: string;
  notificationDisabled: boolean;
  additionalEmails: string[];
  municipalInscription: string;
  stateInscription: string;
  observations: string;
  groupName: string;
  company: string;
  createdAt: Date;
}

const accountUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cpfCnpj: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    mobilePhone: {
      type: String,
    },
    address: {
      type: String,
    },
    addressNumber: {
      type: String,
    },
    complement: {
      type: String,
    },
    province: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    externalReference: {
      type: String,
    },
    notificationDisabled: {
      type: Boolean,
      default: false,
    },
    additionalEmails: {
      type: [String],
    },
    municipalInscription: {
      type: String,
    },
    stateInscription: {
      type: String,
    },
    observations: {
      type: String,
    },
    groupName: {
      type: String,
    },
    company: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "account-users",
  },
);

export const AccountUserModel = model<IAccountUserSchema>(
  "AccountUser",
  accountUserSchema,
);
