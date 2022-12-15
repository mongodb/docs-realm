import 'package:graphql/client.dart';
import 'package:realm_dart/realm.dart'; // :remove

import 'package:realm/realm.dart';
import "dart:async"; // used to refresh access token

void main() async {
  final app = App(AppConfiguration(YOUR_APP_ID));
  await app.logIn(Credentials.anonymous());
  // Refresh the user access token every 29 minutes, as the default expiration
  // time for an access token is 30 minutes.
  Timer.periodic(
      Duration(minutes: 29), (_) => app.currentUser?.refreshCustomData());

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
}
