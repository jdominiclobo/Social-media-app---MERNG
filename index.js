const { ApolloServer } = require("apollo-server");
// const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { URI } = require("./config");

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
