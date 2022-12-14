// :snippet-start: complete-example
// :snippet-start: import
import 'package:graphql/client.dart';
import 'package:realm_dart/realm.dart'; // :remove
// :uncomment-start:
// import 'package:realm/realm.dart';
// :uncomment-end:
import "dart:async"; // used to refresh access token
// :snippet-end:

// :remove-start:
const APP_ID = 'graphql_test-kobqo';
const GRAPHQL_URL =
    'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/graphql_test-kobqo/graphql';
// :remove-end:
void main() async {
  // :snippet-start: log-in
  final app = App(AppConfiguration(APP_ID));
  await app.logIn(Credentials.anonymous());
  // Refresh the user access token every 29 minutes, as the default expiration
  // time for an access token is 30 minutes.
  Timer.periodic(
      Duration(minutes: 29), (_) => app.currentUser?.refreshCustomData());
  // :snippet-end:

  // :snippet-start: create-gql-client
  // Build GraphQL endpoint and client
  // In the `authLink`, retrieve the accessToken from the user object on each request
  final authLink = AuthLink(
    getToken: () => 'Bearer ${app.currentUser?.accessToken ?? ""}',
  );
  final link = authLink.concat(HttpLink(GRAPHQL_URL));
  final client = GraphQLClient(link: link, cache: GraphQLCache());
  // :snippet-end:

  // :snippet-start: query
  final document = """
  query {
    car_V1 {
      _id
      make
    }
  }
  """;

  final queryOptions = QueryOptions(
    document: gql(document),
  );
  final queryRes = await client.query(queryOptions);
  // :snippet-end:

  // :snippet-start: mutation
  // TODO: add mutation code example
  // :snippet-end:
}
// :snippet-end:
