import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
const defaultOptions = {} as const;
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

export const CardUserDocument = gql`
  query CardUser {
    cardUser {
      cardNumber
      name
      _id
      balance
      balanceChange
    }
  }
`;

/**
 * __useCardUserQuery__
 *
 * To run a query within a React component, call `useCardUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCardUserQuery(
  baseOptions?: Apollo.QueryHookOptions<CardUserQuery, CardUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CardUserQuery, CardUserQueryVariables>(
    CardUserDocument,
    options,
  );
}
export function useCardUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CardUserQuery,
    CardUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CardUserQuery, CardUserQueryVariables>(
    CardUserDocument,
    options,
  );
}
export function useCardUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CardUserQuery,
    CardUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CardUserQuery, CardUserQueryVariables>(
    CardUserDocument,
    options,
  );
}
export type CardUserQueryHookResult = ReturnType<typeof useCardUserQuery>;
export type CardUserLazyQueryHookResult = ReturnType<
  typeof useCardUserLazyQuery
>;
export type CardUserSuspenseQueryHookResult = ReturnType<
  typeof useCardUserSuspenseQuery
>;
export type CardUserQueryResult = Apollo.QueryResult<
  CardUserQuery,
  CardUserQueryVariables
>;
export const CardUserByIdDocument = gql`
  query CardUserById($cardUserByIdId: ID!) {
    cardUserById(id: $cardUserByIdId) {
      newAccount
      name
      cardNumber
      _id
      active
      balance
      balanceChange
    }
  }
`;

/**
 * __useCardUserByIdQuery__
 *
 * To run a query within a React component, call `useCardUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardUserByIdQuery({
 *   variables: {
 *      cardUserByIdId: // value for 'cardUserByIdId'
 *   },
 * });
 */
export function useCardUserByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    CardUserByIdQuery,
    CardUserByIdQueryVariables
  > &
    (
      | { variables: CardUserByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CardUserByIdQuery, CardUserByIdQueryVariables>(
    CardUserByIdDocument,
    options,
  );
}
export function useCardUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CardUserByIdQuery,
    CardUserByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CardUserByIdQuery, CardUserByIdQueryVariables>(
    CardUserByIdDocument,
    options,
  );
}
export function useCardUserByIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CardUserByIdQuery,
    CardUserByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CardUserByIdQuery, CardUserByIdQueryVariables>(
    CardUserByIdDocument,
    options,
  );
}
export type CardUserByIdQueryHookResult = ReturnType<
  typeof useCardUserByIdQuery
>;
export type CardUserByIdLazyQueryHookResult = ReturnType<
  typeof useCardUserByIdLazyQuery
>;
export type CardUserByIdSuspenseQueryHookResult = ReturnType<
  typeof useCardUserByIdSuspenseQuery
>;
export type CardUserByIdQueryResult = Apollo.QueryResult<
  CardUserByIdQuery,
  CardUserByIdQueryVariables
>;
export const ChangeCardUserPasswordDocument = gql`
  mutation ChangeCardUserPassword($input: ChangeCardUserPassword!) {
    changeCardUserPassword(input: $input)
  }
`;
export type ChangeCardUserPasswordMutationFn = Apollo.MutationFunction<
  ChangeCardUserPasswordMutation,
  ChangeCardUserPasswordMutationVariables
>;

