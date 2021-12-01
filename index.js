const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { URI } = require("./config");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // this will take the request body and forward it to the context
});

// Defining the PORT
const PORT = process.env.PORT || 5000;

// connect to the db
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
    return server.listen(PORT);
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
