import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type CardAuthPayload = {
  __typename?: 'CardAuthPayload';
  cardUser: CardUser;
  token: Scalars['String']['output'];
};

export type CardSignInInput = {
  cardNumber: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CardUser = {
  __typename?: 'CardUser';
  balance?: Maybe<Scalars['String']['output']>;
  cardNumber: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ChangeCardUserPassword = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type Health = {
  __typename?: 'Health';
  status: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeCardUserPassword?: Maybe<Scalars['Boolean']['output']>;
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
  __typename?: 'Query';
  cardUser?: Maybe<CardUser>;
  health: Health;
  me?: Maybe<User>;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CardUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CardUserQuery = { __typename?: 'Query', cardUser?: { __typename?: 'CardUser', cardNumber: string, name: string, id: string, balance?: string | null } | null };

export type ChangeCardUserPasswordMutationVariables = Exact<{
  input: ChangeCardUserPassword;
}>;


export type ChangeCardUserPasswordMutation = { __typename?: 'Mutation', changeCardUserPassword?: boolean | null };

export type CardUserSignInMutationVariables = Exact<{
  input: CardSignInInput;
}>;


export type CardUserSignInMutation = { __typename?: 'Mutation', signInCardUser?: { __typename?: 'CardAuthPayload', token: string, cardUser: { __typename?: 'CardUser', cardNumber: string, id: string, name: string } } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, name: string } | null };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', email: string, id: string, name: string } } | null };


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
export function useCardUserQuery(baseOptions?: Apollo.QueryHookOptions<CardUserQuery, CardUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardUserQuery, CardUserQueryVariables>(CardUserDocument, options);
      }
export function useCardUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardUserQuery, CardUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardUserQuery, CardUserQueryVariables>(CardUserDocument, options);
        }
export function useCardUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CardUserQuery, CardUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CardUserQuery, CardUserQueryVariables>(CardUserDocument, options);
        }
export type CardUserQueryHookResult = ReturnType<typeof useCardUserQuery>;
export type CardUserLazyQueryHookResult = ReturnType<typeof useCardUserLazyQuery>;
export type CardUserSuspenseQueryHookResult = ReturnType<typeof useCardUserSuspenseQuery>;
export type CardUserQueryResult = Apollo.QueryResult<CardUserQuery, CardUserQueryVariables>;
export const ChangeCardUserPasswordDocument = gql`
    mutation ChangeCardUserPassword($input: ChangeCardUserPassword!) {
  changeCardUserPassword(input: $input)
}
    `;
export type ChangeCardUserPasswordMutationFn = Apollo.MutationFunction<ChangeCardUserPasswordMutation, ChangeCardUserPasswordMutationVariables>;

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
export function useChangeCardUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeCardUserPasswordMutation, ChangeCardUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeCardUserPasswordMutation, ChangeCardUserPasswordMutationVariables>(ChangeCardUserPasswordDocument, options);
      }
export type ChangeCardUserPasswordMutationHookResult = ReturnType<typeof useChangeCardUserPasswordMutation>;
export type ChangeCardUserPasswordMutationResult = Apollo.MutationResult<ChangeCardUserPasswordMutation>;
export type ChangeCardUserPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeCardUserPasswordMutation, ChangeCardUserPasswordMutationVariables>;
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
export type CardUserSignInMutationFn = Apollo.MutationFunction<CardUserSignInMutation, CardUserSignInMutationVariables>;

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
export function useCardUserSignInMutation(baseOptions?: Apollo.MutationHookOptions<CardUserSignInMutation, CardUserSignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CardUserSignInMutation, CardUserSignInMutationVariables>(CardUserSignInDocument, options);
      }
export type CardUserSignInMutationHookResult = ReturnType<typeof useCardUserSignInMutation>;
export type CardUserSignInMutationResult = Apollo.MutationResult<CardUserSignInMutation>;
export type CardUserSignInMutationOptions = Apollo.BaseMutationOptions<CardUserSignInMutation, CardUserSignInMutationVariables>;
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
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
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

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
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;