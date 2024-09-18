export enum BankAccountType {
  CURRENT_ACCOUNT = "CURRENT_ACCOUNT",
  SAVINGS_ACCOUNT = "SAVINGS_ACCOUNT",
}

export enum OperationType {
  PIX = "PIX",
  TED = "TED",
}

export enum PixAddressKeyType {
  CPF = "CPF",
  CNPJ = "CNPJ",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  RANDOM = "RANDOM",
}

export interface Bank {
  code: string;
}

export interface BankAccount {
  bank: Bank;
  accountName?: string;
  ownerName: string;
  ownerBirthDate?: string;
  cpfCnpj: string;
  agency: string;
  account: string;
  accountDigit: string;
  bankAccountType: BankAccountType;
  ispb?: string;
}

export interface TransferRequest {
  value: number;
  bankAccount?: BankAccount;
  operationType?: OperationType;
  pixAddressKey?: string;
  pixAddressKeyType?: PixAddressKeyType;
  description?: string;
  scheduleDate?: string;
}

export interface TransferResponse {
  object: string;
  id: string;
  type: string;
  dateCreated: string;
  value: number;
  netValue: number;
  status: string;
  transferFee: number;
  effectiveDate: string | null;
  endToEndIdentifier: string | null;
  scheduleDate: string;
  authorized: boolean;
  failReason: string | null;
  bankAccount: {
    bank: {
      ispb: string;
      code: string;
      name: string;
    };
    accountName: string;
    ownerName: string;
    cpfCnpj: string;
    pixAddressKey: string | null;
  };
  transactionReceiptUrl: string | null;
  operationType: OperationType;
  description: string;
}

export interface ListTransfersRequest {
  dateCreatedGe?: string;
  dateCreatedLe?: string;
  transferDateGe?: string;
  transferDateLe?: string;
  type?: string;
}

export interface Transfer {
  object: string;
  id: string;
  type: string;
  dateCreated: string;
  value: number;
  netValue: number;
  status: string;
  transferFee: number;
  effectiveDate: string | null;
  endToEndIdentifier: string | null;
  scheduleDate: string;
  authorized: boolean;
  failReason: string | null;
  bankAccount: {
    bank: {
      ispb: string;
      code: string;
      name: string;
    };
    accountName: string;
    ownerName: string;
    cpfCnpj: string;
    pixAddressKey: string | null;
  };
  transactionReceiptUrl: string | null;
  operationType: OperationType;
  description: string;
}

export interface ListTransfersResponse {
  data: Transfer[];
  totalCount: number;
  limit: number;
  offset: number;
}

export interface RecoverTransfer {
  object: string;
  id: string;
  dateCreated: string;
  status: string;
  effectiveDate: string | null;
  endToEndIdentifier: string | null;
  type: string;
  value: number;
  netValue: number;
  transferFee: number;
  scheduleDate: string;
  authorized: boolean;
  failReason: string | null;
  bankAccount: {
    bank: {
      code: string;
      name: string;
    };
    accountName: string;
    ownerName: string;
    cpfCnpj: string;
    agency: string;
    agencyDigit: string;
    account: string;
    accountDigit: string;
  };
  transactionReceiptUrl: string | null;
  operationType: OperationType;
  description: string | null;
}

export interface TransferToAsaasAccountRequest {
  value: number;
  walletId: string;
}

export interface TransferToAsaasAccountResponse {
  object: string;
  id: string;
  type: string;
  dateCreated: string;
  value: number;
  status: string;
  transferFee: number;
  netValue: number;
  failReason: string | null;
  effectiveDate: string;
  endToEndIdentifier: string | null;
  scheduleDate: string;
  authorized: boolean;
  walletId: string;
  account: {
    name: string;
    cpfCnpj: string;
    agency: string;
    account: string;
    accountDigit: string;
  };
  transactionReceiptUrl: string;
  operationType: string;
  description: string | null;
}

export interface CancelTransferResponse {
  object: string;
  id: string;
  dateCreated: string;
  status: string;
  effectiveDate: string | null;
  endToEndIdentifier: string | null;
  type: string;
  value: number;
  netValue: number;
  transferFee: number;
  scheduleDate: string;
  authorized: boolean;
  failReason: string | null;
  bankAccount: {
    bank: {
      code: string;
      name: string;
    };
    accountName: string;
    ownerName: string;
    cpfCnpj: string;
    accountDigit: string;
  };
  transactionReceiptUrl: string | null;
  operationType: string;
  description: string | null;
}