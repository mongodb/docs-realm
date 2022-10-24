import 'sync_schemas.dart';
import 'package:realm_dart/realm.dart';

void main() async {
  // Add your App Services App ID
  const APP_ID = YOUR_APP_ID_HERE;
  App app = App(AppConfiguration(APP_ID));
  User loggedInUser = await app.logIn(Credentials.anonymous());
  print('Logged in anonymously with user id: ${loggedInUser.id}');
  Configuration config =
      Configuration.flexibleSync(loggedInUser, [Todo.schema]);
  Realm realm = Realm(
    config,
  );
// Check if the subscription already exists before adding
  final userTodoSub = realm.subscriptions.findByName('getUserTodos');
  if (userTodoSub == null) {
    realm.subscriptions.update((mutableSubscriptions) {
      // server-side rules ensure user only downloads their own Todos
      mutableSubscriptions.add(realm.all<Todo>(), name: 'getUserTodos');
    });
  }
  // clean up
  realm.close();
  await loggedInUser.logOut();
  Realm.deleteRealm(realm.config.path);
  print('Bye bye :)');
  Realm.shutdown();
}
