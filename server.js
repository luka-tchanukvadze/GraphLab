import express from "express";
import { createYoga } from "graphql-yoga";

import { ruruHTML } from "ruru/server";
import { schema } from "./src/graphql";

const yoga = createYoga({
  schema,
});

const app = express();

app.all("/graphql", yoga);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000);
console.log("api running on 4000");
