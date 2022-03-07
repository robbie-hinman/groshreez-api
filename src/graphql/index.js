const { makeExecutableSchema } = require('@graphql-tools/schema');
var { GraphQLDateTime } = require('graphql-iso-date');
const models = require('../db');
const { Op } = require('sequelize');
// Construct a schema, using GraphQL schema language

var typeDefs = `
  scalar DateTime

  input UserInput {
    firstName: String!
    lastName: String!
  }

  input ListInput {
    userId: Int!
    listName: String!
  }

  type User {
    firstName: String!
    lastName: String!
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    lists: [List]
  }

  type List {
    listName: String!
    id: Int!
    storeName: String
    fullfilledDate: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: Int!
  }
  
  type Query {
    users: [User]
    user(id: Int!): User
    lists: [List]
    list(id: Int!): List
  }

  type Mutation {
    createUser(input: UserInput!): User
    createList(input: ListInput!): List
  }
`;

var resolvers = {
  Query: {
    users: async () => await models.User.findAll(),
    user: async (args) => {
      console.log(args);
      return await models.User.findByPk(args.id);
    },
    lists: async () => await models.List.findAll(),
    list: async (args) => {
      return await models.List.findByPk(args.id);
    },
  },
  Mutation: {
    createUser: async ({ input }) => {
      const { firstName, lastName } = input;
      return models.User.create({
        firstName,
        lastName,
      });
    },
    createList: async ({ input }) => {
      const { userId, listName } = input;
      return models.List.create({
        userId,
        listName,
      });
    },
  },
  DateTime: GraphQLDateTime,
  User: {
    lists: async (user) => {
      console.log('###!!!###!!!### HERE !!!!');
      return await models.List.findAll({
        where: {
          userId: {
            [Op.eq]: user.id,
          },
        },
      });
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = { schema };
