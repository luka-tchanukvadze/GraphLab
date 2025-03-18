var { graphql, buildSchema } = require("graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");

var schema = buildSchema(`
  type Query {
    hello: String
    age: Int
  }
`);

var rootValue = {
  hello: () => {
    return "Hello world!";
  },

  age: () => {
    return 3;
  },
};

const app = express();

app.all("/graphql", createHandler({ schema, rootValue }));

app.listen(4000);
console.log("api running on 4000");
