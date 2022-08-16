const createClient = (token) =>
  new ApolloClient({
    link: new HttpLink({
      ssrMode: true,
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  });
