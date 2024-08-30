import { gql } from "graphql-tag";

export const BasketDefinitions = gql`
  # Input types
  input CreateBasketInput {
    name: String!
    items: [BasketItemInput!]!
    basketValue: Float!
  }

  input BasketItemInput {
    id: ID!
  }

  input UpdateBasketInput {
    name: String!
    items: [BasketItemInput!]!
    basketValue: Float!
  }

  input DeleteBasketInput {
    id: ID!
  }

  # Output types
  type BasketItem {
    id: ID!
    name: String!
    description: String!
  }

  type Basket {
    id: ID!
    name: String!
    items: [BasketItem!]!
    basketValue: Float!
  }

  type DeleteBasketResponse {
    id: ID!
    deleted: Boolean!
  }

  type Query {
    listBaskets: [Basket!]!
    findBasketById(id: ID!): Basket
  }

  type Mutation {
    createBasket(input: CreateBasketInput!): Basket!
    updateBasket(id: ID!, input: UpdateBasketInput!): Basket!
    removeBasketById(id: ID!): DeleteBasketResponse!
  }
`;
