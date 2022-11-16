import 'package:test/test.dart';
import '../bin/models/car.dart';
import 'package:realm_dart/realm.dart';

import 'utils.dart';

void main() {
  group('CRUD Operations', () {
    setUpAll(() {
      final realm = Realm(Configuration.local([Car.schema]));
      realm.write(() {
        realm.deleteAll<Car>();
      });
      realm.close();
      Realm.deleteRealm(realm.config.path);
    });
    tearDownAll(() {
      final realm = Realm(Configuration.local([Car.schema]));
      realm.write(() {
        realm.deleteAll<Car>();
      });
      realm.close();
      Realm.deleteRealm(realm.config.path);
    });
    test('Create Realm Object', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);
      Car? addedCar;
      // :snippet-start: create-realm-object
      final car = Car(ObjectId(), 'Tesla', model: 'Model S', miles: 42);
      realm.write(() {
        addedCar = realm.add(car); // :remove:
        // :uncomment-start:
        //realm.add(car);
        // :uncomment-end:
      });
      // :snippet-end:
      expect(addedCar == car, true);
      realm.write(() {
        realm.delete(car); // clean up
      });
      realm.close();
    });

    test("Create Many Realm Objects", () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);

      // :snippet-start: create-many-realm-objects
      final car1 = Car(ObjectId(), 'Honda', model: 'Accord', miles: 42);
      final car2 = Car(ObjectId(), 'Audi', model: 'A4', miles: 42);
      realm.write(() {
        realm.addAll<Car>([car1, car2]);
      });
      // :snippet-end:
      expect(realm.all<Car>().length, 2);
      cleanUpRealm(realm);
    });

    test('Query All Realm Objects', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);

      realm.write(() {
        realm.add(Car(ObjectId(), 'Tesla', model: 'Model Y', miles: 42));
      });
      // :snippet-start: query-all-realm-objects
      final cars = realm.all<Car>();
      final myCar = cars[0];
      print('My car is ${myCar.make} ${myCar.model}');
      // :snippet-end:
      expect(myCar.miles, 42);
      expect(myCar.make, 'Tesla');
      expect(myCar.model, 'Model Y');
      realm.write(() {
        realm.deleteMany(cars); // clean up
      }); // clean up
      realm.close();
    });
    test('Query Realm Objects with Filter', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);
      realm.write(() {
        realm.add(Car(ObjectId(), 'Tesla', model: 'Model Y', miles: 42));
        realm.add(Car(ObjectId(), 'Toyota', model: 'Prius', miles: 99));
      });
      // :snippet-start: query-realm-objects-with-filter
      final cars = realm.all<Car>().query('make == "Tesla"');
      // :snippet-end:
      expect(cars.length, 1);
      expect(cars[0].make, 'Tesla');
      realm.write(() {
        realm.deleteMany(realm.all<Car>());
      }); // clean up
      realm.close();
    });

    test('Query Realm Objects with Sort', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);
      // :snippet-start: query-realm-objects-with-sort
      realm.write(() {
        realm.add(Car(ObjectId(), 'BMW', model: 'Z4', miles: 42));
        realm.add(Car(ObjectId(), 'Audi', model: 'A8', miles: 99));
        realm.add(Car(ObjectId(), 'Mercedes', model: 'G-Wagon', miles: 2));
      });
      final sortedCars = realm.query<Car>('TRUEPREDICATE SORT(model ASC)');
      for (var car in sortedCars) {
        print(car.model);
      }
      // prints 'A8', 'G-Wagon', 'Z4'
      // :snippet-end:

      final resultNames = sortedCars.map((p) => p.model).toList();
      final sortedNames = [...resultNames]..sort();
      expect(resultNames, sortedNames);
      realm.write(() {
        realm.deleteMany(sortedCars);
      });
      realm.close();
    });

    test('Update Realm Object', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);

      final car = Car(ObjectId(), 'Tesla', model: 'Model Y', miles: 42);
      realm.write(() {
        realm.add(car);
      });
      // :snippet-start: update-realm-object
      realm.write(() {
        car.miles = 99;
      });
      // :snippet-end:
      expect(car.miles, 99);
      expect(car.make, 'Tesla');
      expect(car.model, 'Model Y');
      realm.write(() {
        realm.delete(car); // clean up
      });
      realm.close();
    });

    test('Delete One Realm Object', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);

      final car = Car(ObjectId(), 'Tesla', model: 'Model Y', miles: 42);
      realm.write(() {
        realm.add(car);
      });
      // :snippet-start: delete-one-realm-object
      realm.write(() {
        realm.delete(car);
      });
      // :snippet-end:
      var cars = realm.all<Car>();
      expect(cars.length, 0);
      realm.close();
    });
    test('Delete Many Realm Objects', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);

      realm.write(() {
        realm.add(Car(ObjectId(), 'Tesla', model: 'Model Y', miles: 42));
        realm.add(Car(ObjectId(), 'Toyota', model: 'Prius', miles: 99));
      });
      var cars = realm.all<Car>();
      // :snippet-start: delete-many-realm-objects
      realm.write(() {
        realm.deleteMany(cars);
      });
      // :snippet-end:
      expect(cars.length, 0);
      realm.close();
    });
  });
}
