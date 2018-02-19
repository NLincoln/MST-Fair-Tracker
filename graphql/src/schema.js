/**
 * The date* scalars will eventually have code that turns them into moment objects. For now, they're just hanging schemas
 *
 * The PhoneNumber and Email types are really just strings, but putting a label on them gives them **meaning**
 */

// language=GraphQL Schema
const gql = require("graphql-tag");

const schema = gql`
  scalar Date

  scalar DateTime

  scalar DateTimeTimeZone

  scalar PhoneNumber

  scalar Email

  scalar JSON

  type Query {
    companies: [Company]
    company(id: ID!): Company
  }

  input CommentInput {
    text: String!
  }

  type Mutation {
    likeCompany(id: ID!): Company
    dislikeCompany(id: ID!): Company
    favoriteCompany(id: ID!): Company

    createComment(company: ID!, comment: CommentInput!): CompanyComment
  }
`;
module.exports = schema;
