const { GraphQLScalarType } = require('graphql');
const Companies = require('./db/models/company');

const scalar = (name) => new GraphQLScalarType({
  name: name,
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: ({ value }) => value
});

module.exports = {
  Date: scalar('Date'),
  DateTime: scalar('DateTime'),
  DateTimeTimeZone: scalar('DateTimeTimeZone'),
  PhoneNumber: scalar('PhoneNumber'),
  Email: scalar('Email'),
  JSON: scalar('JSON'),
  Query: {
    companies: () => {
      return Companies.findAll();
    }
  }
};
