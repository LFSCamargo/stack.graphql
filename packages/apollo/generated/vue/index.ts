import gql from "graphql-tag";
import * as VueApolloComposable from "@vue/apollo-composable";
import * as VueCompositionApi from "vue";
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
export type ReactiveFunction<TParam> = () => TParam;
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
 * To run a query within a Vue component, call `useCardUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCardUserQuery();
 */
export function useCardUserQuery(
  options:
    | VueApolloComposable.UseQueryOptions<CardUserQuery, CardUserQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          CardUserQuery,
          CardUserQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          CardUserQuery,
          CardUserQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<CardUserQuery, CardUserQueryVariables>(
    CardUserDocument,
    {},
    options,
  );
}
export function useCardUserLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<CardUserQuery, CardUserQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          CardUserQuery,
          CardUserQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          CardUserQuery,
          CardUserQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    CardUserQuery,
    CardUserQueryVariables
  >(CardUserDocument, {}, options);
}
export type CardUserQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<CardUserQuery, CardUserQueryVariables>;
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
 * To run a query within a Vue component, call `useCardUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardUserByIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCardUserByIdQuery({
 *   cardUserByIdId: // value for 'cardUserByIdId'
 * });
 */
export function useCardUserByIdQuery(
  variables:
    | CardUserByIdQueryVariables
    | VueCompositionApi.Ref<CardUserByIdQueryVariables>
    | ReactiveFunction<CardUserByIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        CardUserByIdQuery,
        CardUserByIdQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          CardUserByIdQuery,
          CardUserByIdQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          CardUserByIdQuery,
          CardUserByIdQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    CardUserByIdQuery,
    CardUserByIdQueryVariables
  >(CardUserByIdDocument, variables, options);
}
export function useCardUserByIdLazyQuery(
  variables?:
    | CardUserByIdQueryVariables
    | VueCompositionApi.Ref<CardUserByIdQueryVariables>
    | ReactiveFunction<CardUserByIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        CardUserByIdQuery,
        CardUserByIdQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          CardUserByIdQuery,
          CardUserByIdQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          CardUserByIdQuery,
          CardUserByIdQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    CardUserByIdQuery,
    CardUserByIdQueryVariables
  >(CardUserByIdDocument, variables, options);
}
export type CardUserByIdQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    CardUserByIdQuery,
    CardUserByIdQueryVariables
  >;
export const ChangeCardUserPasswordDocument = gql`
  mutation ChangeCardUserPassword($input: ChangeCardUserPassword!) {
    changeCardUserPassword(input: $input)
  }
`;

/**
 * __useChangeCardUserPasswordMutation__
 *
 * To run a mutation, you first call `useChangeCardUserPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useChangeCardUserPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useChangeCardUserPasswordMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useChangeCardUserPasswordMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        ChangeCardUserPasswordMutation,
        ChangeCardUserPasswordMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          ChangeCardUserPasswordMutation,
          ChangeCardUserPasswordMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    ChangeCardUserPasswordMutation,
    ChangeCardUserPasswordMutationVariables
  >(ChangeCardUserPasswordDocument, options);
}
export type ChangeCardUserPasswordMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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

/**
 * __useCardUserSignInMutation__
 *
 * To run a mutation, you first call `useCardUserSignInMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCardUserSignInMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCardUserSignInMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCardUserSignInMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        CardUserSignInMutation,
        CardUserSignInMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          CardUserSignInMutation,
          CardUserSignInMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    CardUserSignInMutation,
    CardUserSignInMutationVariables
  >(CardUserSignInDocument, options);
}
export type CardUserSignInMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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
 * To run a query within a Vue component, call `useCardUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCardUsersQuery({
 *   input: // value for 'input'
 * });
 */
