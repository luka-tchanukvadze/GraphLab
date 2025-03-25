import { ObjectId } from "mongodb";

export const typeDef = /* GraphQL */ `
  type Query {
    users: [User]!

    user(id: ID!): User
  }

  type Mutation {
    createUser(user: NewUserInput!): User
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, update: UpdateUserInput): User
  }

  input NewUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String!
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

    deleteUser: async (obj, args, { mogno }) => {
      await mongo.users.deleteOne({ _id: new ObjectId(id) });
      return true;
    },

    updateUser: async (obj, { id, upadte }, { mongo }) => {
      const response = await mongo.users.updateOne(
        { _id: new ObjectId(id) },
        update
      );
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
