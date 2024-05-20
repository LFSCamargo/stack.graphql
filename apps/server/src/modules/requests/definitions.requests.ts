import gql from "graphql-tag";

export const RequestsDefinitions = gql`
  enum RequestType {
    CARD_PASSWORD_CHANGE
    WITHDRAWAL
  }

  enum RequestStatus {
    PENDING
    APPROVED
    REJECTED
    CANCELED
  }

  type IRequest {
    _id: ID!
    type: RequestType!
    cardUserId: ID!
    status: RequestStatus!
    reason: String
    active: Boolean!
    createdAt: String!
    payload: JSON!
  }

  type RequestsOutput {
    count: Int!
    data: [IRequest!]!
    pageInfo: PageInfo!
  }

  input CreatePixRequestInput {
    cpf: String!
    name: String!
    pixKey: String!
    ammount: Float!
  }

  input CreateTedRequestInput {
    cpf: String!
    name: String!
    bankCode: String!
    agency: String!
    accountDigit: String!
    ammount: Float!
  }

  input CreateCardPasswordChangeRequestInput {
    oldCardPassword: String!
    newCardPassword: String!
  }

  type Query {
    request(id: ID!): IRequest
    requests(
      input: PaginationInput!
      status: RequestStatus
      type: RequestType
    ): RequestsOutput!
    myRequests(input: PaginationInput!): RequestsOutput!
  }

  type Mutation {
    createPixRequest(input: CreatePixRequestInput!): IRequest!
    createTedRequest(input: CreateTedRequestInput!): IRequest!
    createCardPasswordChangeRequest(
      input: CreateCardPasswordChangeRequestInput!
    ): IRequest!

    cancelRequest(id: ID!): IRequest!
    approveRequest(id: ID!): IRequest!
    rejectRequest(id: ID!): IRequest!
  }
`;
