import gql from "graphql-tag";

export const TransactionsDefinitions = gql`
  type Transaction {
    _id: ID!
    amount: Float!
    description: String!
    date: String!
    createdAt: String!
  }

  input TransactionInput {
    amount: Float!
    description: String!
    date: String!
  }

  input InjestTransactionsInput {
    cardUserId: ID!
    transactions: [TransactionInput!]!
  }

  type Query {
    cardUserTransactions: [Transaction!]!

    transactionsByCardUserId(cardUserId: ID!): [Transaction!]!
    allTransactions: [Transaction!]!
  }

  type Mutation {
    # Only Admin can call this mutation =>> injest transactions into the database for card users
    injestTransactions(input: InjestTransactionsInput): [Transaction]!
    # Only Admin can call this mutation =>> clear all old 12 months transactions from the database
    clearTransactions: [Transaction]!
  }
`;
