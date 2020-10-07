const createRealmApolloClient = (app) => {
  const link = new HttpLink({
    // Realm apps use a standard GraphQL endpoint, identified by their App ID
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${app.id}/graphql`,
    // A custom fetch handler adds the logged in user's access token to GraphQL requests
    fetch: async (uri, options) => {
      if (!app.currentUser) {
        throw new Error(`Must be logged in to use the GraphQL API`);
      }
      // Refreshing a user's custom data also refreshes their access token
      await app.currentUser.refreshCustomData();
      // The handler adds a bearer token Authorization header to the otherwise unchanged request
      options.headers.Authorization = `Bearer ${app.currentUser.accessToken}`;
      return fetch(uri, options);
    },
  });

  const cache = new InMemoryCache();

  return new ApolloClient({ link, cache });
};