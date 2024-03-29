//import Apollo
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import React from "react";
import ReactDOM from "react-dom";
import "../src/styles/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "./constants";
import { BrowserRouter } from "react-router-dom";

// create connection to GraphQL API server
const httpLink = createHttpLink({
  uri: "https://still-brushlands-97387.herokuapp.com/"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id
  })
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
