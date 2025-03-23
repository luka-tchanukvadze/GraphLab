export const typeDef = /* GraphQL */ `
  type Query {
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
    id: Int
    name: String
    age: Int
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
    createUser: async (_, { user }, context) => {
      const movies = awaitcontext.client
        .db("sample_mflix")
        .collection("movies")
        .find()
        .toArray();
      console.log(movies);
      // insert into db

      return {
        id: 1,
        ...user,
      };
    },
  },

  User: {
    name: (obj) => {
      return obj.name.trim().toUpperCase();
    },
  },
};
