import 'package:test/test.dart';
import '../bin/models/car.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';

void main() {
  group('Open and Close a Realm', () {
    test('Open a Realm', () {
      // :snippet-start: open-realm
      var config = Configuration.local([Car.schema]);
      var realm = Realm(config);
      // :snippet-end:
      expect(realm.isClosed, false);
      // :snippet-start: close-realm
      realm.close();
      // :snippet-end:
      expect(realm.isClosed, true);
      cleanUpRealm(realm);
    });
    test('Configuration - FIFO files fallback path', () {
      // :snippet-start: fifo-file
      var config = Configuration.local([Car.schema],
          fifoFilesFallbackPath: "./fifo_folder");
      var realm = Realm(config);
      // :snippet-end:
      cleanUpRealm(realm);
    });
    group('Read-only realm', () {
      test('Configuration readOnly - reading is possible', () {
        Configuration initConfig = Configuration.local([Car.schema]);
        var realm = Realm(initConfig);
        realm.write(() => realm.add(Car("Mustang")));
        realm.close();

        // :snippet-start: read-only-realm
        var config = Configuration.local([Car.schema], isReadOnly: true);
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
        cleanUpRealm(realm);
      });
    });
    group('In-memory realm', () {
      test('Configuration inMemory - no files after closing realm', () {
        // :snippet-start: in-memory-realm
        var config = Configuration.inMemory([Car.schema]);
        var realm = Realm(config);
        // :snippet-end:
        realm.write(() => realm.add(Car('Tesla')));
        expect(Realm.existsSync(config.path), true);
        cleanUpRealm(realm);
      });
    });
  });
}
