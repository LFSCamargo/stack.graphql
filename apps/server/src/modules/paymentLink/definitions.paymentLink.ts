import { gql } from "graphql-tag";

export const PaymentLinkDefinitions = gql`
  # Enums
  enum BillingType {
    UNDEFINED
    BOLETO
    CREDIT_CARD
    PIX
  }

  enum ChargeType {
    DETACHED
    RECURRENT
    INSTALLMENT
  }

  enum SubscriptionCycle {
    WEEKLY
    BIWEEKLY
    MONTHLY
    QUARTERLY
    SEMIANNUALLY
    YEARLY
  }

  # Input types
  input CreatePaymentLinkInput {
    name: String!
    description: String
    endDate: String
    value: Float
    billingType: BillingType!
    chargeType: ChargeType!
    dueDateLimitDays: Int
    subscriptionCycle: SubscriptionCycle
    maxInstallmentCount: Int
    notificationEnabled: Boolean
    callback: CallbackInput!
  }

  input CallbackInput {
    successUrl: String!
    autoRedirect: Boolean
  }

  input ListPaymentLinksQueryParams {
    active: String
    includeDeleted: String
    name: String
    offset: Int
    limit: Int
  }

  # Output types
  type PaymentLink {
    id: ID!
    name: String!
    value: Float!
    active: Boolean!
    userId: ID!
    intendedUserId: ID
    chargeType: ChargeType!
    url: String!
    billingType: BillingType!
    subscriptionCycle: SubscriptionCycle
    description: String
    endDate: String
    deleted: Boolean!
    viewCount: Int!
    maxInstallmentCount: Int!
    dueDateLimitDays: Int
    notificationEnabled: Boolean!
  }

  type Query {
    getPaymentLinksByUser(userId: ID!): [PaymentLink!]!
    listPaymentLinks(queryParams: ListPaymentLinksQueryParams!): [PaymentLink!]!
  }

  type Mutation {
    createPaymentLink(input: CreatePaymentLinkInput!): PaymentLink!
    createPaymentLinkForUser(input: CreatePaymentLinkInput!, intendedUserId: ID!): PaymentLink!
  }
`;