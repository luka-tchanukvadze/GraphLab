import { createSchema } from "graphql-yoga";
import { typeDef as User } from "./models/user.js";
import _ from "lodash";

const queries = /* GraphQL */ `
  type Query {
    hello: String
  }
`;

const userResolvers = {
  Query: {
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
};

const resolvers = {
  Query: {
    hello: () => "Hello from yoga",
  },
};

export const schema = createSchema({
  typeDefs: [queries, User],
  resolvers: _.merge(resolvers, userResolvers),
});
