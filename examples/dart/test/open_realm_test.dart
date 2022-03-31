import 'package:test/test.dart';
import '../bin/models/car.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';

void main() {
  group('Open and Close a Realm', () {
    test('open a Realm', () {
      // :snippet-start: open-realm
      var config = Configuration([Car.schema]);
      var realm = Realm(config);
      // :snippet-end:
      expect(realm.isClosed, false);
      // :snippet-start: close-realm
      realm.close();
      // :snippet-end:
      expect(realm.isClosed, true);
      cleanUpRealm(realm, config);
    });
    test('Configuration - FIFO files fallback path', () {
      // :snippet-start: fifo-file
      var config =
          Configuration([Car.schema], fifoFilesFallbackPath: "./fifo_folder");
      var realm = Realm(config);
      // :snippet-end:
      cleanUpRealm(realm, config);
    });
    group('Read-only realm', () {
      test('Configuration readOnly - reading is possible', () {
        Configuration initConfig = Configuration([Car.schema]);
        var realm = Realm(initConfig);
        realm.write(() => realm.add(Car("Mustang")));
        realm.close();

        // :snippet-start: read-only-realm
        var config = Configuration([Car.schema], readOnly: true);
        realm = Realm(config);
        // :snippet-end:
        var cars = realm.all<Car>();
        expect(cars.isNotEmpty, true);

        var enteredCatch = false;
        try {
          realm.write(() => realm.deleteAll<Car>());
        } catch (_err) {
          enteredCatch = true;
        }
        expect(enteredCatch, true);
        cleanUpRealm(realm, config);
      });
    });
    group('In-memory realm', () {
      test('Configuration inMemory - no files after closing realm', () {
        // :snippet-start: in-memory-realm
        var config = Configuration([Car.schema], inMemory: true);
        var realm = Realm(config);
        // :snippet-end:
        realm.write(() => realm.add(Car('Tesla')));
        expect(Realm.existsSync(config.path), true);
        cleanUpRealm(realm, config);
      });
    });
  });
}
