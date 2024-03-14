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

// :snippet-start: unstructured-data-model
@RealmModel()
class _EventLog {
  @PrimaryKey()
  late ObjectId id;

  late String eventType;
  late DateTime timestamp;
  late String userId;
  late Map<String, RealmValue> details;
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

  test('Create unstructured data', () {
    final config = Configuration.local([EventLog.schema]);
    final realm = Realm(config);

    // :snippet-start: create-unstructured-data-example
    realm.write(() {
      final eventLog = realm.add(
          EventLog(ObjectId(), 'purchase', DateTime.now(), 'user123', details: {
        'ipAddress': RealmValue.from('192.168.1.1'),
        'items': RealmValue.from([
          {'id': 1, 'name': 'Laptop', 'price': 1200.00},
          {'id': 2, 'name': 'Mouse', 'price': 49.99}
        ]),
        'total': RealmValue.from(1249.99)
      }));

      print('''
      Event Type: ${eventLog.eventType}
      Timestamp: ${eventLog.timestamp}
      User ID: ${eventLog.userId}
      Details:
        IP Address: ${eventLog.details['ipAddress']}
      ''');
      final items = eventLog.details.values;
        for (var item in items) {
          
          print(' Item: $item');
      }
     print('Total: ${eventLog.details['total']}');
      // :snippet-end:
      expect(eventLog.details['ipAddress']?.value.toString(), '192.168.1.1');
      expect(eventLog.details['total']?.value, 1249.99);
    });
    realm.close();
    Realm.deleteRealm(config.path);
  });
}
