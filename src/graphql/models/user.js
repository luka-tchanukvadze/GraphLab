export const typeDef = /* GraphQL */ `
  type Query {
    user: User
  }

  type Mutation {
    createUser(name: String!): User
  }

  type User {
    id: Int
    name: String
  }
`;

export const resolvers = {
  Query: {
    user: () => {
      return {
        id: 1,
        name: "Chanu",
      };
    },
  },

  Mutation: {
    createUser: (obj, args) => {
      console.log("creating a user");
    },
  },

  User: {
    name: (obj) => {
      return obj.name.toUpperCase();
    },
  },
};
