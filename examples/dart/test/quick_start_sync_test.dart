import 'package:test/test.dart';
import '../bin/models/sync_schemas.dart';
import 'package:realm_dart/realm.dart';

const id = 'example-testers-kvjdy';
void main() async {
  // :snippet-start: init-app
  App app = App(AppConfiguration(id));
  // :snippet-end:
  // :snippet-start: log-in
  User loggedInUser = await app.logIn(Credentials.anonymous());
  // :snippet-end:
  // :snippet-start: open-sync-realm
  Configuration config =
      Configuration.flexibleSync(loggedInUser, [Todo.schema]);
  Realm realm = Realm(
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
  // :snippet-start: create-object
  realm.write(() {
    Todo buyMilk = Todo(ObjectId(), 'Buy milk', loggedInUser.id);
    realm.add<Todo>(buyMilk);
  });
  // :snippet-end:
  // :snippet-start: get-all-objects
  RealmList<Todo> allTodos = realm.all<Todo>();
  // :snippet-end:
  // :snippet-start: filter-results
  RealmList<Todo> incompleteTodos = realm.query<Todo>("isComplete == false");
  // :snippet-end:
  // :snippet-start: update-object
  Todo buyMilk = realm.query<Todo>("summary = 'Buy milk'")[0];
  realm.write(() {
    buyMilk.isComplete = true;
  });
  // :snippet-end:
  // :snippet-start: delete-one
  Todo buyMilk = realm.query<Todo>("summary = 'Buy milk'")[0];
   realm.write(() {
        realm.delete(buyMilk)
   });
  // :snippet-end:
  // :snippet-start: delete-many
  RealmList<Todo> allTodos = realm.query<Todo>("summary = 'Buy milk'");
   realm.write(() {
     realm.deleteMany(allTodos);
   });
  // :snippet-end:
  // :snippet-start: watch-changes-collection
  // Listen for changes on whole collection
   final todos = realm.all<Todo>();
   final todosSubscription = todos.changes.listen((changes) {
      changes.inserted; // indexes of inserted objects
      changes.modified; // indexes of modified objects
      changes.deleted; // indexes of deleted objects
      changes.newModified; // indexes of modified objects
      // after deletions and insertions are accounted for
      changes.moved; // indexes of moved objects
      changes.results; // the full List of objects
   });
   // Listen for changes on RealmResults
   final completedTodos = todos.query('isComplete == true');
   final completedTodosSubscription = completedTodos.changes.listen((changes) {
      // ... all the same data as above
   });
  // :snippet-end:
  // :snippet-start: watch-changes-object
  final buyMilkSubscription = buyMilk.changes.listen((changes) {
      changes.isDeleted; // if the object has been deleted
      changes.object; // the RealmObject being listened to, `buyMilk`
      changes.properties; // the changed properties
   });
  // :snippet-end:
  await todosSubscription.cancel();
  await completedTodosSubscription.cancel();
  await buyMilkSubscription.cancel();
  realm.close();
  await loggedInUser.logOut();
}
