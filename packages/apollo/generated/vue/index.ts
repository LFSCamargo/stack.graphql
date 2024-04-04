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
  balance?: Maybe<Scalars["String"]["output"]>;
  cardNumber: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type ChangeCardUserPassword = {
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type Health = {
  __typename?: "Health";
  status: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  changeCardUserPassword?: Maybe<Scalars["Boolean"]["output"]>;
  signIn?: Maybe<AuthPayload>;
  signInCardUser?: Maybe<CardAuthPayload>;
};

export type MutationChangeCardUserPasswordArgs = {
  input: ChangeCardUserPassword;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSignInCardUserArgs = {
  input: CardSignInInput;
};

export type Query = {
  __typename?: "Query";
  cardUser?: Maybe<CardUser>;
  health: Health;
  me?: Maybe<User>;
};

export type SignInInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
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
    id: string;
    balance?: string | null;
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
      id: string;
      name: string;
    };
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: { __typename?: "User"; email: string; name: string } | null;
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

export const CardUserDocument = gql`
  query CardUser {
    cardUser {
      cardNumber
      name
      id
      balance
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
        id
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
