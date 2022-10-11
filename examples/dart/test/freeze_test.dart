import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';
import './utils.dart';
import './schemas.dart';

void main() {
  group("Frozen Objects - ", () {
    late Realm realmToTearDown;
    tearDown(() {
      cleanUpRealm(realmToTearDown);
    });
    test("Freeze a realm", () {
      // :snippet-start; freeze-realm
      final config = Configuration.local([Person.schema, Scooter.schema]);
      Realm realm = Realm(config);
      // Add scooter ownded by Mace Windu
      final maceWindu = Person(1, "Mace", "Windu");
      final purpleScooter = Scooter(1, "Purple scooter", owner: maceWindu);
      realm.write(() {
        realm.add(purpleScooter);
      });
      // Create frozen snapshot of realm
      final frozenRealm = realm.freeze();

      // Update data in the realm
      final quiGonJinn = Person(2, "Qui-Gon", "Jinn");
      realm.write(() {
        purpleScooter.owner = quiGonJinn;
      });

      // Data changes not in the frozen snapshot
      final purpleScooterFrozen = frozenRealm.find<Scooter>(1);
      print(purpleScooterFrozen!.owner!.firstName); // prints 'Mace'
      // :snippet-end:
      final purpleScooterLive = realm.find<Scooter>(1);
      expect(purpleScooterLive!.owner!.firstName, 'Qui-Gon');
      expect(purpleScooterFrozen.owner!.firstName, 'Mace');
      realmToTearDown = realm;
      frozenRealm.close();
    });
    test("Freeze RealmResults", () {});
    test("Freeze a RealmObject", () {});
    test("Freeze a List in a RealmObject", () {});
    test("Check if data is frozen", () {});
  });
}
