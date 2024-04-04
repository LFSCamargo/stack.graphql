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
