export type CreateCustomerInput = {
  name: string;
  cpfCnpj: string;
  password: string;
  email: string;
  phone: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  postalCode: string;
  externalReference: string;
  notificationDisabled: boolean;
  municipalInscription: string;
  stateInscription: string;
  observations: string;
  groupName: string;
  company: string;
};

export type UpdateCustomerInput = {
  id: string;
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
  municipalInscription: string;
  stateInscription: string;
  observations: string;
  groupName: string;
  company: string;
};

export type ListAsaasCustomersInput = {
  name: string;
  email: string;
  cpfCnpj: string;
  groupName: string;
  externalReference: string;
  offset: number;
  limit: number;
};
