import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './schemas.dart' as Schemas;
import './utils.dart';

part 'migrations_test.g.dart';

typedef PersonV1 = Schemas.Person; // old schema version

@RealmModel()
@MapTo("Person")
class _PersonV2 {
  @PrimaryKey()
  late ObjectId id;

  late String fullName;
}

typedef Person
    = PersonV2; // new schema which we're testing in the code examples here

void main() {
  final realmPath = "migrations.realm";
  setUp(() {
    final configV1 = Configuration.local([PersonV1.schema], path: realmPath);
    final realmV1 = Realm(configV1);
    realmV1.write(() {
      realmV1.add<PersonV1>(PersonV1(1, "Lando", "Calrissian", age: 42));
      realmV1.add<PersonV1>(PersonV1(2, "Boba", "Fett", age: 36));
      realmV1.add<PersonV1>(PersonV1(3, "Mace", "Windu", age: 40));
    });
  });
  tearDown(() {
    Realm.deleteRealm(realmPath);
  });
  test("Migration", () {

    Configuration configV2 = Configuration.local([Person.schema],
      schemaVersion: 2,
      path: realmPath, // :remove:
      migrationCallback: (migration, oldSchemaVersion) {

      // 

      final oldPersons = migration.oldRealm.all('Person');

      var number = 0;
      for (final oldStudent in oldPersons) {
        final names = oldStudent.fullName.split(" ");
        migration.newRealm.write(() {
          migration.newRealm.add<Person>(oldStudent.id, firstName: names.first, lastName: names.last);
        }):
      }
    });
    Realm realmV2 = Realm(configV2);
  });
}
