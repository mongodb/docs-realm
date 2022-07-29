import 'sync_schemas.dart';
import 'package:realm_dart/realm.dart';

void main() async {
  const APP_ID = 'flutter-flexible-luccm';
  // :snippet-start: init-app
  App app = App(AppConfiguration(APP_ID));
  // :snippet-end:
  // :snippet-start: log-in
  User loggedInUser = await app.logIn(Credentials.anonymous());
  // :snippet-end:
  print('Logged in anonymously with user id: ${loggedInUser.id}');
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
  Todo buyMilk = realm.write(() {
    return realm.add<Todo>(Todo(ObjectId(), 'Buy milk', loggedInUser.id));
  });
  // :snippet-end:
  print('Created task: ${buyMilk.summary}');
  // :snippet-start: get-all-objects
  RealmResults<Todo> allTodos = realm.all<Todo>();
  // :snippet-end:
  // :snippet-start: filter-results
  RealmResults<Todo> incompleteTodos = realm.query<Todo>("isComplete == false");
  // :snippet-end:
  print("'Buy milk' status _before_ update: ${buyMilk.isComplete.toString()}");
  print("Deleting 'Buy Milk'");
  // :snippet-start: update-object
  realm.write(() {
    buyMilk.isComplete = true;
  });
  // :snippet-end:
  print("'Buy milk' status _after update: ${buyMilk.isComplete.toString()}");
  // :snippet-start: delete-one
  realm.write(() {
    realm.delete(buyMilk);
  });
  // :snippet-end:
  // :snippet-start: delete-many
  realm.write(() {
    realm.deleteMany(allTodos);
  });
  // :snippet-end:
  late Todo drinkCoffee;
  late Todo takeNap;
  realm.write(() {
    drinkCoffee = realm.add(Todo(ObjectId(), 'Drink coffee', loggedInUser.id));
    takeNap = realm.add(Todo(ObjectId(), 'Take nap', loggedInUser.id));
  });
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
    for (var todo in changes.results) {
      print("'${todo.summary}' updated");
    }
  });
  // Listen for changes on RealmResults
  final completedTodos = todos.query('isComplete == true');
  final completedTodosSubscription = completedTodos.changes.listen((changes) {
    // ... all the same data as above
  });
  // :snippet-end:
  realm.write(() {
    drinkCoffee.isComplete = true;
    takeNap.isComplete = true;
  });
  // Give time for async subscription change listeners to fire
  await Future.delayed(Duration(seconds: 1));
  await todosSubscription.cancel();
  await completedTodosSubscription.cancel();
  buyMilk = realm.write(() {
    return realm.add<Todo>(Todo(ObjectId(), 'Buy milk', loggedInUser.id));
  });
  // :snippet-start: watch-changes-object
  final buyMilkSubscription = buyMilk.changes.listen((changes) {
    changes.isDeleted; // if the object has been deleted
    changes.object; // the RealmObject being listened to, `buyMilk`
    changes.properties; // the changed properties
    print("'Buy milk' status update: ${changes.object.isComplete.toString()}");
  });
  realm.write(() {
    buyMilk.isComplete = true;
  });
  // :snippet-end:
  // Give time for async subscription change listeners to fire
  await Future.delayed(Duration(seconds: 1));
  await buyMilkSubscription.cancel();
  // clean up
  realm.close();
  await loggedInUser.logOut();
  Realm.deleteRealm(realm.config.path);
  print('Bye bye :)');
  Realm.shutdown();
}