/**
 * __useChangeCardUserPasswordMutation__
 *
 * To run a mutation, you first call `useChangeCardUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeCardUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeCardUserPasswordMutation, { data, loading, error }] = useChangeCardUserPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeCardUserPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeCardUserPasswordMutation,
    ChangeCardUserPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangeCardUserPasswordMutation,
    ChangeCardUserPasswordMutationVariables
  >(ChangeCardUserPasswordDocument, options);
}
export type ChangeCardUserPasswordMutationHookResult = ReturnType<
  typeof useChangeCardUserPasswordMutation
>;
export type ChangeCardUserPasswordMutationResult =
  Apollo.MutationResult<ChangeCardUserPasswordMutation>;
export type ChangeCardUserPasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangeCardUserPasswordMutation,
  ChangeCardUserPasswordMutationVariables
>;
export const CardUserSignInDocument = gql`
  mutation CardUserSignIn($input: CardSignInInput!) {
    signInCardUser(input: $input) {
      token
      cardUser {
        cardNumber
        _id
        name
      }
    }
  }
`;
export type CardUserSignInMutationFn = Apollo.MutationFunction<
  CardUserSignInMutation,
  CardUserSignInMutationVariables
>;

/**
 * __useCardUserSignInMutation__
 *
 * To run a mutation, you first call `useCardUserSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCardUserSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cardUserSignInMutation, { data, loading, error }] = useCardUserSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCardUserSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CardUserSignInMutation,
    CardUserSignInMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CardUserSignInMutation,
    CardUserSignInMutationVariables
  >(CardUserSignInDocument, options);
}
export type CardUserSignInMutationHookResult = ReturnType<
  typeof useCardUserSignInMutation
>;
export type CardUserSignInMutationResult =
  Apollo.MutationResult<CardUserSignInMutation>;
export type CardUserSignInMutationOptions = Apollo.BaseMutationOptions<
  CardUserSignInMutation,
  CardUserSignInMutationVariables
>;
export const CardUsersDocument = gql`
  query CardUsers($input: PaginationInput!) {
    cardUsers(input: $input) {
      count
      pageInfo {
        hasNextPage
      }
      data {
        cardNumber
        name
        _id
        newAccount
        balance
      }
    }
  }
`;

/**
 * __useCardUsersQuery__
 *
 * To run a query within a React component, call `useCardUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCardUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    CardUsersQuery,
    CardUsersQueryVariables
  > &
    (
      | { variables: CardUsersQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CardUsersQuery, CardUsersQueryVariables>(
    CardUsersDocument,
    options,
  );
}
export function useCardUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CardUsersQuery,
    CardUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CardUsersQuery, CardUsersQueryVariables>(
    CardUsersDocument,
    options,
  );
}
export function useCardUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CardUsersQuery,
    CardUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CardUsersQuery, CardUsersQueryVariables>(
    CardUsersDocument,
    options,
  );
}
export type CardUsersQueryHookResult = ReturnType<typeof useCardUsersQuery>;
export type CardUsersLazyQueryHookResult = ReturnType<
  typeof useCardUsersLazyQuery
>;
export type CardUsersSuspenseQueryHookResult = ReturnType<
  typeof useCardUsersSuspenseQuery
>;
export type CardUsersQueryResult = Apollo.QueryResult<
  CardUsersQuery,
  CardUsersQueryVariables
>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const CreateCardUserDocument = gql`
  mutation CreateCardUser($input: CreateCardUserInput!) {
    createCardUser(input: $input) {
      newAccount
      name
      cardNumber
      balance
      active
      _id
    }
  }
`;
export type CreateCardUserMutationFn = Apollo.MutationFunction<
  CreateCardUserMutation,
  CreateCardUserMutationVariables
>;

/**
 * __useCreateCardUserMutation__
 *
 * To run a mutation, you first call `useCreateCardUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardUserMutation, { data, loading, error }] = useCreateCardUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCardUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCardUserMutation,
    CreateCardUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCardUserMutation,
    CreateCardUserMutationVariables
  >(CreateCardUserDocument, options);
}
export type CreateCardUserMutationHookResult = ReturnType<
  typeof useCreateCardUserMutation
>;
export type CreateCardUserMutationResult =
  Apollo.MutationResult<CreateCardUserMutation>;
export type CreateCardUserMutationOptions = Apollo.BaseMutationOptions<
  CreateCardUserMutation,
  CreateCardUserMutationVariables
>;
export const CreateChangeCardPasswordRequestDocument = gql`
  mutation CreateChangeCardPasswordRequest(
    $input: CreateCardPasswordChangeRequestInput!
  ) {
    createCardPasswordChangeRequest(input: $input) {
      reason
      payload
      createdAt
      active
      cardUserId
      type
      status
    }
  }
`;
export type CreateChangeCardPasswordRequestMutationFn = Apollo.MutationFunction<
  CreateChangeCardPasswordRequestMutation,
  CreateChangeCardPasswordRequestMutationVariables
>;

/**
 * __useCreateChangeCardPasswordRequestMutation__
 *
 * To run a mutation, you first call `useCreateChangeCardPasswordRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChangeCardPasswordRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChangeCardPasswordRequestMutation, { data, loading, error }] = useCreateChangeCardPasswordRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChangeCardPasswordRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChangeCardPasswordRequestMutation,
    CreateChangeCardPasswordRequestMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateChangeCardPasswordRequestMutation,
    CreateChangeCardPasswordRequestMutationVariables
  >(CreateChangeCardPasswordRequestDocument, options);
}
export type CreateChangeCardPasswordRequestMutationHookResult = ReturnType<
  typeof useCreateChangeCardPasswordRequestMutation
>;
export type CreateChangeCardPasswordRequestMutationResult =
  Apollo.MutationResult<CreateChangeCardPasswordRequestMutation>;
export type CreateChangeCardPasswordRequestMutationOptions =
  Apollo.BaseMutationOptions<
    CreateChangeCardPasswordRequestMutation,
    CreateChangeCardPasswordRequestMutationVariables
  >;
export const CreatePixRequestDocument = gql`
  mutation CreatePixRequest($input: CreatePixRequestInput!) {
    createPixRequest(input: $input) {
      reason
      payload
      createdAt
      active
      cardUserId
      type
      status
    }
  }
`;
export type CreatePixRequestMutationFn = Apollo.MutationFunction<
  CreatePixRequestMutation,
  CreatePixRequestMutationVariables
>;

/**
 * __useCreatePixRequestMutation__
 *
 * To run a mutation, you first call `useCreatePixRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePixRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPixRequestMutation, { data, loading, error }] = useCreatePixRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePixRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePixRequestMutation,
    CreatePixRequestMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePixRequestMutation,
    CreatePixRequestMutationVariables
  >(CreatePixRequestDocument, options);
}
export type CreatePixRequestMutationHookResult = ReturnType<
  typeof useCreatePixRequestMutation
>;
export type CreatePixRequestMutationResult =
  Apollo.MutationResult<CreatePixRequestMutation>;
export type CreatePixRequestMutationOptions = Apollo.BaseMutationOptions<
  CreatePixRequestMutation,
  CreatePixRequestMutationVariables
>;
export const CreateTedRequestDocument = gql`
  mutation CreateTedRequest($input: CreateTedRequestInput!) {
    createTedRequest(input: $input) {
      reason
      payload
      createdAt
      active
      cardUserId
      type
      status
    }
  }
`;
export type CreateTedRequestMutationFn = Apollo.MutationFunction<
  CreateTedRequestMutation,
  CreateTedRequestMutationVariables
>;

/**
 * __useCreateTedRequestMutation__
 *
 * To run a mutation, you first call `useCreateTedRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTedRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTedRequestMutation, { data, loading, error }] = useCreateTedRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTedRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTedRequestMutation,
    CreateTedRequestMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTedRequestMutation,
    CreateTedRequestMutationVariables
  >(CreateTedRequestDocument, options);
}
export type CreateTedRequestMutationHookResult = ReturnType<
  typeof useCreateTedRequestMutation
>;
export type CreateTedRequestMutationResult =
  Apollo.MutationResult<CreateTedRequestMutation>;
export type CreateTedRequestMutationOptions = Apollo.BaseMutationOptions<
  CreateTedRequestMutation,
  CreateTedRequestMutationVariables
>;
export const DeleteCardUserDocument = gql`
  mutation DeleteCardUser($input: DeleteCardUserInput!) {
    deleteCardUser(input: $input)
  }
`;
export type DeleteCardUserMutationFn = Apollo.MutationFunction<
  DeleteCardUserMutation,
  DeleteCardUserMutationVariables
>;

/**
 * __useDeleteCardUserMutation__
 *
 * To run a mutation, you first call `useDeleteCardUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCardUserMutation, { data, loading, error }] = useDeleteCardUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCardUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCardUserMutation,
    DeleteCardUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCardUserMutation,
    DeleteCardUserMutationVariables
  >(DeleteCardUserDocument, options);
}
export type DeleteCardUserMutationHookResult = ReturnType<
  typeof useDeleteCardUserMutation
>;
export type DeleteCardUserMutationResult =
  Apollo.MutationResult<DeleteCardUserMutation>;
export type DeleteCardUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteCardUserMutation,
  DeleteCardUserMutationVariables
>;
export const EditCardUserDocument = gql`
  mutation EditCardUser($input: CreateCardUserInput!) {
    editCardUser(input: $input) {
      newAccount
      name
      cardNumber
      balance
      active
      _id
    }
  }
`;
export type EditCardUserMutationFn = Apollo.MutationFunction<
  EditCardUserMutation,
  EditCardUserMutationVariables
>;

/**
 * __useEditCardUserMutation__
 *
 * To run a mutation, you first call `useEditCardUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCardUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCardUserMutation, { data, loading, error }] = useEditCardUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCardUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditCardUserMutation,
    EditCardUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EditCardUserMutation,
    EditCardUserMutationVariables
  >(EditCardUserDocument, options);
}
export type EditCardUserMutationHookResult = ReturnType<
  typeof useEditCardUserMutation
>;
export type EditCardUserMutationResult =
  Apollo.MutationResult<EditCardUserMutation>;
export type EditCardUserMutationOptions = Apollo.BaseMutationOptions<
  EditCardUserMutation,
  EditCardUserMutationVariables
>;
export const InjestTransactionsDocument = gql`
  mutation InjestTransactions($input: InjestTransactionsInput) {
    injestTransactions(input: $input) {
      description
      date
      createdAt
      amount
      _id
    }
  }
`;
export type InjestTransactionsMutationFn = Apollo.MutationFunction<
  InjestTransactionsMutation,
  InjestTransactionsMutationVariables
>;

/**
 * __useInjestTransactionsMutation__
 *
 * To run a mutation, you first call `useInjestTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInjestTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [injestTransactionsMutation, { data, loading, error }] = useInjestTransactionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInjestTransactionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InjestTransactionsMutation,
    InjestTransactionsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InjestTransactionsMutation,
    InjestTransactionsMutationVariables
  >(InjestTransactionsDocument, options);
}
export type InjestTransactionsMutationHookResult = ReturnType<
  typeof useInjestTransactionsMutation
>;
export type InjestTransactionsMutationResult =
  Apollo.MutationResult<InjestTransactionsMutation>;
export type InjestTransactionsMutationOptions = Apollo.BaseMutationOptions<
  InjestTransactionsMutation,
  InjestTransactionsMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      email
      name
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    options,
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyRequestsDocument = gql`
  query MyRequests($input: PaginationInput!) {
    myRequests(input: $input) {
      count
      data {
        _id
        reason
        payload
        createdAt
        active
        cardUserId
        type
        status
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

/**
 * __useMyRequestsQuery__
 *
 * To run a query within a React component, call `useMyRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRequestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyRequestsQuery(
  baseOptions: Apollo.QueryHookOptions<
    MyRequestsQuery,
    MyRequestsQueryVariables
  > &
    (
      | { variables: MyRequestsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyRequestsQuery, MyRequestsQueryVariables>(
    MyRequestsDocument,
    options,
  );
}
export function useMyRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyRequestsQuery,
    MyRequestsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyRequestsQuery, MyRequestsQueryVariables>(
    MyRequestsDocument,
    options,
  );
}
export function useMyRequestsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    MyRequestsQuery,
    MyRequestsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MyRequestsQuery, MyRequestsQueryVariables>(
    MyRequestsDocument,
    options,
  );
}
export type MyRequestsQueryHookResult = ReturnType<typeof useMyRequestsQuery>;
export type MyRequestsLazyQueryHookResult = ReturnType<
  typeof useMyRequestsLazyQuery
>;
export type MyRequestsSuspenseQueryHookResult = ReturnType<
  typeof useMyRequestsSuspenseQuery
>;
export type MyRequestsQueryResult = Apollo.QueryResult<
  MyRequestsQuery,
  MyRequestsQueryVariables
>;
export const SignInDocument = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        email
        id
        name
      }
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options,
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const TransactionsByCardUserIdDocument = gql`
  query TransactionsByCardUserId($cardUserId: ID!, $input: PaginationInput!) {
    transactionsByCardUserId(cardUserId: $cardUserId, input: $input) {
      count
      pageInfo {
        hasNextPage
      }
      data {
        _id
        amount
        createdAt
        description
        date
      }
    }
  }
`;

/**
 * __useTransactionsByCardUserIdQuery__
 *
 * To run a query within a React component, call `useTransactionsByCardUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsByCardUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsByCardUserIdQuery({
 *   variables: {
 *      cardUserId: // value for 'cardUserId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTransactionsByCardUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    TransactionsByCardUserIdQuery,
    TransactionsByCardUserIdQueryVariables
  > &
    (
      | { variables: TransactionsByCardUserIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    TransactionsByCardUserIdQuery,
    TransactionsByCardUserIdQueryVariables
  >(TransactionsByCardUserIdDocument, options);
}
export function useTransactionsByCardUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TransactionsByCardUserIdQuery,
    TransactionsByCardUserIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TransactionsByCardUserIdQuery,
    TransactionsByCardUserIdQueryVariables
  >(TransactionsByCardUserIdDocument, options);
}
export function useTransactionsByCardUserIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    TransactionsByCardUserIdQuery,
    TransactionsByCardUserIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    TransactionsByCardUserIdQuery,
    TransactionsByCardUserIdQueryVariables
  >(TransactionsByCardUserIdDocument, options);
}
export type TransactionsByCardUserIdQueryHookResult = ReturnType<
  typeof useTransactionsByCardUserIdQuery
>;
export type TransactionsByCardUserIdLazyQueryHookResult = ReturnType<
  typeof useTransactionsByCardUserIdLazyQuery
>;
export type TransactionsByCardUserIdSuspenseQueryHookResult = ReturnType<
  typeof useTransactionsByCardUserIdSuspenseQuery
>;
export type TransactionsByCardUserIdQueryResult = Apollo.QueryResult<
  TransactionsByCardUserIdQuery,
  TransactionsByCardUserIdQueryVariables
>;