export function useCardUsersQuery(
  variables:
    | CardUsersQueryVariables
    | VueCompositionApi.Ref<CardUsersQueryVariables>
    | ReactiveFunction<CardUsersQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        CardUsersQuery,
        CardUsersQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          CardUsersQuery,
          CardUsersQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          CardUsersQuery,
          CardUsersQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<CardUsersQuery, CardUsersQueryVariables>(
    CardUsersDocument,
    variables,
    options,
  );
}
export function useCardUsersLazyQuery(
  variables?:
    | CardUsersQueryVariables
    | VueCompositionApi.Ref<CardUsersQueryVariables>
    | ReactiveFunction<CardUsersQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        CardUsersQuery,
        CardUsersQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          CardUsersQuery,
          CardUsersQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          CardUsersQuery,
          CardUsersQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    CardUsersQuery,
    CardUsersQueryVariables
  >(CardUsersDocument, variables, options);
}
export type CardUsersQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<CardUsersQuery, CardUsersQueryVariables>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useChangePasswordMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          ChangePasswordMutation,
          ChangePasswordMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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

/**
 * __useCreateCardUserMutation__
 *
 * To run a mutation, you first call `useCreateCardUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateCardUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateCardUserMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        CreateCardUserMutation,
        CreateCardUserMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          CreateCardUserMutation,
          CreateCardUserMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    CreateCardUserMutation,
    CreateCardUserMutationVariables
  >(CreateCardUserDocument, options);
}
export type CreateCardUserMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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

/**
 * __useCreateChangeCardPasswordRequestMutation__
 *
 * To run a mutation, you first call `useCreateChangeCardPasswordRequestMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateChangeCardPasswordRequestMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateChangeCardPasswordRequestMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateChangeCardPasswordRequestMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        CreateChangeCardPasswordRequestMutation,
        CreateChangeCardPasswordRequestMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          CreateChangeCardPasswordRequestMutation,
          CreateChangeCardPasswordRequestMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    CreateChangeCardPasswordRequestMutation,
    CreateChangeCardPasswordRequestMutationVariables
  >(CreateChangeCardPasswordRequestDocument, options);
}
export type CreateChangeCardPasswordRequestMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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

/**
 * __useCreatePixRequestMutation__
 *
 * To run a mutation, you first call `useCreatePixRequestMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreatePixRequestMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreatePixRequestMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreatePixRequestMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        CreatePixRequestMutation,
        CreatePixRequestMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          CreatePixRequestMutation,
          CreatePixRequestMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    CreatePixRequestMutation,
    CreatePixRequestMutationVariables
  >(CreatePixRequestDocument, options);
}
export type CreatePixRequestMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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

/**
 * __useCreateTedRequestMutation__
 *
 * To run a mutation, you first call `useCreateTedRequestMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateTedRequestMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateTedRequestMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateTedRequestMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        CreateTedRequestMutation,
        CreateTedRequestMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          CreateTedRequestMutation,
          CreateTedRequestMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    CreateTedRequestMutation,
    CreateTedRequestMutationVariables
  >(CreateTedRequestDocument, options);
}
export type CreateTedRequestMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    CreateTedRequestMutation,
    CreateTedRequestMutationVariables
  >;
export const DeleteCardUserDocument = gql`
  mutation DeleteCardUser($input: DeleteCardUserInput!) {
    deleteCardUser(input: $input)
  }
`;

/**
 * __useDeleteCardUserMutation__
 *
 * To run a mutation, you first call `useDeleteCardUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteCardUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCardUserMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteCardUserMutation,
        DeleteCardUserMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteCardUserMutation,
          DeleteCardUserMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    DeleteCardUserMutation,
    DeleteCardUserMutationVariables
  >(DeleteCardUserDocument, options);
}
export type DeleteCardUserMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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

/**
 * __useEditCardUserMutation__
 *
 * To run a mutation, you first call `useEditCardUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useEditCardUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useEditCardUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useEditCardUserMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        EditCardUserMutation,
        EditCardUserMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          EditCardUserMutation,
          EditCardUserMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    EditCardUserMutation,
    EditCardUserMutationVariables
  >(EditCardUserDocument, options);
}
export type EditCardUserMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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

/**
 * __useInjestTransactionsMutation__
 *
 * To run a mutation, you first call `useInjestTransactionsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useInjestTransactionsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useInjestTransactionsMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useInjestTransactionsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        InjestTransactionsMutation,
        InjestTransactionsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          InjestTransactionsMutation,
          InjestTransactionsMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    InjestTransactionsMutation,
    InjestTransactionsMutationVariables
  >(InjestTransactionsDocument, options);
}
export type InjestTransactionsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    {},
    options,
  );
}
export function useMeLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    {},
    options,
  );
}
export type MeQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
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
 * To run a query within a Vue component, call `useMyRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRequestsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMyRequestsQuery({
 *   input: // value for 'input'
 * });
 */
