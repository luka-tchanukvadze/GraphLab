export const typeDef = /* GraphQL */ `
  type Query {
    users: [User]!

    user: User
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

    user: () => {
      return {
        id: 1,
        name: "Chanu",
      };
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
