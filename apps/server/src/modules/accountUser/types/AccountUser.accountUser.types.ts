import { BaseAccountUserInput, WebhookAccountUserInput } from "./baseAccountUser.types";

export type CreateAccountUserInput = BaseAccountUserInput;

export type UpdateAccountUserInput = Partial<BaseAccountUserInput>;

export type ListAsaasAccountUsersInput = {
  status?: string;
  offset?: number;
  limit?: number;
};


export type CreateAsaasSubaccountInput = {
  name: string;
  email: string;
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
  webhooks: WebhookAccountUserInput[];
}