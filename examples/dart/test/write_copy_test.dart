import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'utils.dart';

part 'write_copy_test.g.dart';

@RealmModel()
class _Person {
  @PrimaryKey()
  late String name;
}

main() {
  // TODO: figure out how to handle the fact that path needs to be different
  // even tho in memory. weird to explain. might just want to use sync to local
  // or smthn.
  test("Convert in-memory realm to local realm", () {
    // :snippet-start: in-memory-to-local
    final inMemoryRealm = Realm(Configuration.inMemory([Person.schema]));
    inMemoryRealm.write(() {
      inMemoryRealm.addAll([Person("Tanya"), Person("Greg"), Person("Portia")]);
    });

    // Copy contents of `inMemoryRealm` to a new realm with `localConfig`.
    // `localConfig` uses the default file path for local realms.
    final localConfig =
        Configuration.local([Person.schema], path: 'local.realm');
    inMemoryRealm.writeCopy(localConfig);
    // Close the realm you copy when you're done working with it.
    inMemoryRealm.close();

    // Open the local realm that the data from `inMemoryRealm`
    // was just copied to with `localConfig`.
    final localRealm = Realm(localConfig);

    // Person object for "Tanya" is in `localRealm` because
    // the data was copied over with `inMemoryRealm.writeCopy()`.
    final tanya = localRealm.find<Person>("Tanya");
    // :snippet-end:
    expect(tanya, isNotNull);
    expect(tanya, isA<Person>());
    expect(localRealm.all<Person>().length, 3);
    cleanUpRealm(localRealm);
  });
  test("Convert unencrypted local realm to encrypted local realm", () {
    // :snippet-start: unencrypted-to-encrypted
    // :snippet-end:
  }, skip: 'for now...');
}
