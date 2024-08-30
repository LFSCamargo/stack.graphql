import { Schema, model, Document, Types } from "mongoose";
import { AccountStatus } from "../modules/accountUser/enums/accountStatus.enum";

export interface IAccountUserSchema extends Document {
  name: string;
  email: string;
  loginEmail?: string;
  password: string;
  accountStatus: AccountStatus;
  basketId?: Types.ObjectId;
  cpfCnpj: string;
  birthDate?: Date;
  companyType?: string;
  phone?: string;
  mobilePhone: string;
  site?: string;
  incomeValue: number;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  postalCode: string;
  webhooks: {
    name: string;
    url: string;
    email: string;
    sendType: "SEQUENTIALLY" | "NON_SEQUENTIALLY";
    apiVersion?: number;
    enabled?: boolean;
    interrupted?: boolean;
    authToken?: string;
    events: string[];
  }[];
}

const accountUserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    loginEmail: { type: String },
    password: { type: String, required: true },
    accountStatus: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.PENDING,
    },
    basketId: { type: Types.ObjectId, ref: "Basket" },
    cpfCnpj: { type: String, required: true },
    birthDate: { type: Date },
    companyType: { type: String },
    phone: { type: String },
    mobilePhone: { type: String, required: true },
    site: { type: String },
    incomeValue: { type: Number, required: true },
    address: { type: String, required: true },
    addressNumber: { type: String, required: true },
    complement: { type: String },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    webhooks: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        email: { type: String, required: true },
        sendType: {
          type: String,
          enum: ["SEQUENTIALLY", "NON_SEQUENTIALLY"],
          default: "SEQUENTIALLY",
        },
        apiVersion: { type: Number, default: 3 },
        enabled: { type: Boolean, default: true },
        interrupted: { type: Boolean, default: false },
        authToken: { type: String },
        events: { type: [String], required: true },
      },
    ],
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
