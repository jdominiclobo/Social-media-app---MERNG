import React from "react";
import App from "./App";
import { ApolloClient, HttpLink, from } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: "http://localhost:5000" });

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, httpLink]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
