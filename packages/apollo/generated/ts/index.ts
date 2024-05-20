export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: any; output: any };
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"]["output"];
  user: User;
};

export type CardAuthPayload = {
  __typename?: "CardAuthPayload";
  cardUser: CardUser;
  token: Scalars["String"]["output"];
};

export type CardSignInInput = {
  cardNumber: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type CardUser = {
  __typename?: "CardUser";
  _id: Scalars["ID"]["output"];
  active?: Maybe<Scalars["Boolean"]["output"]>;
  balance?: Maybe<Scalars["String"]["output"]>;
  balanceChange?: Maybe<Scalars["String"]["output"]>;
  cardNumber: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  newAccount: Scalars["Boolean"]["output"];
};

export type CardUsersOutput = {
  __typename?: "CardUsersOutput";
  count: Scalars["Int"]["output"];
  data: Array<CardUser>;
  pageInfo: PageInfo;
};

export type ChangeCardUserPassword = {
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type ChangePasswordInput = {
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type CreateCardPasswordChangeRequestInput = {
  newCardPassword: Scalars["String"]["input"];
  oldCardPassword: Scalars["String"]["input"];
};

export type CreateCardUserInput = {
  cardNumber: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type CreatePixRequestInput = {
  ammount: Scalars["Float"]["input"];
  cpf: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  pixKey: Scalars["String"]["input"];
};

export type CreateTedRequestInput = {
  accountDigit: Scalars["String"]["input"];
  agency: Scalars["String"]["input"];
  ammount: Scalars["Float"]["input"];
  bankCode: Scalars["String"]["input"];
  cpf: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type DeleteCardUserInput = {
  id: Scalars["ID"]["input"];
};

export type Health = {
  __typename?: "Health";
  status: Scalars["String"]["output"];
};

export type IRequest = {
  __typename?: "IRequest";
  _id: Scalars["ID"]["output"];
  active: Scalars["Boolean"]["output"];
  cardUserId: Scalars["ID"]["output"];
  createdAt: Scalars["String"]["output"];
  payload: Scalars["JSON"]["output"];
  reason?: Maybe<Scalars["String"]["output"]>;
  status: RequestStatus;
  type: RequestType;
};

export type InjestTransactionsInput = {
  cardUserId: Scalars["ID"]["input"];
  transactions: Array<TransactionInput>;
};

export type MessageOutput = {
  __typename?: "MessageOutput";
  message: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  approveRequest: IRequest;
  cancelRequest: IRequest;
  changeCardUserPassword?: Maybe<Scalars["Boolean"]["output"]>;
  changePassword?: Maybe<Scalars["Boolean"]["output"]>;
  clearTransactions: Array<Maybe<Transaction>>;
  createCardPasswordChangeRequest: IRequest;
  createCardUser?: Maybe<CardUser>;
  createPixRequest: IRequest;
  createTedRequest: IRequest;
  deleteCardUser?: Maybe<Scalars["Boolean"]["output"]>;
  editCardUser?: Maybe<CardUser>;
  injestTransactions: Array<Maybe<Transaction>>;
  recoverPassword?: Maybe<MessageOutput>;
  rejectRequest: IRequest;
  resetPasswordWithCode?: Maybe<MessageOutput>;
  signIn?: Maybe<AuthPayload>;
  signInCardUser?: Maybe<CardAuthPayload>;
};

export type MutationApproveRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationCancelRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationChangeCardUserPasswordArgs = {
  input: ChangeCardUserPassword;
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationCreateCardPasswordChangeRequestArgs = {
  input: CreateCardPasswordChangeRequestInput;
};

export type MutationCreateCardUserArgs = {
  input: CreateCardUserInput;
};

export type MutationCreatePixRequestArgs = {
  input: CreatePixRequestInput;
};

export type MutationCreateTedRequestArgs = {
  input: CreateTedRequestInput;
};

export type MutationDeleteCardUserArgs = {
  input: DeleteCardUserInput;
};

export type MutationEditCardUserArgs = {
  input: CreateCardUserInput;
};

export type MutationInjestTransactionsArgs = {
  input?: InputMaybe<InjestTransactionsInput>;
};

export type MutationRecoverPasswordArgs = {
  input: RecoverPassword;
};

export type MutationRejectRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationResetPasswordWithCodeArgs = {
  input: ResetPasswordWithCodeInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSignInCardUserArgs = {
  input: CardSignInInput;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  allTransactions: TransactionsOutput;
  cardUser?: Maybe<CardUser>;
  cardUserById?: Maybe<CardUser>;
  cardUserTransactions: TransactionsOutput;
  cardUsers?: Maybe<CardUsersOutput>;
  health: Health;
  me?: Maybe<User>;
  myRequests: RequestsOutput;
  request?: Maybe<IRequest>;
  requests: RequestsOutput;
  transactionsByCardNumber: TransactionsOutput;
  transactionsByCardUserId: TransactionsOutput;
};

export type QueryAllTransactionsArgs = {
  input: PaginationInput;
};

export type QueryCardUserByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCardUserTransactionsArgs = {
  input: PaginationInput;
};

export type QueryCardUsersArgs = {
  input: PaginationInput;
};

export type QueryMyRequestsArgs = {
  input: PaginationInput;
};

export type QueryRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRequestsArgs = {
  input: PaginationInput;
  status?: InputMaybe<RequestStatus>;
  type?: InputMaybe<RequestType>;
};

export type QueryTransactionsByCardNumberArgs = {
  cardNumber: Scalars["String"]["input"];
  input: PaginationInput;
};

export type QueryTransactionsByCardUserIdArgs = {
  cardUserId: Scalars["ID"]["input"];
  input: PaginationInput;
};

export type RecoverPassword = {
  cardNumber: Scalars["String"]["input"];
};

export enum RequestStatus {
  Approved = "APPROVED",
  Canceled = "CANCELED",
  Pending = "PENDING",
  Rejected = "REJECTED",
}

export enum RequestType {
  CardPasswordChange = "CARD_PASSWORD_CHANGE",
  Withdrawal = "WITHDRAWAL",
}

export type RequestsOutput = {
  __typename?: "RequestsOutput";
  count: Scalars["Int"]["output"];
  data: Array<IRequest>;
  pageInfo: PageInfo;
};

export type ResetPasswordWithCodeInput = {
  code: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
};

export type SignInInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Transaction = {
  __typename?: "Transaction";
  _id: Scalars["ID"]["output"];
  amount: Scalars["Float"]["output"];
  createdAt: Scalars["String"]["output"];
  date: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
};

export type TransactionInput = {
  amount: Scalars["Float"]["input"];
  balanceUpdated: Scalars["Float"]["input"];
  date: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
};

export type TransactionsOutput = {
  __typename?: "TransactionsOutput";
  count: Scalars["Int"]["output"];
  data: Array<Transaction>;
  pageInfo: PageInfo;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type CardUserQueryVariables = Exact<{ [key: string]: never }>;

export type CardUserQuery = {
  __typename?: "Query";
  cardUser?: {
    __typename?: "CardUser";
    cardNumber: string;
    name: string;
    _id: string;
    balance?: string | null;
    balanceChange?: string | null;
  } | null;
};

export type CardUserByIdQueryVariables = Exact<{
  cardUserByIdId: Scalars["ID"]["input"];
}>;

export type CardUserByIdQuery = {
  __typename?: "Query";
  cardUserById?: {
    __typename?: "CardUser";
    newAccount: boolean;
    name: string;
    cardNumber: string;
    _id: string;
    active?: boolean | null;
    balance?: string | null;
    balanceChange?: string | null;
  } | null;
};

export type ChangeCardUserPasswordMutationVariables = Exact<{
  input: ChangeCardUserPassword;
}>;

export type ChangeCardUserPasswordMutation = {
  __typename?: "Mutation";
  changeCardUserPassword?: boolean | null;
};

export type CardUserSignInMutationVariables = Exact<{
  input: CardSignInInput;
}>;

export type CardUserSignInMutation = {
  __typename?: "Mutation";
  signInCardUser?: {
    __typename?: "CardAuthPayload";
    token: string;
    cardUser: {
      __typename?: "CardUser";
      cardNumber: string;
      _id: string;
      name: string;
    };
  } | null;
};

export type CardUsersQueryVariables = Exact<{
  input: PaginationInput;
}>;

export type CardUsersQuery = {
  __typename?: "Query";
  cardUsers?: {
    __typename?: "CardUsersOutput";
    count: number;
    pageInfo: { __typename?: "PageInfo"; hasNextPage: boolean };
    data: Array<{
      __typename?: "CardUser";
      cardNumber: string;
      name: string;
      _id: string;
      newAccount: boolean;
      balance?: string | null;
    }>;
  } | null;
};

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword?: boolean | null;
};

export type CreateCardUserMutationVariables = Exact<{
  input: CreateCardUserInput;
}>;

export type CreateCardUserMutation = {
  __typename?: "Mutation";
  createCardUser?: {
    __typename?: "CardUser";
    newAccount: boolean;
    name: string;
    cardNumber: string;
    balance?: string | null;
    active?: boolean | null;
    _id: string;
  } | null;
};

export type CreateChangeCardPasswordRequestMutationVariables = Exact<{
  input: CreateCardPasswordChangeRequestInput;
}>;

export type CreateChangeCardPasswordRequestMutation = {
  __typename?: "Mutation";
  createCardPasswordChangeRequest: {
    __typename?: "IRequest";
    reason?: string | null;
    payload: any;
    createdAt: string;
    active: boolean;
    cardUserId: string;
    type: RequestType;
    status: RequestStatus;
  };
};

export type CreatePixRequestMutationVariables = Exact<{
  input: CreatePixRequestInput;
}>;

export type CreatePixRequestMutation = {
  __typename?: "Mutation";
  createPixRequest: {
    __typename?: "IRequest";
    reason?: string | null;
    payload: any;
    createdAt: string;
    active: boolean;
    cardUserId: string;
    type: RequestType;
    status: RequestStatus;
  };
};

export type CreateTedRequestMutationVariables = Exact<{
  input: CreateTedRequestInput;
}>;

export type CreateTedRequestMutation = {
  __typename?: "Mutation";
  createTedRequest: {
    __typename?: "IRequest";
    reason?: string | null;
    payload: any;
    createdAt: string;
    active: boolean;
    cardUserId: string;
    type: RequestType;
    status: RequestStatus;
  };
};

export type DeleteCardUserMutationVariables = Exact<{
  input: DeleteCardUserInput;
}>;

export type DeleteCardUserMutation = {
  __typename?: "Mutation";
  deleteCardUser?: boolean | null;
};

export type EditCardUserMutationVariables = Exact<{
  input: CreateCardUserInput;
}>;

export type EditCardUserMutation = {
  __typename?: "Mutation";
  editCardUser?: {
    __typename?: "CardUser";
    newAccount: boolean;
    name: string;
    cardNumber: string;
    balance?: string | null;
    active?: boolean | null;
    _id: string;
  } | null;
};

export type InjestTransactionsMutationVariables = Exact<{
  input?: InputMaybe<InjestTransactionsInput>;
}>;

export type InjestTransactionsMutation = {
  __typename?: "Mutation";
  injestTransactions: Array<{
    __typename?: "Transaction";
    description: string;
    date: string;
    createdAt: string;
    amount: number;
    _id: string;
  } | null>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: { __typename?: "User"; email: string; name: string } | null;
};

export type MyRequestsQueryVariables = Exact<{
  input: PaginationInput;
}>;

export type MyRequestsQuery = {
  __typename?: "Query";
  myRequests: {
    __typename?: "RequestsOutput";
    count: number;
    data: Array<{
      __typename?: "IRequest";
      _id: string;
      reason?: string | null;
      payload: any;
      createdAt: string;
      active: boolean;
      cardUserId: string;
      type: RequestType;
      status: RequestStatus;
    }>;
    pageInfo: { __typename?: "PageInfo"; hasNextPage: boolean };
  };
};

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn?: {
    __typename?: "AuthPayload";
    token: string;
    user: { __typename?: "User"; email: string; id: string; name: string };
  } | null;
};

export type TransactionsByCardUserIdQueryVariables = Exact<{
  cardUserId: Scalars["ID"]["input"];
  input: PaginationInput;
}>;

export type TransactionsByCardUserIdQuery = {
  __typename?: "Query";
  transactionsByCardUserId: {
    __typename?: "TransactionsOutput";
    count: number;
    pageInfo: { __typename?: "PageInfo"; hasNextPage: boolean };
    data: Array<{
      __typename?: "Transaction";
      _id: string;
      amount: number;
      createdAt: string;
      description: string;
      date: string;
    }>;
  };
};
