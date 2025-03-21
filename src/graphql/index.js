import { createSchema } from "graphql-yoga";

const queries = /* GraphQL */ `
  type Query {
    hello: String
  }
`;

const userTypeDef = /* GraphQL */ `
  type Query {
    user: User
  }

  type User {
    id: Int
    name: String
  }
`;

export const schema = createSchema({
  typeDefs: [queries, userTypeDef],
  resolvers: {
    Query: {
      hello: () => "Hello from yoga",
      user: () => {
        return {
          id: 1,
          name: "Luka",
        };
      },
    },

    User: {
      name: (obj) => {
        return obj.name.toUpperCase();
      },
    },
  },
});