export function useMyRequestsQuery(
  variables:
    | MyRequestsQueryVariables
    | VueCompositionApi.Ref<MyRequestsQueryVariables>
    | ReactiveFunction<MyRequestsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        MyRequestsQuery,
        MyRequestsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MyRequestsQuery,
          MyRequestsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MyRequestsQuery,
          MyRequestsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    MyRequestsQuery,
    MyRequestsQueryVariables
  >(MyRequestsDocument, variables, options);
}
export function useMyRequestsLazyQuery(
  variables?:
    | MyRequestsQueryVariables
    | VueCompositionApi.Ref<MyRequestsQueryVariables>
    | ReactiveFunction<MyRequestsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        MyRequestsQuery,
        MyRequestsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          MyRequestsQuery,
          MyRequestsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          MyRequestsQuery,
          MyRequestsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    MyRequestsQuery,
    MyRequestsQueryVariables
  >(MyRequestsDocument, variables, options);
}
export type MyRequestsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<MyRequestsQuery, MyRequestsQueryVariables>;
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

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignInMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SignInMutation,
        SignInMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SignInMutation,
          SignInMutationVariables
        >
      > = {},
) {
  return VueApolloComposable.useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SignInDocument, options);
}
export type SignInMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
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
 * To run a query within a Vue component, call `useTransactionsByCardUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsByCardUserIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTransactionsByCardUserIdQuery({
 *   cardUserId: // value for 'cardUserId'
 *   input: // value for 'input'
 * });
 */
export function useTransactionsByCardUserIdQuery(
  variables:
    | TransactionsByCardUserIdQueryVariables
    | VueCompositionApi.Ref<TransactionsByCardUserIdQueryVariables>
    | ReactiveFunction<TransactionsByCardUserIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        TransactionsByCardUserIdQuery,
        TransactionsByCardUserIdQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          TransactionsByCardUserIdQuery,
          TransactionsByCardUserIdQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          TransactionsByCardUserIdQuery,
          TransactionsByCardUserIdQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    TransactionsByCardUserIdQuery,
    TransactionsByCardUserIdQueryVariables
  >(TransactionsByCardUserIdDocument, variables, options);
}
export function useTransactionsByCardUserIdLazyQuery(
  variables?:
    | TransactionsByCardUserIdQueryVariables
    | VueCompositionApi.Ref<TransactionsByCardUserIdQueryVariables>
    | ReactiveFunction<TransactionsByCardUserIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        TransactionsByCardUserIdQuery,
        TransactionsByCardUserIdQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          TransactionsByCardUserIdQuery,
          TransactionsByCardUserIdQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          TransactionsByCardUserIdQuery,
          TransactionsByCardUserIdQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useLazyQuery<
    TransactionsByCardUserIdQuery,
    TransactionsByCardUserIdQueryVariables
  >(TransactionsByCardUserIdDocument, variables, options);
}
export type TransactionsByCardUserIdQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    TransactionsByCardUserIdQuery,
    TransactionsByCardUserIdQueryVariables
  >;
