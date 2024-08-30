import { gql } from "graphql-tag";

export const ClientDefinitions = gql`
  type Client {
    _id: ID!
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

  input CreateClientInput {
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

  input UpdateClientInput {
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

  input ListAsaasClientsInput {
    name: String
    email: String
    cpfCnpj: String
    groupName: String
    externalReference: String
    offset: Int
    limit: Int
  }

  type AsaasClient {
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

  type AsaasClientPagination {
    hasMore: Boolean!
    totalCount: Int!
    limit: Int!
    offset: Int!
    data: [AsaasClient!]!
  }

  input DeleteClientInput {
    id: String!
  }
  # Output types
  type Client {
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

  type ClientAuthPayload {
    token: String!
    client: Client!
  }

  input MessageOutput {
    message: String!
  }

  type ClientsOutput {
    count: Int!
    data: [Client!]!
    pageInfo: PageInfo!
  }

  type ClientPagination {
    count: Int!
    data: [Client!]!
    pageInfo: PageInfo!
  }

  type MessageOutput {
    message: String!
  }
  # GraphQL Main Types
  type Query {
    getClientById(id: String!): Client
    getClient: Client
    listClients(input: PaginationInput!): ClientPagination
    listAsaasClients(input: ListAsaasClientsInput!): AsaasClientPagination!
    getAsaasClientById(id: String!): AsaasClient!
  }

  type Mutation {
    createClient(input: CreateClientInput!): Client!
    deleteClient(id: String!): Boolean!
    updateClient(id: String!, input: UpdateClientInput!): Client!
  }
`;
