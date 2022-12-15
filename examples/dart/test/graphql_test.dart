import 'package:test/test.dart';
// :snippet-start: import
import 'package:graphql/client.dart';
import 'package:realm_dart/realm.dart'; // :remove:
// :uncomment-start:
// import 'package:realm/realm.dart';
// :uncomment-end:
import "dart:async"; // used to refresh access token
// :snippet-end:

// :remove-start:
// Note: using web tester b/c has GraphQL configured
const YOUR_APP_ID = 'web_tester-ifnyw';
const YOUR_GRAPHQL_URL =
    'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/web_tester-ifnyw/graphql';
// :remove-end:
void main() async {
  late GraphQLClient higherScopeClient;
  late App higherScopeApp;
  setUpAll(() async {
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
    higherScopeClient = client;
    higherScopeApp = app;
    // make sure collection has data
    final seedMutation = """
    mutation AddRose {
      insertOnePlant(data: {
        name: "rose"
        color: "red"
      }) {
        _id
        name
        color
      }
    }
    """;
    await client.mutate(MutationOptions(document: gql(seedMutation)));
  });
  tearDownAll(() async {
    final cleanUpMutation = """
    mutation CleanUp {
      deleteManyPlants(query: {
        name_in: [ "rose", "lily" ]
      }) {
        deletedCount
      }
    }
    """;
    await higherScopeClient
        .mutate(MutationOptions(document: gql(cleanUpMutation)));
    await higherScopeApp.currentUser?.logOut();
  });
  test("Run Query", () async {
    final client = higherScopeClient;
    // :snippet-start: query
    final query = """
    query {
      plants(limit: 5) {
        _id
        name
        color
      }
    }
    """;

    final queryOptions = QueryOptions(
      document: gql(query),
    );

    final queryRes = await client.query(queryOptions);
    // :snippet-end:
    expect(queryRes.data?.length, isA<int>());
  });
  test("Run Mutation", () async {
    final client = higherScopeClient;
    // :snippet-start: mutation
    final mutation = """
    mutation AddPlant( \$_id: ObjectId!, \$name: String!, \$color: String) {
      insertOnePlant(data: {
        _id: \$_id
        name: \$name
        color: \$color
      }) {
        _id
        name
        color
      }
    }
    """;

    final mutationOptions = MutationOptions(
        document: gql(mutation),
        variables: {
          '_id': ObjectId().toString(),
          'name': 'lily',
          'color': 'white'
        });

    final mutationRes = await client.mutate(mutationOptions);
    // :snippet-end:
    expect(mutationRes.data?["insertOnePlant"]?["name"], "lily");
    expect(mutationRes.data?["insertOnePlant"]?["color"], "white");
  });
}
