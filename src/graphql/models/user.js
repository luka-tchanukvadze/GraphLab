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
    age: Int!
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
      console.log(movies);
      // insert into db

      return {
        id: 1,
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
