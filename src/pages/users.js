import React from "react";
import { ApolloProvider } from 'react-apollo'
import { GET_USERS } from '../graphql/queries'
import { Query } from "react-apollo";
import GraphQLClient from '../graphql';
import Users from '../components/Users';
import "tabler-react/dist/Tabler.css";

export default () => (
    <ApolloProvider client={GraphQLClient}>
        <Query query={ GET_USERS } fetchPolicy="network-only" notifyOnNetworkStatusChange>
            {({ data, loading }) =>
                <Users
                    data={data}
                    loading={loading}
                />
                // <div>Hi There!{console.log(data)}</div>
            }
        </Query>
    </ApolloProvider>
);
