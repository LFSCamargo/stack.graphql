/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICardUserSchema, IUserSchema } from "../models";

type Resolver = (
  parent: any,
  args: any,
  context: GraphQLContext,
  info: any,
) => Promise<any> | any;

interface IResolver extends Record<string, Resolver> {}

export type GraphQLPaginationInput = {
  limit?: number;
  offset?: number;
  search?: string;
};

export type TResolvers = {
  Query?: IResolver;
  Mutation?: IResolver;
  Subscription?: IResolver;
} & Record<string, IResolver>;

export type GraphQLInput<T> = {
  input: T;
};

export type GraphQLContext = {
  user: IUserSchema | null;
  creditUser: ICardUserSchema | null;
};
