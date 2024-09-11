import { gql } from "graphql-tag";

export const CustomerDefinitions = gql`
  type Customer {
    name: String!
    cpfCnpj: String!
    email: String!
    asaasId: String!
    phone: String
    mobilePhone: String
    address: String
    addressNumber: String
    complement: String
    province: String
    postalCode: String
    externalReference: String
    notificationDisabled: Boolean
    municipalInscription: String
    stateInscription: String
    observations: String
    groupName: String
    company: String
    createdAt: String!
  }

  input CreateCustomerInput {
    name: String!
    cpfCnpj: String!
    email: String
    phone: String
    mobilePhone: String
    address: String
    addressNumber: String
    complement: String
    province: String
    postalCode: String
    externalReference: String
    notificationDisabled: Boolean
    municipalInscription: String
    stateInscription: String
    observations: String
    groupName: String
    company: String
  }

  input UpdateCustomerInput {
    name: String
    cpfCnpj: String
    email: String
    asaasId: String
    phone: String
    mobilePhone: String
    address: String
    addressNumber: String
    complement: String
    province: String
    postalCode: String
    externalReference: String
    notificationDisabled: Boolean
    municipalInscription: String
    stateInscription: String
    observations: String
    groupName: String
    company: String
  }

  input ListAsaasCustomersInput {
    name: String
    email: String
    cpfCnpj: String
    groupName: String
    externalReference: String
    offset: Int
    limit: Int
  }

  type AsaasCustomer {
    id: String!
    dateCreated: String!
    name: String!
    email: String!
    cpfCnpj: String!
    phone: String
    mobilePhone: String
    address: String
    addressNumber: String
    complement: String
    province: String
    postalCode: String
    city: Int
    cityName: String
    deleted: Boolean
    externalReference: String
    notificationDisabled: Boolean
    groups: [Group]
  }

  type Group {
    name: String!
  }

  type AsaasCustomerPagination {
    hasMore: Boolean!
    totalCount: Int!
    limit: Int!
    offset: Int!
    data: [AsaasCustomer!]!
  }

  input DeleteCustomerInput {
    id: String!
  }
  # Output types
  type Customer {
    _id: ID!
    name: String!
    cpfCnpj: String!
    email: String!
    asaasId: String!
    phone: String!
    mobilePhone: String!
    address: String!
    addressNumber: String!
    complement: String
    province: String!
    postalCode: String!
    externalReference: String
    notificationDisabled: Boolean
    municipalInscription: String
    stateInscription: String
    observations: String
    groupName: String
    company: String
    createdAt: String!
  }

  type CustomerAuthPayload {
    token: String!
    Customer: Customer!
  }

  input MessageOutput {
    message: String!
  }

  type CustomersOutput {
    count: Int!
    data: [Customer!]!
    pageInfo: PageInfo!
  }

  type CustomerPagination {
    count: Int!
    data: [Customer!]!
    pageInfo: PageInfo!
  }

  type MessageOutput {
    message: String!
  }
  # GraphQL Main Types
  type Query {
    getCustomerById(id: String!): Customer
    getCustomer: Customer
    listCustomers(input: PaginationInput!): CustomerPagination
    listAsaasCustomers(input: ListAsaasCustomersInput!): AsaasCustomerPagination!
    getAsaasCustomerById(id: String!): AsaasCustomer!
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer!
    deleteCustomer(id: String!): Boolean!
    updateCustomer(id: String!, input: UpdateCustomerInput!): Customer!
  }
`;
