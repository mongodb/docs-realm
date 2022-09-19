import 'package:realm_dart/realm.dart';
import 'package:test/expect.dart';
import 'package:test/scaffolding.dart';

// :snippet-start: data-types-example-model

part 'data_types_test.g.dart'; // :remove:
// :uncomment-start:
// part 'car.g.dart';
// :uncomment-end:

@RealmModel()
class _Car {
  @PrimaryKey()
  late int id;

  String? licensePlate;
  bool isElectric = false;
  double milesDriven = 0;
  late List<String> attributes;
  late _Person? owner;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late int id;

  late String name;
  late int age;
}
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
main() {
  test('Uuid', () {
    // :snippet-start: uuid-use
    Uuid myId = Uuid.v4();
    UuidPrimaryKey object = UuidPrimaryKey(myId);
    // :snippet-end:
    expect(myId.toString(), isA<String>());
  });
  test('ObjectId', () {
    // :snippet-start: objectid-use
    ObjectId id = ObjectId();
    ObjectIdPrimaryKey object = ObjectIdPrimaryKey(id);
    // :snippet-end:
    expect(object.id.toString(), isA<String>());
  });
  test('DateTime', () {
    // :snippet-start: datetime-use
    final config = Configuration.local([Vehicle.schema]);
    final realm = Realm(config);

    // Create a Realm object with date in UTC, or convert with .toUtc() before storing
    Vehicle subaruOutback = realm.write<Vehicle>(() {
      return realm.add(Vehicle('Subie', DateTime.utc(2022, 9, 18, 12, 30, 0)));
    });
    // :remove-start:
    expect(
        subaruOutback.dateLastServiced.toString(), '2022-09-18 12:30:00.000Z');
    // :remove-end:

    final fordFusion = Vehicle('Fuse', DateTime(2022, 9, 18, 8, 30, 0).toUtc());
    realm.write(() {
      realm.add(fordFusion);
    });

    // When you query the object, the `DateTime` returned is UTC
    final queriedSubaruOutback =
        realm.all<Vehicle>().query('nickname == "Subie"').first;
    expect(queriedSubaruOutback.nickname, 'Subie'); // :remove:

    // :remove-start:
    final queriedSubieDate = queriedSubaruOutback.dateLastServiced.toString();
    expect(queriedSubieDate, '2022-09-18 12:30:00.000Z');
    // :remove-end:
    // If your app needs it, convert it to Local() or the desired time zone
    final localizedSubieDateLastServiced =
        queriedSubaruOutback.dateLastServiced.toLocal();

    realm.close();
    // :snippet-end:
    Realm.deleteRealm(realm.config.path);
  });
}
