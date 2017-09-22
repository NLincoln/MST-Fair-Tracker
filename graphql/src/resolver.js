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
  },

  Mutation: {
    async likeCompany(obj, { id }) {
      const company = await Companies.findById(id);
      company.is_liked = !company.is_liked;
      company.is_favorited = false;
      company.is_disliked = false;
      return company.save();
    },
    async dislikeCompany(obj, { id }) {
      const company = await Companies.findById(id);
      company.is_liked = false;
      company.is_favorited = false;
      company.is_disliked = !company.is_disliked;
      return company.save();
    },
    async favoriteCompany(obj, { id }) {
      const company = await Companies.findById(id);
      company.is_liked = false;
      company.is_favorited = !company.is_favorited;
      company.is_disliked = false;
      return company.save();
    }
    
  }
};
