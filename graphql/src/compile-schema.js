const Promise = require('bluebird');
const schema = require('./schema');
const resolverMap = require('./resolver');
const types = require('./types');

const by = (key) => (value) => value[key];

const filterMap = (key) => types.filter(by(key)).map(by(key));
const authorizors = filterMap('authorizor');
const resolvers = filterMap('resolver');
const models = filterMap('model');

const resolver = Object.assign({}, resolverMap, ...resolvers);

/**
 * TODO :: this is incomplete, need to monkey-patch resolvers.
 * TODO :: We need to patch the actual AST generated from makeExecutableSchema
 */

const {
  makeExecutableSchema
} = require('graphql-tools');


const compileSchema = () => makeExecutableSchema({
  typeDefs: [schema, ...models],
  resolvers: resolver
});

module.exports = compileSchema;
