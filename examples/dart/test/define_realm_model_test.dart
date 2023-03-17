import 'package:realm_dart/realm.dart';
import 'package:test/expect.dart';
import 'package:test/scaffolding.dart';

part 'define_realm_model_test.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}

// :snippet-start: modify-schema-model
@RealmModel()
class _Person {
  late String firstName;
  late String lastName;
  late int age;
}
// :snippet-end:

// :snippet-start: map-to
@RealmModel()
@MapTo('naval_ship')
class _Boat {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late int? maxKnots;
  late int? nauticalMiles;
}
// :snippet-end:

main() {
  test('Create a new schema version', () {
    // :snippet-start: schema-version
    final config = Configuration.local([Person.schema], schemaVersion: 2);
    final realm = Realm(config);
    // :snippet-end:
    expect(config.schemaVersion, 2);
    realm.close();
    Realm.deleteRealm(config.path);
  });
}
