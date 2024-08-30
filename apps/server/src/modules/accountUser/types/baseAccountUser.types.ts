export type WebhookAccountUserInput = {
  name: string;
  url: string;
  email: string;
  sendType: "SEQUENTIALLY" | "NON_SEQUENTIALLY";
  apiVersion?: number;
  enabled?: boolean;
  interrupted?: boolean;
  authToken?: string;
  events: string[];
};

export type BaseAccountUserInput = {
  name: string;
  email: string;
  loginEmail?: string;
  password: string;
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
};
