// NOTE: most of the Read and Write Data page tests are currently in the quick_start_test.dart
// file, as the examples are the same.
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import '../bin/models/car.dart';
import 'utils.dart';
import 'dart:io';

part 'read_write_data_test.g.dart';

// :snippet-start: models
@RealmModel()
class _Person {
  @PrimaryKey()
  late ObjectId id;

  late String name;
}

@RealmModel()
class _Team {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Person> crew;
}
// :snippet-end:

void main() {
  group('Query Data', () {
    test('Query Object by Primary Key', () {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);

      final lukePrimaryKey = ObjectId();
      realm.write(() => realm.add(Person(lukePrimaryKey, "Luke")));

      // :snippet-start: query-object-by-pk
      final luke = realm.find<Person>(lukePrimaryKey);
      // :snippet-end:
      expect(luke, isNotNull);
      expect(luke!.name, 'Luke');
      cleanUpRealm(realm);
    });
    test('Query All Objects', () {
      final config = Configuration.local([Person.schema]);
      final realm = Realm(config);

      final lukePrimaryKey = ObjectId();
      realm.write(() => realm.add(Person(lukePrimaryKey, "Luke")));

      // :snippet-start: query-all-objects
      final people = realm.all<Person>();
      // :snippet-end:
      expect(people.length, 1);
      cleanUpRealm(realm);
    });
    test("Query List of Realm Objects", () {
      // :snippet-start: query-realm-list
      final config = Configuration.local([Person.schema, Team.schema]);
      final realm = Realm(config);
      final heroes = Team(ObjectId(), 'Millenium Falcon Crew', crew: [
        Person(ObjectId(), 'Luke'),
        Person(ObjectId(), 'Leia'),
        Person(ObjectId(), 'Han'),
        Person(ObjectId(), 'Chewbacca')
      ]);
      realm.write(() => realm.add(heroes));

      final lukeAndLeia = heroes.crew.query('name BEGINSWITH \$0', ['L']);
      // :snippet-end:
      expect(lukeAndLeia.length, 2);
      expect(lukeAndLeia.query("name == 'Luke'").length, 1);
      realm.write(() {
        realm.deleteMany(realm.all<Person>());
        realm.deleteMany(realm.all<Team>());
      });
      cleanUpRealm(realm);
    });
    test("Filter Results", () {
      final config = Configuration.local([Person.schema, Team.schema]);
      final realm = Realm(config);
      final heroes = Team(ObjectId(), 'Millennium Falcon Crew', crew: [
        Person(ObjectId(), 'Luke'),
        Person(ObjectId(), 'Leia'),
        Person(ObjectId(), 'Han'),
        Person(ObjectId(), 'Chewbacca')
      ]);
      realm.write(() => realm.add(heroes));
      // :snippet-start: filter
      final team =
          realm.query<Team>('name == \$0', ['Millennium Falcon Crew']).first;
      final humanCrewMembers = team.crew.query('name != \$0', ['Chewbacca']);
      // :snippet-end:
      expect(team.name, 'Millennium Falcon Crew');
      expect(humanCrewMembers.length, 3);
      cleanUpRealm(realm);
    });
    test("Sort Results", () {
      final config = Configuration.local([Person.schema, Team.schema]);
      final realm = Realm(config);
      // :snippet-start: sort
      realm.write(() {
        realm.addAll([
          Person(ObjectId(), 'Luke'),
          Person(ObjectId(), 'Leia'),
          Person(ObjectId(), 'Han'),
          Person(ObjectId(), 'Chewbacca')
        ]);
      });

      final alphabetizedPeople =
          realm.query<Person>('TRUEPREDICATE SORT(name ASC)');
      for (var person in alphabetizedPeople) {
        print(person.name);
      }
      // prints 'Chewbacca', 'Han', 'Leia', 'Luke'
      // :snippet-end:
      expect(alphabetizedPeople.first.name, 'Chewbacca');
      expect(alphabetizedPeople.last.name, 'Luke');
      cleanUpRealm(realm);
    });
  });
  test('Return from write block', () {
    final config = Configuration.local([Person.schema]);
    final realm = Realm(config);

    // :snippet-start: return-from-write
    final yoda = realm.write<Person>(() {
      return realm.add(Person(ObjectId(), 'Yoda'));
    });
    // :snippet-end:
    expect(yoda.name, 'Yoda');
    cleanUpRealm(realm);
  });

  test("Create an Object", () {
    final config = Configuration.local([Person.schema]);
    final realm = Realm(config);
    // :snippet-start: create-object
    realm.write(() {
      realm.add(Person(ObjectId(), 'Lando'));
    });
    // :snippet-end:
    expect(realm.all<Person>().first.name, 'Lando');
    cleanUpRealm(realm);
  });
  test("Create Multiple Objects", () {
    final config = Configuration.local([Person.schema]);
    final realm = Realm(config);
    // :snippet-start: create-multiple-objects
    realm.write(() {
      realm.addAll([
        Person(ObjectId(), 'Figrin D\'an'),
        Person(ObjectId(), 'Greedo'),
        Person(ObjectId(), 'Toro')
      ]);
    });
    // :snippet-end:
    expect(realm.all<Person>().length, 3);
    cleanUpRealm(realm);
  });
  test("Update Object Properties", () {
    final config = Configuration.local([Person.schema, Team.schema]);
    final realm = Realm(config);
    final spaceshipTeam = Team(ObjectId(), 'Millennium Falcon Crew',
        crew: [Person(ObjectId(), 'Han'), Person(ObjectId(), 'Chewbacca')]);
    realm.write(() => realm.add(spaceshipTeam));
    // :snippet-start: update-object
    realm.write(() {
      spaceshipTeam.name = 'Galactic Republic Scout Team';
      spaceshipTeam.crew
          .addAll([Person(ObjectId(), 'Luke'), Person(ObjectId(), 'Leia')]);
    });
    // :snippet-end:
    expect(spaceshipTeam.name, 'Galactic Republic Scout Team');
    expect(spaceshipTeam.crew.length, 4);
    cleanUpRealm(realm);
  });

  test('Upsert data', () {
    final config = Configuration.local([Person.schema]);
    final realm = Realm(config);
    // :snippet-start: upsert
    final id = ObjectId();
    // Add Anakin Skywalker to the realm with primary key `id`
    final anakin = Person(
      id,
      "Anakin Skywalker",
    );
    realm.write(() {
      realm.add<Person>(anakin);
    });

    // Overwrite the 'Anakin' Person object
    // with a new 'Darth Vader' object
    final darthVader = Person(id, 'Darth Vader');
    realm.write(() {
      realm.add<Person>(darthVader, update: true);
    });
    // :snippet-end:
    final darthAnakin = realm.find<Person>(id);
    expect(darthAnakin!.name, 'Darth Vader');
    cleanUpRealm(realm);
  });
  test("Delete a single object", () {
    final config = Configuration.local([Person.schema]);
    final realm = Realm(config);
    final obiWan =
        realm.write((() => realm.add(Person(ObjectId(), 'Obi-Wan'))));
    expect(realm.all<Person>().length, 1);
    // :snippet-start: delete-one-object
    realm.write(() {
      realm.delete(obiWan);
    });
    // :snippet-end:
    expect(realm.all<Person>().length, 0);
    cleanUpRealm(realm);
  });
  test("Delete multiple objects", () {
    final config = Configuration.local([Person.schema]);
    final realm = Realm(config);
    final obiWan =
        realm.write((() => realm.add(Person(ObjectId(), 'Obi-Wan'))));
    final quiGon =
        realm.write((() => realm.add(Person(ObjectId(), 'Qui-Gon'))));
    expect(realm.all<Person>().length, 2);
    // :snippet-start: delete-multiple-objects
    realm.write(() {
      realm.deleteMany([obiWan, quiGon]);
    });
    // :snippet-end:
    expect(realm.all<Person>().length, 0);
    cleanUpRealm(realm);
  });
  test("Delete all objects of a type", () {
    final config = Configuration.local([Person.schema]);
    final realm = Realm(config);
    realm.write(
      () => realm.addAll<Person>(
          [Person(ObjectId(), 'Boba Fett'), Person(ObjectId(), 'Jango Fett')]),
    );
    expect(realm.all<Person>().length, 2);
    // :snippet-start: delete-all-objects-of-type
    realm.write(() {
      realm.deleteAll<Person>();
    });
    // :snippet-end:
    expect(realm.all<Person>().length, 0);
    cleanUpRealm(realm);
  });

  test('Write async', () async {
    final config = Configuration.local([Person.schema]);
    final realm = Realm(config);
    // :snippet-start: write-async
    // Add Leia to the realm using `writeAsync`
    Person leia = Person(ObjectId(), "Leia");
    realm.writeAsync(() {
      realm.add<Person>(leia);
    });
    // :snippet-end:
    final leiaAgain = realm.query<Person>("name == \$0", ['Leia']);
    expect(leiaAgain.length, 0);
    expect(realm.isInTransaction, true);
    // let transaction resolve
    await Future.delayed(Duration(milliseconds: 500));
    expect(realm.isInTransaction, false);
    expect(realm.query<Person>("name == \$0", ['Leia']).length, 1);
    cleanUpRealm(realm);
  });
}
