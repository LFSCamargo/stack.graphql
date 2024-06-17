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
    balanceUpdated: Float!
    description: String!
    date: String!
  }

  input InjestTransactionsInput {
    cardUserId: ID!
    transactions: [TransactionInput!]!
  }

  type TransactionsOutput {
    count: Int!
    data: [Transaction!]!
    pageInfo: PageInfo!
  }

  type Query {
    cardUserTransactions(input: PaginationInput!): TransactionsOutput!
    transactionsByCardUserId(
      cardUserId: ID!
      input: PaginationInput!
    ): TransactionsOutput!
    transactionsByCardNumber(
      cardNumber: String!
      input: PaginationInput!
    ): TransactionsOutput!
    allTransactions(input: PaginationInput!): TransactionsOutput!
  }

  type Mutation {
    # Only Admin can call this mutation =>> injest transactions into the database for card users
    injestTransactions(input: InjestTransactionsInput): [Transaction]!
    deleteTransaction(_id: ID!): MessageOutput!
    # Only Admin can call this mutation =>> clear all old 12 months transactions from the database
    clearTransactions: [Transaction]!
  }
`;
