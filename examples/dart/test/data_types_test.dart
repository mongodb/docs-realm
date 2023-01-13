import 'package:realm_dart/realm.dart';
import 'package:test/expect.dart';
import 'package:test/scaffolding.dart';

import 'utils.dart';

// :snippet-start: data-types-example-model

part 'data_types_test.g.dart'; // :remove:
// :uncomment-start:
// part 'car.g.dart';
// :uncomment-end:

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  String? licensePlate;
  bool isElectric = false;
  double milesDriven = 0;
  late List<String> attributes;
  late _Person? owner;
}

// :snippet-start: embedded-object-model
// The generated `Address` class is an embedded object.
@RealmModel(ObjectType.embeddedObject)
class _Address {
  late String street;
  late String city;
  late String state;
  late String country;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late String name;

  // Embedded object in parent object schema
  late _Address? address; // Must be nullable
}

// :snippet-end:
// :snippet-end:

// :snippet-start: uuid-model
@RealmModel()
class _UuidPrimaryKey {
  @PrimaryKey()
  late Uuid id;
}

//:snippet-end:
// :snippet-start: objectid-model
@RealmModel()
class _ObjectIdPrimaryKey {
  @PrimaryKey()
  late ObjectId id;
}

// :snippet-end:
// :snippet-start: datetime-model
@RealmModel()
class _Vehicle {
  @PrimaryKey()
  late String nickname;
  late DateTime dateLastServiced;
}

// :snippet-end:

// :snippet-start: realmlist-model
@RealmModel()
class _Player {
  @PrimaryKey()
  late String username;
  // `inventory` property of type RealmList<Item>
  // where Items are other RealmObjects
  late List<_Item> inventory;
  // `traits` property of type RealmList<String>
  // where traits are Dart Strings.
  late List<String> traits;
}

@RealmModel()
class _Item {
  @PrimaryKey()
  late String name;
  late String description;
}
// :snippet-end:

main() {
  test('Uuid', () {
    // :snippet-start: uuid-use
    final myId = Uuid.v4();
    final object = UuidPrimaryKey(myId);
    // :snippet-end:
    expect(myId.toString(), isA<String>());
  });
  test('ObjectId', () {
    // :snippet-start: objectid-use
    final id = ObjectId();
    final object = ObjectIdPrimaryKey(id);
    // :snippet-end:
    expect(object.id.toString(), isA<String>());
  });
  test('DateTime', () {
    final config = Configuration.local([Vehicle.schema]);
    final realm = Realm(config);

    // :snippet-start: datetime-use
    // Create a Realm object with date in UTC, or convert with .toUtc() before storing
    final subaruOutback = realm.write<Vehicle>(() {
      return realm.add(Vehicle('Subie', DateTime.utc(2022, 9, 18, 12, 30, 0)));
    });

    final fordFusion = Vehicle('Fuse', DateTime(2022, 9, 18, 8, 30, 0).toUtc());
    realm.write(() {
      realm.add(fordFusion);
    });

    // When you query the object, the `DateTime` returned is UTC
    final queriedSubaruOutback =
        realm.all<Vehicle>().query('nickname == "Subie"')[0];
    expect(queriedSubaruOutback.nickname, 'Subie'); // :remove:

    // If your app needs it, convert it to Local() or the desired time zone
    final localizedSubieDateLastServiced =
        queriedSubaruOutback.dateLastServiced.toLocal();
    // :snippet-end:
    expect(
        subaruOutback.dateLastServiced.toString(), '2022-09-18 12:30:00.000Z');

    final queriedSubieDate = queriedSubaruOutback.dateLastServiced.toString();
    expect(queriedSubieDate, '2022-09-18 12:30:00.000Z');

    cleanUpRealm(realm);
  });

  test("RealmList", () {
    final config = Configuration.local([Player.schema, Item.schema]);
    final realm = Realm(config);
    // :snippet-start: realmlist-use
    final artemis = realm.write(() => realm.add(Player('Art3mis', inventory: [
          Item('elvish sword', 'sword forged by elves'),
          Item('body armor', 'protects player from damage'),
        ], traits: [
          'brave',
          'kind'
        ])));

    // Use RealmList methods to filter results
    RealmList<String> traits = artemis.traits;
    final brave = traits.firstWhere((element) => element == 'brave');

    final elvishSword =
        artemis.inventory.where((item) => item.name == 'elvish sword').first;

    // Query RealmList with Realm Query Language
    final playersWithBodyArmor =
        realm.query<Player>("inventory.name == \$0", ['body armor']);
    print("LEN " + playersWithBodyArmor.length.toString());
    // :snippet-end:
    expect(brave, 'brave');
    expect(elvishSword.name, 'elvish sword');
    expect(playersWithBodyArmor.length, 1);
    cleanUpRealm(realm);
  });

  test("RealmResults", () {
    final config = Configuration.local([Player.schema, Item.schema]);
    final realm = Realm(config);
    final artemis = realm.write(() => realm.addAll([
          Player('Art3mis', inventory: [
            Item('elvish sword', 'sword forged by elves'),
            Item('body armor', 'protects player from damage'),
          ], traits: [
            'brave',
            'kind'
          ]),
          Player('Percival')
        ]));
    // :snippet-start: realmresults-use
    RealmResults<Player> players = realm.all<Player>();
    RealmResults<Player> bravePlayers =
        realm.query<Player>('ANY traits == \$0', ['brave']);
    // :snippet-end:
    expect(players.length, 2);
    expect(bravePlayers.length, 1);
    cleanUpRealm(realm);
  });

  test("Embedded objects", () {
    // :snippet-start: embedded-object-examples
    // Both parent and embedded objects in schema
    final realm = Realm(Configuration.local([Person.schema, Address.schema]));

    // Create an embedded object.
    final joesHome = Address("500 Dean Street", "Brooklyn", "NY", "USA");
    final joe = Person("Joe", address: joesHome);
    realm.write(() => realm.add(joe));
    expect(realm.find<Person>("Joe"), isNotNull); // :remove:

    // Update an embedded object property.
    realm.write(() {
      joe.address?.street = "800 Park Place";
    });
    // :remove-start:
    expect(realm.find<Person>("Joe")?.address?.street, "800 Park Place");
    // :remove-end:

    // Query a collection of embedded objects.
    // You must access the embedded object through the parent RealmObject type.
    final peopleWithNewYorkHomes = realm.query<Person>("address.state = 'NY'");
    expect(peopleWithNewYorkHomes.length, 1); // :remove:

    // Overwrite an embedded object.
    // Also deletes original embedded object from realm.
    final joesNewHome = Address("12 Maple Way", "Toronto", "ON", "Canada");
    realm.write(() {
      joe.address = joesNewHome;
    });
    // :remove-start:
    expect(realm.dynamic.all("Address").query("state == 'NY'").length, 0);
    // :remove-end:

    // You can access the parent object from an embedded object.
    final thePersonObject = joesNewHome.parent;
    // :remove-start:
    expect(thePersonObject, isNotNull);
    // :remove-end:

    // Delete embedded object from parent object.
    realm.write(() => realm.delete(joe.address!));
    expect(joe.address, isNull); // :remove:

    // Add address back for the following example.
    final anotherNewHome = Address("202 Coconut Court", "Miami", "FL", "USA");
    realm.write(() {
      joe.address = anotherNewHome;
    });
    // Deleting the parent object also deletes the embedded object.
    realm.write(() => realm.delete(joe));

    // :snippet-end:
    expect(realm.find<Person>("Joe"), isNull); // :remove:
    expect(realm.dynamic.all("Address").length, 0);
    cleanUpRealm(realm);
  });
}
