export type TCreatePixRequestInput = {
  cpf: string;
  name: string;
  pixKey: string;
  ammount: number;
};

export type TCreateTedRequestInput = {
  cpf: string;
  name: string;
  bankCode: string;
  agency: string;
  accountDigit: string;
  ammount: number;
};

export type TCreateChangePasswordRequestInput = {
  oldCardPassword: string;
  newCardPassword: string;
};
