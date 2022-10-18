import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';
import './utils.dart';

part 'freeze_test.g.dart';

@RealmModel()
class _Person {
  @PrimaryKey()
  late int id;

  late String firstName;
  late String lastName;
  late List<String> attributes = [];
}

@RealmModel()
class _Scooter {
  @PrimaryKey()
  late int id;

  late String name;
  late _Person? owner;
}

void main() {
  group("Frozen Objects - ", () {
    late Realm realmToTearDown;
    tearDown(() {
      cleanUpRealm(realmToTearDown);
    });
    test("Freeze a realm", () {
      // :snippet-start: freeze-realm
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
      // :remove-start:
      final purpleScooterLive = realm.find<Scooter>(1);
      expect(purpleScooterLive!.owner!.firstName, 'Qui-Gon');
      expect(purpleScooterFrozen.owner!.firstName, 'Mace');
      expect(frozenRealm.isFrozen, isTrue);
      // :remove-end:
      realm.close();

      // You must also close the frozen realm before exiting the process
      frozenRealm.close();
      // :snippet-end:
      // clean up
      realmToTearDown = realm;
    });
    test("Freeze RealmResults", () {
      final config = Configuration.local([Person.schema]);
      Realm realm = Realm(config);

      // :snippet-start: freeze-realm-results
      // Add data to the realm
      final maceWindu = Person(1, "Mace", "Windu");
      final jocastaNu = Person(2, "Jocasta", "Nul");
      realm.write(() => realm.addAll([maceWindu, jocastaNu]));

      // Get RealmResults and freeze data
      RealmResults<Person> people = realm.all<Person>();
      final frozenPeople = people.freeze();

      // Update data in the non-frozen realm
      final newLastName = "Foo";
      realm.write(() {
        people.forEach((Person person) {
          person.lastName = newLastName;
        });
      });

      // Data changes not in the frozen snapshot
      final frozenFooPeople =
          frozenPeople.query("lastName == \$0", [newLastName]);
      print(frozenFooPeople.length); // prints 0
      // :remove-start:
      expect(frozenFooPeople.length, 0);
      expect(frozenFooPeople.isFrozen, isTrue);
      expect(people.query("lastName == \$0", [newLastName]).length, 2);
      // :remove-end:

      // You must also close the frozen realm associated
      // with the frozen RealmResults before exiting the process
      frozenPeople.realm.close();
      // :snippet-end:
      // clean up
      realmToTearDown = realm;
    });
    test("Freeze a RealmObject", () {
      final config = Configuration.local([Person.schema]);
      Realm realm = Realm(config);
      realm.write(() => realm.add(Person(3, "Count", "Dooku")));
      // :snippet-start: freeze-realm-object
      Person person = realm.find(3)!;

      // Freeze RealmObject
      final frozenPerson = person.freeze();

      // Change data in the unfrozen object.
      realm.write(() {
        realm.delete(person);
      });

      // Frozen person snapshot still exists even though data deleted
      // in the unfrozen realm
      print(frozenPerson.isValid); // prints true
      print(person.isValid); // prints false
      // :remove-start:
      expect(frozenPerson.isFrozen, isTrue);
      expect(frozenPerson.isValid, isTrue);
      expect(person.isValid, isFalse);
      expect(person.isFrozen, isFalse);
      // :remove-end:

      // You must also close the frozen realm associated
      // with the frozen RealmObject before exiting the process
      frozenPerson.realm.close();
      // :snippet-end:

      // clean up
      realmToTearDown = realm;
    });
    test("Freeze a List in a RealmObject", () {
      final config = Configuration.local([Person.schema]);
      Realm realm = Realm(config);
      realm.write(() => realm.add(Person(1, "Yoda", "unknown",
          attributes: ["wise", "short", "powerful"])));
      // :snippet-start: freeze-list-in-realm-object
      Person firstPerson = realm.find<Person>(1)!;

      // Freeze RealmList in a RealmObject
      RealmList<String> firstPersonAttributesFrozen =
          firstPerson.attributes.freeze();

      // Change data in the unfrozen realm
      final newAttribute = "quick";
      realm.write(() {
        // Append item to list
        firstPerson.attributes.add(newAttribute);
      });

      final index = firstPersonAttributesFrozen.indexOf(newAttribute);
      print(index); // prints -1 because cannot find new attribute
      // :remove-start:
      expect(index, -1);
      expect(firstPersonAttributesFrozen.isFrozen, isTrue);
      expect(firstPerson.attributes.isFrozen, isFalse);
      // :remove-end:

      // You must also close the frozen realm associated
      // with the frozen RealmList before exiting the process
      firstPersonAttributesFrozen.realm.close();
      // :snippet-end:

      // clean up
      realmToTearDown = realm;
    });
    test("Check if data is frozen", () {
      final config = Configuration.local([Person.schema]);
      // :snippet-start: is-frozen
      // You can check if all freezable types are frozen
      // with the `isFrozen` property.

      Realm realm = Realm(config);
      print(realm.isFrozen);
      // :remove-start:
      realm.write(() => realm.add(Person(1, "Yoda", "unknown",
          attributes: ["wise", "short", "powerful"])));
      // :remove-end:

      RealmResults people = realm.all<Person>();
      print(people.isFrozen);

      Person firstPerson = realm.find<Person>(1)!;
      print(firstPerson.isFrozen);

      RealmList<String> firstPersonAttributes = firstPerson.attributes;
      print(firstPersonAttributes.isFrozen);
      // :snippet-end:
      expect(realm.isFrozen, isFalse);
      expect(people.isFrozen, isFalse);
      expect(firstPerson.isFrozen, isFalse);
      expect(firstPersonAttributes.isFrozen, isFalse);
      realmToTearDown = realm;
    });
  });
}
