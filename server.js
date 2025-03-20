var { graphql, buildSchema } = require("graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");

var schema = buildSchema(`
  type Query {
    hello(name: String!): String


    age: Int
    weight: Float!
    isOver18: Boolean
    hobbies: [String!]!

    user: User
  }

  type User {
    id: Int
    name: String

    posts: [Posts]
    frineds: [User]
    invitedBy: User
  }
    
`);

var rootValue = {
  hello: ({ name }) => {
    return `hello ${name}`;
  },

  age: () => {
    return 3;
  },

  weight: 55,
  isOver18: true,
  hobbies: () => {
    return ["carting", "f1", "random "];
  },

  user: () => {
    return {
      id: 1,
      name: "Chanu",
    };
  },
};

const app = express();

app.all("/graphql", createHandler({ schema, rootValue }));

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000);
console.log("api running on 4000");
