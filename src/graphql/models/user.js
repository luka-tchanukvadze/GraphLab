export const typeDef = /* GraphQL */ `
  type Query {
    user: User
  }

  type Mutation {
    createUser: User
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
    createUser: (obj) => {
      console.log("creating a user");
    },
  },

  User: {
    name: (obj) => {
      return obj.name.toUpperCase();
    },
  },
};
