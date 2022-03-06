var { buildSchema } = require('graphql');
var { GraphQLDateTime } = require('graphql-iso-date');
const models = require('../db');
// Construct a schema, using GraphQL schema language

var schema = buildSchema(`
  scalar DateTime

  input UserInput {
    firstName: String!
    lastName: String!
  }

  type User {
    firstName: String!
    lastName: String!
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type List {
    listName: String!
    id: Int!
    storeName: String
    fullfilledDate: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type Query {
    users: [User]
    user(id: Int!): User
    lists: [List]
    list(id: Int!): List
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!): User
  }
`);
// updateUser(id: Int!, input: UserInput): User
// The root provides a resolver function for each API endpoint
var root = {
  users: async () => await models.User.findAll(),
  user: async (args) => {
    return await models.User.findByPk(args.id);
  },
  lists: async () => await models.List.findAll(),
  list: async (args) => {
    return await models.List.findByPk(args.id);
  },
  createUser: async ({ firstName, lastName }) => {
    return models.User.create({
      firstName,
      lastName,
    });
  },
  DateTime: GraphQLDateTime,
};

module.exports = { schema, root };
