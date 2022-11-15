// Used in quickstart
// :snippet-start: define-model
// :state-start: dart
import 'package:realm_dart/realm.dart';
import 'package:test/expect.dart';
import 'package:test/scaffolding.dart';
// :state-end:

// :state-start: flutter
// :state-uncomment-start: flutter
// import 'package:realm/realm.dart';
// :state-uncomment-end:
// :state-end:

part 'define_realm_model_test.g.dart'; // :remove:
// :uncomment-start:
// part 'car.g.dart';
// :uncomment-end:

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}
// :snippet-end:

// :snippet-start: modify-schema-model
@RealmModel()
class _Person {
  late String firstName;
  late String lastName;
  late int age;
}
// :snippet-end:

main() {
  test('Create a new schema version', () {
    // :snippet-start: schema-version
    final config = Configuration.local([Person.schema], schemaVersion: 2);
    Realm realm = Realm(config);
    // :snippet-end:
    expect(config.schemaVersion, 2);
    realm.close();
    Realm.deleteRealm(config.path);
  });
}
