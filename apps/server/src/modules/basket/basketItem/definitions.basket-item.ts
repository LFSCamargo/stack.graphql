import { gql } from "graphql-tag";

export interface CreateBasketItemInput {
  name: string;
  description: string;
}

export const BasketItemDefinitions = gql`
  # Input types
  input CreateBasketItemInput {
    name: String!
    description: String!
  }

  input DeleteBasketItemInput {
    id: String!
  }

  # Output types
  type BasketItem {
    id: ID!
    name: String!
    description: String!
  }

  type DeleteBasketItemResponse {
    id: ID!
    deleted: Boolean!
  }

  type Query {
    listBasketItems: [BasketItem!]!
    findBasketItemById(id: String!): BasketItem
  }

  type Mutation {
    createBasketItem(input: CreateBasketItemInput!): BasketItem!
    removeBasketItemById(id: String!): DeleteBasketItemResponse!
  }
`;
