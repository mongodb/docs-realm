// Build GraphQL endpoint and client
// In the `authLink`, retrieve the accessToken from the user object on each request
final authLink = AuthLink(
  getToken: () => 'Bearer ${app.currentUser?.accessToken ?? ""}',
);
final link = authLink.concat(HttpLink(GRAPHQL_URL));
final client = GraphQLClient(link: link, cache: GraphQLCache());
