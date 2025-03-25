export const typeDef = /* GraphQL */ `
  type Query {
    comments: [Comment]
  }

  type Comment {
    _id: ID
    text: String
    email: String
  }
`;

export const resolvers = {
  Query: {
    comments: (obj, args, { mongo }) => {
      return mongo.comments.find().limit(20).toArray();
    },
  },
};
