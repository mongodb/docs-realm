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
}
