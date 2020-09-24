import * as React from "react";
import * as Realm from "realm-web";
import { useRealmApp } from "./RealmApp";

// Apollo
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache";

const RealmApolloProvider: React.FC = ({ children }) => {
  const { id, user } = useRealmApp();
  const [client, setClient] = React.useState(
    createApolloClient(id, user as Realm.User)
  );
  React.useEffect(() => {
    setClient(createApolloClient(id, user as Realm.User));
  }, [id, user]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default RealmApolloProvider;

// TODO: Implement createApolloClient()
function createApolloClient(
  realmAppId: string,
  user: Realm.User
): ApolloClient<NormalizedCacheObject> {
  const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${realmAppId}/graphql`;
  
  const client = new ApolloClient({
    link: new HttpLink({
      uri: graphql_url,
      fetch: async (uri: RequestInfo, options: RequestInit) => {
        if (!options.headers) {
          options.headers = {} as Record<string, string>;
        }
        // Refreshing custom data also ensures a valid access token
        await user.refreshCustomData();
        const authenticatedOptions: RequestInit = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${user.accessToken}`
          }
        }
        return fetch(uri, authenticatedOptions);
      },
    }),
    cache: new InMemoryCache(),
  });

  return client
}
