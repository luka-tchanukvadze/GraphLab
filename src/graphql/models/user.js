import { ObjectId } from "mongodb";

export const typeDef = /* GraphQL */ `
  type Query {
    users: [User]!

    user(id: ID!): User
  }

  type Mutation {
    createUser(user: NewUserInput!): User
  }

  input NewUserInput {
    name: String!
    email: String!
  }

  type User {
    _id: ID!
    name: String
    email: String
  }
`;

export const resolvers = {
  Query: {
    users: (obj, args, { mongo }) => {
      return mongo.users.find().limit(20).toArray();
    },

    user: async (obj, { id }, { mongo }) => {
      const user = await mongo.users.findOne({ _id: new ObjectId(id) });
      return user;
    },
  },

  Mutation: {
    createUser: async (_, { user }, { mongo }) => {
      const response = await mongo.users.insertOne(user);

      // insert into db

      return {
        id: response.insertedId,
        ...user,
      };
    },
  },

  User: {
    id: (obj) => {
      return obj._id || obj.id;
    },
    name: (obj) => {
      return obj.name.trim().toUpperCase();
    },
  },
};
