const gql = require("graphql-tag");

module.exports = {
  // language=GraphQL Schema
  model: gql`
    type CompanyComment {
      id: ID!
      text: String!
    }

    type Company {
      id: ID!
      company_name: String!
      description: String
      city: String

      is_liked: Boolean!
      is_disliked: Boolean!
      is_favorited: Boolean!

      comments: [CompanyComment]
    }
  `,

  resolver: {
    Company: {
      comments(company, params, { db }) {
        return db.Comment.findAll({
          where: {
            company: company.id
          }
        });
      }
    }
  }
};
