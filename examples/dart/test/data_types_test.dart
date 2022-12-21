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

// :snippet-start: realm-value-model
@RealmModel()
class _RealmValueExample {
  @Indexed()
  late RealmValue singleAnyValue;
  late List<RealmValue> listOfMixedAnyValues;
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
  test("RealmValue - RealmValue.from()", () {
    // :snippet-start: realm-value-from
    final realm = Realm(Configuration.local([RealmValueExample.schema]));

    realm.write(() {
      realm.addAll([
        RealmValueExample(
            singleAnyValue: RealmValue.from(1),
            listOfMixedAnyValues: [Uuid.v4(), "abc", 123].map(RealmValue.from)),
        RealmValueExample(
            singleAnyValue: RealmValue.nullValue(),
            listOfMixedAnyValues: ["abc", 123].map(RealmValue.from))
      ]);
    });
    // :snippet-end:

    expect(
        realm.query<RealmValueExample>("singleAnyValue.@type == 'int'").first,
        isNotNull);
    expect(
        realm.query<RealmValueExample>("singleAnyValue.@type == 'Null'").first,
        isNotNull);
    cleanUpRealm(realm);
  });
  test("RealmValue - RealmValue.type and RealmValue.value", () {
    final realm = Realm(Configuration.local([RealmValueExample.schema]));
    realm.write(() {
      realm.addAll([
        RealmValueExample(
            singleAnyValue: RealmValue.from(1),
            listOfMixedAnyValues: [Uuid.v4(), "abc", 123].map(RealmValue.from)),
        RealmValueExample(
            singleAnyValue: RealmValue.nullValue(),
            listOfMixedAnyValues: ["abc", 123].map(RealmValue.from))
      ]);
    });
    var calledCount = 0;
    // :snippet-start: realm-value-type-value
    final data = realm.all<RealmValueExample>();
    for (var obj in data) {
      if (obj.singleAnyValue.type == int) {
        print(obj.singleAnyValue.value.toString());
        calledCount++; // :remove:
      }
    }
    // :snippet-end:
    expect(calledCount, 1);
    cleanUpRealm(realm);
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
