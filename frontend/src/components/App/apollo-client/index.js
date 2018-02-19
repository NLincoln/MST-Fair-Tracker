import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider as Provider } from "react-apollo";

const client = new ApolloClient({ uri: "/api/graphql" });

export const ApolloProvider = props => <Provider client={client} {...props} />;
