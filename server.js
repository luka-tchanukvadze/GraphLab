import express from "express";
import { createYoga } from "graphql-yoga";
import dotenv from "dotenv";

import { ruruHTML } from "ruru/server";
import { schema } from "./src/graphql/index.js";

dotenv.config();

const yoga = createYoga({
  schema,
  context: () => {
    return {
      hello: "world",
    };
  },
});

const app = express();

app.all("/graphql", yoga);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000);
console.log("api running on 4000");
