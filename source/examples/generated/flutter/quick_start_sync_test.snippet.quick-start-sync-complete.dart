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
  Todo buyMilk = realm.write(() {
    return realm.add<Todo>(Todo(ObjectId(), 'Buy milk', loggedInUser.id));
  });
  print('Created task: ${buyMilk.summary}');
  RealmResults<Todo> allTodos = realm.all<Todo>();
  RealmResults<Todo> incompleteTodos = realm.query<Todo>("isComplete == false");
  print("'Buy milk' status _before_ update: ${buyMilk.isComplete.toString()}");
  print("Deleting 'Buy Milk'");
  realm.write(() {
    buyMilk.isComplete = true;
  });
  print("'Buy milk' status _after update: ${buyMilk.isComplete.toString()}");
  realm.write(() {
    realm.delete(buyMilk);
  });
  realm.write(() {
    realm.deleteMany(allTodos);
  });
  late Todo drinkCoffee;
  late Todo takeNap;
  realm.write(() {
    drinkCoffee = realm.add(Todo(ObjectId(), 'Drink coffee', loggedInUser.id));
    takeNap = realm.add(Todo(ObjectId(), 'Take nap', loggedInUser.id));
  });
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
  final buyMilkSubscription = buyMilk.changes.listen((changes) {
    changes.isDeleted; // if the object has been deleted
    changes.object; // the RealmObject being listened to, `buyMilk`
    changes.properties; // the changed properties
    print("'Buy milk' status update: ${changes.object.isComplete.toString()}");
  });
  realm.write(() {
    buyMilk.isComplete = true;
  });
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
