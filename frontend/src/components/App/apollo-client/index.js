import React from 'react';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { ApolloProvider as Provider } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/api/graphql/graphql'
});

export const client = new ApolloClient({
  networkInterface,
  connectToDevTools: true
});

export const ApolloProvider = (props) => <Provider client={client} {...props} />;
