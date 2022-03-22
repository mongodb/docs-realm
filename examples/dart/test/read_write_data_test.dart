// NOTE: most of the Read and Write Data page tests are currenty in the quick_start_test.dart
// file, as the examples are the same.
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';

part 'read_write_data_test.g.dart';

@RealmModel()
class _Person {
  @PrimaryKey()
  late String name;
}

@RealmModel()
class _Team {
  @PrimaryKey()
  late String name;

  late List<_Person> crew;
}

void main() {
  group('Query Data', () {
    test("Query List of Realm Objects", () {
      // :snippet-start: query-realm-list
      final config = Configuration([Person.schema, Team.schema]);
      final realm = Realm(config);
      final heroes = Team('Millenium Falcon Crew', crew: [
        Person('Luke'),
        Person('Leia'),
        Person('Han'),
        Person('Chewbacca')
      ]);
      realm.write(() => realm.add(heroes));

      final lukeAndLeia = (heroes.crew).query(r'name BEGINSWITH $0', ['L']);
      // :snippet-end:
      expect(lukeAndLeia.length, 2);
      expect(lukeAndLeia.query("name == 'Luke'").length, 1);
      realm.write(() {
        realm.deleteMany(realm.all<Person>());
        realm.deleteMany(realm.all<Team>());
      });
    });
  });
}
