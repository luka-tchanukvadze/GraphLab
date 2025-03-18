var { graphql, buildSchema } = require("graphql");

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

graphql({
  schema,
  source: "{ hello age }",
  rootValue,
}).then((response) => {
  console.log(response);
});
