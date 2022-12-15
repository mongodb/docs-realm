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
const YOUR_APP_ID = 'graphql_test-kobqo';
const YOUR_GRAPHQL_URL =
    'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/graphql_test-kobqo/graphql';
// :remove-end:
void main() async {
  // :snippet-start: log-in
  final app = App(AppConfiguration(YOUR_APP_ID));
  await app.logIn(Credentials.anonymous());
  // Refresh the user access token every 29 minutes, as the default expiration
  // time for an access token is 30 minutes.
  Timer.periodic(
      Duration(minutes: 29), (_) => app.currentUser?.refreshCustomData());
  // :snippet-end:

  // :snippet-start: create-gql-client
  // Build GraphQL endpoint and client
  // In the `authLink`, retrieve the accessToken from the app's
  // currently logged in user on each request.
  // If there's no logged in user, pass an empty string as Bearer token,
  // causing the request to fail.
  final authLink = AuthLink(
    getToken: () => 'Bearer ${app.currentUser?.accessToken ?? ""}',
  );
  final link = authLink.concat(HttpLink(YOUR_GRAPHQL_URL));
  final client = GraphQLClient(link: link, cache: GraphQLCache());
  // :snippet-end:

  // :snippet-start: query
  final query = """
  query {
    car_V1 {
      _id
      make
    }
  }
  """;

  final queryOptions = QueryOptions(
    document: gql(query),
  );

  final queryRes = await client.query(queryOptions);
  // :snippet-end:

  // :snippet-start: mutation
  final mutation = """
  mutation AddCar( \$_id: ObjectId!, \$make: String!) {
    insertOneCar_V1(data: {
      _id: \$_id
      make: \$make
    }) {
      _id
      make
    }
  }
  """;

  final mutationOptions = MutationOptions(
      document: gql(mutation),
      variables: {'_id': ObjectId().toString(), 'make': 'Toyota'});

  final mutationRes = await client.mutate(mutationOptions);
  // :snippet-end:
}
// :snippet-end:
