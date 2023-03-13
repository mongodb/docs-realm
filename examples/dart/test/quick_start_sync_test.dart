import 'package:realm_dart/realm.dart';

part 'quick_start_sync_test.g.dart';

@RealmModel()
class _Todo {
  @MapTo('_id')
  @PrimaryKey()
  late ObjectId id;
  bool isComplete = false;
  late String summary;
  @MapTo('owner_id')
  late String ownerId;
}

void main() async {
  const YOUR_APP_ID_HERE = 'flutter-flexible-luccm'; // :remove:
  // Add your App Services App ID
  const APP_ID = YOUR_APP_ID_HERE;
  // :snippet-start: init-app
  final app = App(AppConfiguration(APP_ID));
  // :snippet-end:
  // :snippet-start: log-in
  final loggedInUser = await app.logIn(Credentials.anonymous());
  // :snippet-end:
  print('Logged in anonymously with user id: ${loggedInUser.id}');
  // :snippet-start: open-sync-realm
  final config = Configuration.flexibleSync(loggedInUser, [Todo.schema]);
  final realm = Realm(
    config,
  );
  // :snippet-end:
  // :snippet-start: add-sync-subscription
// Check if the subscription already exists before adding
  final userTodoSub = realm.subscriptions.findByName('getUserTodos');
  if (userTodoSub == null) {
    realm.subscriptions.update((mutableSubscriptions) {
      // server-side rules ensure user only downloads their own Todos
      mutableSubscriptions.add(realm.all<Todo>(), name: 'getUserTodos');
    });
  }
  // :snippet-end:
  // clean up
  realm.close();
  await loggedInUser.logOut();
  Realm.deleteRealm(realm.config.path);
  print('Bye bye :)');
  Realm.shutdown();
}
