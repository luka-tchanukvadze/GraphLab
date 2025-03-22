import { createSchema } from "graphql-yoga";
import { typeDef as User } from "./models/user.js";

const queries = /* GraphQL */ `
  type Query {
    hello: String
  }
`;

export const schema = createSchema({
  typeDefs: [queries, User],
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
