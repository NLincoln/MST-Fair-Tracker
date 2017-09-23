const Comments = require('../db/models/company/comments');

module.exports = {
  // language=GraphQL Schema
  model: `
  type CompanyComments {
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

    comments: [CompanyComments]
  }
  `,

  resolver: {
    Company: {
      comments(company) {
        return Comments.findAll({
          where: {
            company: company.id
          }
        })
      }
    }
  }
};
