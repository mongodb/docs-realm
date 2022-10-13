import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './schemas.dart' as Schemas;
import './utils.dart';
part 'migrations_test.g.dart';

typedef PersonV1 = Schemas.Person; // old schema version
typedef Car = Schemas.Car;

@RealmModel()
@MapTo("Person")
class _PersonV2 {
  @PrimaryKey()
  late ObjectId id;

  late String fullName;
  late int? yearsSinceBirth;
}

// new schema which we're testing in the code examples here
typedef Person = PersonV2;

void main() {
  final realmPath = "migrations.realm";
  setUp(() {
    final configV1 =
        Configuration.local([PersonV1.schema, Car.schema], path: realmPath);
    final realmV1 = Realm(configV1);
    realmV1.write(() {
      realmV1.add<PersonV1>(PersonV1(1, "Lando", "Calrissian", age: 42));
      realmV1.add<PersonV1>(PersonV1(2, "Boba", "Fett", age: 36));
      realmV1.add<PersonV1>(PersonV1(3, "Mace", "Windu", age: 40));
    });
    realmV1.close();
  });
  late Realm realmToTearDown;
  tearDown(() {
    cleanUpRealm(realmToTearDown);
  });
  group("Migrations - ", () {
    test("Delete type", () {
      // :snippet-start: migration-delete-type
      Configuration configWithoutPerson = Configuration.local([Car.schema],
          schemaVersion: 2,
          // :remove-start:
          path: realmPath,
          // :remove-end:
          migrationCallback: ((migration, oldSchemaVersion) {
        // Between v1 and v2 we removed the Person type
        migration.deleteType('Person');
      }));
      Realm realmWithoutPerson = Realm(configWithoutPerson);
      // :snippet-end:
      realmToTearDown = realmWithoutPerson; // set for tear down
      expect(realmWithoutPerson.schema.first.name, "Car");
      expect(realmWithoutPerson.schema.length, 1);
    });
  });
  test("Rename property", () {
    // :snippet-start: migrations-rename-property
    Configuration configWithRenamedAge =
        Configuration.local([Person.schema, Car.schema],
            schemaVersion: 2,
            // :remove-start:
            path: realmPath,
            // :remove-end:
            migrationCallback: ((migration, oldSchemaVersion) {
      // :remove-start:
      final oldPeople = migration.oldRealm.all('Person');
      for (final oldPerson in oldPeople) {
        final newPerson = migration.findInNewRealm<Person>(oldPerson);
        if (newPerson == null) {
          // That person must have been deleted, so nothing to do.
          continue;
        }
        newPerson.fullName = oldPerson.dynamic.get<String>("firstName") +
            " " +
            oldPerson.dynamic.get<String>("lastName");
        final oldIdBytes = oldPerson.dynamic.get<int>("id");
        newPerson.id = ObjectId.fromValues(0, 0, oldIdBytes);
      }
      // :remove-end:
      // Between v1 and v2 we renamed the Person 'age' property to 'yearsSinceBirth'
      migration.renameProperty('Person', 'age', 'yearsSinceBirth');
    }));
    Realm realmWithRenamedAge = Realm(configWithRenamedAge);
    // :snippet-end:
    realmToTearDown = realmWithRenamedAge; // set for tear down
    final maceWindu =
        realmWithRenamedAge.query<Person>("fullName == 'Mace Windu'").first;
    expect(maceWindu.yearsSinceBirth, 40);
  });
  test("Other migration tasks", () {
    // :snippet-start: migrations-other
    Configuration configWithChanges =
        Configuration.local([Person.schema, Car.schema],
            schemaVersion: 2,
            // :remove-start:
            path: realmPath,
            // :remove-end:
            migrationCallback: ((migration, oldSchemaVersion) {
      // Dynamic query for all Persons in previous schema
      final oldPeople = migration.oldRealm.all('Person');
      for (final oldPerson in oldPeople) {
        // Find Person instance in the updated realm
        final newPerson = migration.findInNewRealm<Person>(oldPerson);
        if (newPerson == null) {
          // That person must have been deleted, so nothing to do.
          continue;
        }
        // Use dynamic API to get properties from old schema and use in the
        // new schema
        newPerson.fullName = oldPerson.dynamic.get<String>("firstName") +
            " " +
            oldPerson.dynamic.get<String>("lastName");
        // convert `id` from int to ObjectId
        final oldId = oldPerson.dynamic.get<int>("id");
        newPerson.id = ObjectId.fromValues(0, 0, oldId);
      }
      // :remove-start:
      migration.renameProperty('Person', 'age', 'yearsSinceBirth');
      // :remove-end:
    }));
    Realm realmWithChanges = Realm(configWithChanges);
    // :snippet-end:
    realmToTearDown = realmWithChanges; // set for tear down
    final maceWindu =
        realmWithChanges.query<Person>("fullName == 'Mace Windu'").first;
    expect(maceWindu.yearsSinceBirth, 40);
  });
}
