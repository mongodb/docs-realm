import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'schemas.dart';
import 'utils.dart';

part 'backlinks_test.g.dart';

// :snippet-start: backlink-models
@RealmModel()
class _User {
  @PrimaryKey()
  late ObjectId id;

  late String username;
  // One-to-many relationship that the backlink is created for below.
  late List<_Task> tasks;
}

@RealmModel()
class _Task {
  @PrimaryKey()
  late ObjectId id;

  late String description;
  late bool isComplete;

  // Backlink field. Links back to the `tasks` property in the `_User` model.
  @Backlink(#tasks)
  late Iterable<_User> linkedUser;
}
// :snippet-end:

void main() {
  test('Filter Backlinks with RQL', () {
    final config = Configuration.local([User.schema, Task.schema]);
    final realm = Realm(config);

    final han = User(ObjectId(), 'han', tasks: [
      Task(ObjectId(), 'Pay Chewie back', false),
      Task(ObjectId(), 'Get a haircut', true)
    ]);
    realm.write(() => realm.add(han));
    final jarjar = User(ObjectId(), 'jarjar_binks', tasks: [
      Task(ObjectId(), 'Give Senate speech', false),
      Task(ObjectId(), 'Swimming lessons', false),
      Task(ObjectId(), 'Practice for open mic night', true)
    ]);
    realm.write(() => realm.add(jarjar));

    // :snippet-start: filter-backlinks-rql
    // Filter tasks through the User's backlink property
    // using `@links.<ObjectType>.<PropertyName>` syntax
    final jarjarsIncompleteTasks = realm.query<Task>(
        "ALL @links.User.tasks.username == 'jarjar_binks' AND isComplete == false");

    final tasksForHan = realm.query<Task>("ALL @links.User.tasks.username == 'han'");
    // :snippet-end:

    expect(jarjarsIncompleteTasks.length, 2);
    expect(tasksForHan.length, 2);
    cleanUpRealm(realm);
  });

  test('Query Backlinks', () {
    // Use to-one models from Schemas.dart
    final config = Configuration.local([Person.schema, Bike.schema]);
    final realm = Realm(config);

    final ownerId = ObjectId();
    final bikeId = ObjectId();
    realm.write(() {
      realm.add(Person(ObjectId(), 'JarJar', 'Binks'));

      Person owner = realm.add(Person(ownerId, 'Anakin', 'Skywalker'));

      realm.add(Bike(bikeId, 'Podracer', owner: owner));

      realm.add(Bike(ObjectId(), 'Speeder Bike', owner: owner));
    });

    // :snippet-start: query-backlinks
    final person = realm.query<Person>("firstName == 'Anakin'").first;

    // Find all bikes that have an owner named Anakin
    final allBikes = person.getBacklinks<Bike>('owner');
    // :snippet-end:
    expect(allBikes.length, 2);
    expect(allBikes.any((element) => element.id == bikeId), true);
    expect(allBikes.any((element) => element.owner!.id == ownerId), true);
    cleanUpRealm(realm);
  });
}
