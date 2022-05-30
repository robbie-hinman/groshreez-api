const { makeExecutableSchema } = require('@graphql-tools/schema');
var { GraphQLDateTime } = require('graphql-iso-date');
const models = require('../db/models');
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
    creator: User!
    members: [User]
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
    user: async (parent, args) => {
      return await models.User.findByPk(args.id);
    },
    lists: async () => await models.List.findAll(),
    list: async (parent, args) => {
      return await models.List.findByPk(args.id);
    },
  },
  Mutation: {
    createUser: async (parent, { input }) => {
      const { firstName, lastName } = input;
      return models.User.create({
        firstName,
        lastName,
      });
    },
    createList: async (parent, { input }) => {
      const { userId, listName } = input;
      return models.List.create({
        creatorId: userId,
        listName,
      });
    },
  },
  DateTime: GraphQLDateTime,
  User: {
    lists: async user => {
      return await models.List.findAll({
        where: {
          userId: {
            [Op.eq]: user.id,
          },
        },
      });
    },
  },
  List: {
    creator: async list => {
      return await models.User.findByPk(list.creatorId);
    },
    members: async list => {
      return await models.User.findAll({
        where: {
          userId: {
            [Op.in]: list.members,
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
