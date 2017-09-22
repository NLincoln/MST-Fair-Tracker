const express = require('express');
const types = require('./types');
const compileSchema = require('./compile-schema');
const { sequelize } = require('./db/connection');
const moment = require('moment');

const {
  mockServer,
} = require('graphql-tools');

const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express');
const bodyParser = require('body-parser');

const by = (key) => (value) => value[key];

const app = express();

app.use("/graphql", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const endPoint = (url, graphiql, schema) => {
  app.use(url, bodyParser.json(), graphqlExpress((request) => {
    return {
      context: {
        db: {
          sequelize
        }
      },
      schema,
    }
  }));

  app.use(graphiql, graphiqlExpress({
    endpointURL: `/api/graphql${url}`,
  }));
};

endPoint('/graphql', '/graphiql', compileSchema());

const mocks = Object.assign({}, ...types.filter(by('mock')).map(by('mock')));
const mockSchema = compileSchema();
mockServer(mockSchema, mocks);

endPoint('/graphql-mock', '/graphiql-mock', mockSchema);

app.listen(4000);
console.log('GraphQL server started on port 4000');
