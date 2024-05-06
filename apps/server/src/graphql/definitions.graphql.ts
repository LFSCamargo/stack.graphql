import gql from "graphql-tag";

export default gql`
  scalar JSON

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  input PaginationInput {
    offset: Int
    limit: Int
    search: String
  }
`;
