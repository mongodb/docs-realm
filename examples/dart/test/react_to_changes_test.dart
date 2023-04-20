// @Skip('currently making whole suite fail due to unknown issues')

import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';
part 'react_to_changes_test.g.dart';

// :snippet-start: sample-data-models
@RealmModel()
class _Character {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late String species;
  late int age;
}

@RealmModel()
class _Fellowship {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Character> members;
}
// :snippet-end:

void main() {
  group('change listeners', () {
    late Realm globalRealm;
    late Character globalFrodo;
    late Fellowship globalFellowshipOfTheRing;
    late String globalRealmPath;
    setUpAll(() {
      // :snippet-start: sample-data-seed
      final frodo = Character(ObjectId(), 'Frodo', 'Hobbit', 51);
      final samwise = Character(ObjectId(), 'Samwise', 'Hobbit', 39);
      final gollum = Character(ObjectId(), 'Gollum', 'Hobbit', 589);
      final aragorn = Character(ObjectId(), 'Aragorn', 'Human', 87);
      final legolas = Character(ObjectId(), 'Legolas', 'Elf', 2931);
      final gimli = Character(ObjectId(), 'Gimli', 'Dwarf', 140);

      final fellowshipOfTheRing = Fellowship(
          ObjectId(), 'Fellowship of the Ring',
          members: [frodo, samwise, aragorn, legolas, gimli]);

      final config = Configuration.local([Fellowship.schema, Character.schema]);
      final realm = Realm(config);

      realm.write(() {
        realm.add(fellowshipOfTheRing);
        realm.add(gollum); // not in fellowship
      });
      // :snippet-end:
      globalRealm = realm;
      globalFrodo = frodo;
      globalFellowshipOfTheRing = fellowshipOfTheRing;
      globalRealmPath = realm.config.path;
    });

    tearDownAll(() {
      globalRealm.close();
      Realm.deleteRealm(globalRealmPath);
    });

    test("Query change listener", () async {
      final realm = globalRealm;
      final fellowshipOfTheRing = globalFellowshipOfTheRing;
      // :snippet-start: query-change-listener
      // Listen for changes on whole collection
      final characters = realm.all<Character>();
      final subscription = characters.changes.listen((changes) {
        changes.inserted; // indexes of inserted objects
        changes.modified; // indexes of modified objects
        changes.deleted; // indexes of deleted objects
        changes.newModified; // indexes of modified objects
        // after deletions and insertions are accounted for
        changes.moved; // indexes of moved objects
        changes.results; // the full List of objects
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
      final frodo = globalFrodo;
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
      final fellowshipOfTheRing = globalFellowshipOfTheRing;
      // :snippet-start: realm-list-change-listener
      final fellowshipSubscription =
          fellowshipOfTheRing.members.changes.listen((changes) {
        changes.inserted; // indexes of inserted Realm objects
        changes.modified; // indexes of modified Realm objects
        changes.deleted; // indexes of deleted Realm objects
        changes.newModified; // indexes of modified Realm objects
        // after deletions and insertions are accounted for
        changes.moved; // indexes of moved Realm objects
        changes.list; // the full RealmList of Realm objects
        // `true` after call to fellowshipOfTheRing.members.clear().
        // Otherwise false.
        changes.isCleared;
      });
      // :snippet-end:
      await Future<void>.delayed(Duration(milliseconds: 10));
      await fellowshipSubscription.cancel();
    });
  });
}
