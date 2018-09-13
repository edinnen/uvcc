const path = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');

// Setup GraphQL & Contentful packages and environment variables
const cfGraphql = require('cf-graphql');
const graphqlHTTP = require('express-graphql');
const spaceId = process.env.SPACE_ID;
const cdaToken = process.env.CDA_TOKEN;
const cmaToken = process.env.CMA_TOKEN;

const logger = require('../logger');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // Create the GraphQL client for our contentful space
  const graphql = cfGraphql.createClient({
    spaceId,
    cdaToken,
    cmaToken,
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

    app.use(
      '/graphql',
      graphqlHTTP(() => ({
        context: { entryLoader: client.createEntryLoader() },
        graphiql: false,
        schema,
      })),
    );

    // Start the frontend application

    // compression middleware compresses your server responses which makes them
    // smaller (applies also to assets). You can read more about that technique
    // and other good practices on official Express.js docs http://mxs.is/googmy
    app.use(compression());
    app.use(publicPath, express.static(outputPath));

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(outputPath, 'index.html')),
    );
  }
};
