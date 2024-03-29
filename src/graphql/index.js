import ApolloClient  from "apollo-client";
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
// import { getUserToken } from "../helpers";

const httpurl = 'https://api.hexometer.com/v2/ql' || 'http://localhost:4000/api/ql';

const AuthMiddleware = new ApolloLink((operation, forward) => {
  // @ts-ignore
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      //authorization: getUserToken(),
    }
  }));

  return forward
    ? forward(operation)
    : null;
});

const httpLink = new HttpLink({
  uri: httpurl,
});

const ErrorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export default new ApolloClient({
  link: ApolloLink.from([
    AuthMiddleware,
    ErrorHandler,
    httpLink
  ]),

  cache: new InMemoryCache(),
});
