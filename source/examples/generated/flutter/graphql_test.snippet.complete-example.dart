import 'package:graphql/client.dart';
// Import the Realm Dart Standalone SDK
import 'package:realm_dart/realm.dart';
import 'package:realm/realm.dart';
import "dart:async"; // used to refresh access token

const APP_ID = '<Your App ID>';
const GRAPHQL_URL = '< Your GraphQL API Endpoint';

void main() async {
  final app = App(AppConfiguration(APP_ID));
  await app.logIn(Credentials.anonymous());
  // Refresh the user access token every 29 minutes, as the default expiration
  // time for an access token is 30 minutes.
  Timer.periodic(
      Duration(minutes: 29), (_) => app.currentUser?.refreshCustomData());

  // Build GraphQL endpoint and client
  // In the `authLink`, retrieve the accessToken from the user object on each request
  final authLink = AuthLink(
    getToken: () => 'Bearer ${app.currentUser?.accessToken ?? ""}',
  );
  final link = authLink.concat(HttpLink(GRAPHQL_URL));
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

  // TODO: add mutation code example
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
  print(mutationRes);
}
