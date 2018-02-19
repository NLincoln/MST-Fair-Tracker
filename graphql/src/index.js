const express = require("express");
const types = require("./types");
const compileSchema = require("./compile-schema");
const db = require("./db");
const moment = require("moment");

const { mockServer } = require("graphql-tools");

const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const bodyParser = require("body-parser");

const by = key => value => value[key];

const app = express();

app.use("/graphql", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  "/api/graphql",
  bodyParser.json(),
  graphqlExpress(request => {
    return {
      context: {
        db
      },
      schema: compileSchema()
    };
  })
);

app.use(
  "/api/graphiql",
  graphiqlExpress({
    endpointURL: `/api/graphql`
  })
);

const mocks = Object.assign({}, ...types.filter(by("mock")).map(by("mock")));
const mockSchema = compileSchema();
mockServer(mockSchema, mocks);

app.listen(4000);
console.log("GraphQL server started on port 4000");
