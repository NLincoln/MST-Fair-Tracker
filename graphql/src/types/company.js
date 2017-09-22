module.exports = {
  // language=GraphQL Schema
  model: `
  type Company {
    id: ID!
    company_name: String!
    description: String
    city: String
  }
  `,

  resolver: {
  }
};
