import { BaseAccountUserInput } from "./baseAccountUser.types";

export type CreateAccountUserInput = BaseAccountUserInput;

export type UpdateAccountUserInput = Partial<BaseAccountUserInput>;

export type ListAsaasCustomersInput = {
  status?: string;
  offset?: number;
  limit?: number;
};
