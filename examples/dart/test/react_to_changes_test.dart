// @Skip('currently making whole suite fail due to unknown issues')

import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';
part 'react_to_changes_test.g.dart';

// :snippet-start: sample-data-models
@RealmModel()
class _Character {
  @PrimaryKey()
  late String name;

  late String species;
  late int age;
}

@RealmModel()
class _Fellowship {
  @PrimaryKey()
  late String name;

  late List<_Character> members;
}
// :snippet-end:

void main() {
  group('change listeners', () {
    // :snippet-start: sample-data-seed
    final frodo = Character('Frodo', 'Hobbit', 51);
    final samwise = Character('Samwise', 'Hobbit', 39);
    final gollum = Character('Gollum', 'Hobbit', 589);
    final aragorn = Character('Aragorn', 'Human', 87);
    final legolas = Character('Legolas', 'Elf', 2931);
    final gimli = Character('Gimli', 'Dwarf', 140);

    final fellowshipOfTheRing = Fellowship('Fellowship of the Ring',
        members: [frodo, samwise, aragorn, legolas, gimli]);

    final config = Configuration([Fellowship.schema, Character.schema]);
    final realm = Realm(config);

    realm.write(() {
      realm.add(fellowshipOfTheRing);
      realm.add(gollum); // not in fellowship
    });
    // :snippet-end:
    tearDownAll(() {
      realm.close();
      Realm.deleteRealm(realm.config.path);
    });

    test("Query change listener", () async {
      // :snippet-start: query-change-listener
      // Listen for changes on whole collection
      final characters = realm.all<Character>();
      final subscription = characters.changes.listen((changes) {
        changes.inserted; // indexes of inserted properties
        changes.modified; // indexes of modified properties
        changes.deleted; // indexes of deleted properties
        changes.newModified; // indexes of modified properties
        // after deletions and insertions are accounted for.
        changes.moved; // indexes of moved properties
        changes.results; // the full List of properties
      });

      // Listen for changes on RealmResults
      final hobbits = fellowshipOfTheRing.members.query('species == "Hobbit"');
      final hobbitsSubscription = hobbits.changes.listen((changes) {
        // ... all the same data as above
      });
      // :snippet-end:
      await Future<void>.delayed(Duration(milliseconds: 10));
      // :snippet-start: pause-resume-subscription
      subscription.pause();
      // the changes.listen() method won't fire until the subscription is resumed
      subscription.resume();
      // :snippet-end:
      await Future<void>.delayed(Duration(milliseconds: 10));

      // :snippet-start: cancel-subscription
      await subscription.cancel();
      // :snippet-end:
      await hobbitsSubscription.cancel();
    });
    test("RealmObject change listener", () async {
      // :snippet-start: realm-object-change-listener
      final frodoSubscription = frodo.changes.listen((changes) {
        changes.isDeleted; // if the object has been deleted
        changes.object; // the RealmObject being listened to, `frodo`
        changes.properties; // the changed properties
      });
      // :snippet-end:
      await Future<void>.delayed(Duration(milliseconds: 10));

      await frodoSubscription.cancel();
    });
    test("RealmList change listener", () async {
      // :snippet-start: realm-list-change-listener
      final fellowshipSubscription =
          fellowshipOfTheRing.members.changes.listen((changes) {
        changes.inserted; // indexes of inserted Realm objects
        changes.modified; // indexes of modified Realm objects
        changes.deleted; // indexes of deleted Realm objects
        changes.newModified; // indexes of modified Realm objects
        // after deletions and insertions are accounted for.
        changes.moved; // indexes of moved Realm objects
        changes.list; // the full RealmList of Realm objects
      });
      // :snippet-end:
      await Future<void>.delayed(Duration(milliseconds: 10));
      await fellowshipSubscription.cancel();
    });
  });
}
