var { buildSchema } = require('graphql');
var { GraphQLDateTime } = require('graphql-iso-date');
const models = require('../db');
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  scalar DateTime

  type User {
    firstName: String!
    lastName: String!
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type Query {
    hello: String
    users: [User]
    user(id: Int!): User
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  users: async () => await models.User.findAll(),
  user: async (args) => {
    console.log(args);
    return await models.User.findByPk(args.id);
  },
  DateTime: GraphQLDateTime,
};

module.exports = { schema, root };
