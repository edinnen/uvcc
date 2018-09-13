const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const cors = require('cors');

const cfGraphql = require('cf-graphql');
const graphqlHTTP = require('express-graphql');
const spaceId = process.env.SPACE_ID;
const cdaToken = process.env.CDA_TOKEN;
const cmaToken = process.env.CMA_TOKEN;
const cpaToken = process.env.CPA_TOKEN;

const logger = require('../logger');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  // Create the GraphQL client for our contentful space
  const graphql = cfGraphql.createClient({
    spaceId,
    cdaToken,
    cmaToken,
    preview: true,
    cpaToken,
  });
  // Get the content types in our contentful space
  graphql
    .getContentTypes()
    .then(cfGraphql.prepareSpaceGraph)
    .then(spaceGraph => {
      const names = spaceGraph.map(ct => ct.names.type).join(', ');
      logger.graphQL(names);
      return spaceGraph;
    })
    .then(cfGraphql.createSchema)
    .then(schema => {
      startServer(graphql, schema);
    })
    .catch();

  // Start the server to serve both GraphQL and our frontend application
  function startServer(client, schema) {
    // Enable CORS header to allow access to the GraphQL endpoint from
    // within an application that is not running on the same origin
    app.use(cors());

    // Encapsulate GraphiQL on a different endpoint for development purposes
    const ui = cfGraphql.helpers.graphiql({ title: 'GraphiQL' });
    app.get('/graphiql', (_, res) =>
      res
        .set(ui.headers)
        .status(ui.statusCode)
        .end(ui.body),
    );

    // Enrich the response with useful information like timing of the underlying HTTP requests.
    const opts = { version: true, timeline: true, detailedErrors: false };

    // Start graphql and expose endpoint
    const ext = cfGraphql.helpers.expressGraphqlExtension(client, schema, opts);
    app.use('/graphql', graphqlHTTP(ext));

    // Start the frontend application
    const compiler = webpack(webpackConfig);
    const middleware = createWebpackMiddleware(
      compiler,
      webpackConfig.output.publicPath,
    );

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    // Since webpackDevMiddleware uses memory-fs internally to store build
    // artifacts, we use it instead
    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
      fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      });
    });
  }
};
