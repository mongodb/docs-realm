import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider_shopper/models/car.dart';
import 'package:realm/realm.dart';

void main() {
  group('Open Realm', () {
    test('open a Realm', () {
      // :snippet-start: open-realm
      var config = Configuration();
      config.schema.add(Car);
      var realm = Realm(config);
      // :snippet-end:
      expect(realm.isClosed, false);
      realm.close();
    });
  });

  group('CRUD Operations', () {
    var config = Configuration();
    config.schema.add(Car);
    var realm = Realm(config);

    test('Create Realm Object', () {
      // :snippet-start: create-realm-object
      Car car;
      realm.write(() {
        car = realm.create(Car()
          ..make = 'Tesla'
          ..model = 'Model Y'
          ..kilometers = 42);
      });
      // :snippet-end:
      expect(car.kilometers, 42);
      expect(car.make, 'Tesla');
      expect(car.model, 'Model Y');
      realm.delete(car); // clean up
    });

    test('Query All Realm Objects', () {
      Car car;
      realm.write(() {
        car = realm.create(Car()
          ..make = 'Tesla'
          ..model = 'Model Y'
          ..kilometers = 42);
      });
      // :snippet-start: query-all-realm-objects
      var cars = realm.objects<Car>();
      var myCar = cars[0];
      print('My car is ${myCar.make} ${myCar.model}');
      // :snippet-end:
      expect(myCar.kilometers, 42);
      expect(myCar.make, 'Tesla');
      expect(myCar.model, 'Model Y');
      realm.delete(car); // clean up
    });
    test('Query Realm Objects with Filter', () {
      realm.write(() {
        realm.create(Car()
          ..make = 'Tesla'
          ..model = 'Model Y'
          ..kilometers = 42);
        realm.create(Car()
          ..make = 'Toyota'
          ..model = 'Prius'
          ..kilometers = 99);
      });
      // :snippet-start: query-realm-objects-with-filter
      var cars = realm.objects<Car>().where("make == 'Tesla'");
      // :snippet-end:
      expect(cars.length, 1);
      expect(cars[0].make, 'Tesla');
      realm.deleteAll(); // clean up
    });

    test('Update Realm Object', () {
      Car car;
      realm.write(() {
        car = realm.create(Car()
          ..make = 'Tesla'
          ..model = 'Model Y'
          ..kilometers = 42);
      });
      // :snippet-start: update-realm-object
      realm.write(() {
        car.kilometers = 99;
      });
      // :snippet-end:
      expect(car.kilometers, 99);
      expect(car.make, 'Tesla');
      expect(car.model, 'Model Y');
      realm.delete(car); // clean up
    });

    test('Delete One Realm Object', () {
      Car car;
      realm.write(() {
        car = realm.create(Car()
          ..make = 'Tesla'
          ..model = 'Model Y'
          ..kilometers = 42);
      });
      // :snippet-start: delete-one-realm-object
      realm.write(() {
        realm.delete(car);
      });
      // :snippet-end:
      // TODO: figure out how to best unit test
      var cars = realm.objects<Car>();
      expect(cars.length, 0);
    });
    test('Delete Many Realm Objects', () {
      realm.write(() {
        realm.create(Car()
          ..make = 'Tesla'
          ..model = 'Model Y'
          ..kilometers = 42);
        realm.create(Car()
          ..make = 'Toyota'
          ..model = 'Prius'
          ..kilometers = 99);
      });
      var cars = realm.objects<Car>().asList();
      // :snippet-start: delete-many-realm-objects
      realm.deleteMany(cars);
      // :snippet-end:
      expect(cars.length, 0);
    });
    // clean up
    realm.deleteAll();
    realm.close();
  });

  group('Listen for Changes', () {
    test('Listen to Entire Realm', () {
      // :snippet-start: listen-to-entire-realm
      // TODO(DOCSP-20150): add code example
      // :snippet-end:
    });
    test('Listen to Collection of Realm Objects', () {
      // :snippet-start: listen-to-collection-realm-objects
      // TODO(DOCSP-20150): add code example
      // :snippet-end:
    });
    test('Listen to Singe Realm Object', () {
      // :snippet-start: listen-to-single-realm-object
      // TODO(DOCSP-20150): add code example
      // :snippet-end:
    });
  });
}
