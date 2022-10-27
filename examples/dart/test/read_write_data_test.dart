// NOTE: most of the Read and Write Data page tests are currently in the quick_start_test.dart
// file, as the examples are the same.
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import '../bin/models/car.dart';
import 'utils.dart';
import 'dart:io';

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
      final config = Configuration.local([Person.schema, Team.schema],
          path: 'rebellion.realm');
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
      realm.close();
      Realm.deleteRealm(realm.config.path);
    });
  });
  test('Return from write block', () {
    final config = Configuration.local([Car.schema]);
    final realm = Realm(config);

    // :snippet-start: return-from-write
    Car fordFusion = realm.write<Car>(() {
      return realm.add(Car('Ford', model: 'Fusion', miles: 101));
    });
    // :snippet-end:
    expect(fordFusion.make, 'Ford');
    expect(fordFusion.model, 'Fusion');
    realm.close();
    Realm.deleteRealm(realm.config.path);
  });

  test('Upsert data', () {
    final config = Configuration.local([Car.schema]);
    final realm = Realm(config);
    // :snippet-start: upsert
    // Add Toyota Prius to the realm with primary key `Toyota`
    Car newPrius = Car("Toyota", model: "Prius", miles: 0);
    realm.write(() {
      realm.add<Car>(newPrius);
    });

    // Update Toyota Prius's miles in the realm with primary key `Toyota`
    Car usedPrius = Car("Toyota", model: "Prius", miles: 500);
    realm.write(() {
      realm.add<Car>(usedPrius, update: true);
    });
    // :snippet-end:
    final prius = realm.find<Car>("Toyota");
    expect(prius!.miles, 500);
    cleanUpRealm(realm);
  });

  test('Write async', () async {
    final config = Configuration.local([Car.schema]);
    final realm = Realm(config);
    // :snippet-start: write-async
    // Add Subaru Outback to the realm using `writeAsync`
    Car newOutback = Car("Subaru", model: "Outback Touring XT", miles: 2);
    realm.writeAsync(() {
      realm.add<Car>(newOutback);
    });
    // :snippet-end:
    final outback = realm.find<Car>("Subaru");
    expect(outback, isNull);
    expect(realm.isInTransaction, true);
    // let transaction resolve
    await Future.delayed(Duration(milliseconds: 500));
    expect(realm.isInTransaction, false);
    expect(realm.find<Car>("Subaru")!.miles, 2);
    cleanUpRealm(realm);
  });
}
