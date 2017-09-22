module.exports = {
  // language=GraphQL Schema
  model: `
  type Company {
    id: ID!
    company_name: String!
    description: String
    city: String

    is_liked: Boolean!
    is_disliked: Boolean!
    is_favorited: Boolean!

  }
  `,

  resolver: {
  }
};
