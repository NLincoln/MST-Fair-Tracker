const { GraphQLScalarType } = require("graphql");

const scalar = name =>
  new GraphQLScalarType({
    name: name,
    serialize: value => value,
    parseValue: value => value,
    parseLiteral: ({ value }) => value
  });

module.exports = {
  Date: scalar("Date"),
  DateTime: scalar("DateTime"),
  DateTimeTimeZone: scalar("DateTimeTimeZone"),
  PhoneNumber: scalar("PhoneNumber"),
  Email: scalar("Email"),
  JSON: scalar("JSON"),
  Query: {
    companies: (parent, args, { db }) => {
      return db.Company.findAll();
    },
    company: (obj, { id }, { db }) => db.Company.findById(id)
  },

  Mutation: {
    async likeCompany(obj, { id }, { db }) {
      const company = await db.Company.findById(id);
      company.is_liked = !company.is_liked;
      company.is_favorited = false;
      company.is_disliked = false;
      return company.save();
    },
    async dislikeCompany(obj, { id }, { db }) {
      const company = await db.Company.findById(id);
      company.is_liked = false;
      company.is_favorited = false;
      company.is_disliked = !company.is_disliked;
      return company.save();
    },
    async favoriteCompany(obj, { id }, { db }) {
      const company = await db.Company.findById(id);
      company.is_liked = false;
      company.is_favorited = !company.is_favorited;
      company.is_disliked = false;
      return company.save();
    },

    async createComment(obj, vars, { db }) {
      const comment = await db.Comment.create({
        company: vars.company,
        text: vars.comment.text
      });
      return comment.get({
        plain: true
      });
    }
  }
};
