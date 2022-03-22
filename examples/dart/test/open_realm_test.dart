import 'package:test/test.dart';
import '../bin/models/car.dart';
import 'package:realm_dart/realm.dart';

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
    });

    group('In-memory realm', () {
      test('Configuration inMemory - no files after closing realm', () {
        // :snippet-start: in-memory-realm
        var config = Configuration([Car.schema], inMemory: true);
        var realm = Realm(config);
        // :snippet-end:
        realm.write(() => realm.add(Car('Tesla')));
        realm.close();
        expect(Realm.existsSync(config.path), false);
      });

      test('Configuration inMemory can not be readOnly', () {
        Configuration config = Configuration([Car.schema], inMemory: true);
        var realm = Realm(config);

        config.isReadOnly = true;
        expect(
            () => Realm(config),
            throwsA(RealmException(
                "Realm at path '${config.path}' already opened with different read permissions")));
        realm.close();
      });
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
        realm.close();
      });

      test('Configuration readOnly - writing on read-only Realms throws', () {
        Configuration config = Configuration([Car.schema]);
        var realm = Realm(config);
        realm.close();

        config = Configuration([Car.schema], readOnly: true);
        realm = Realm(config);
        expect(
            () => realm.write(() {}),
            throwsA(RealmException(
                "Can't perform transactions on read-only Realms.")));
        realm.close();
      });
    });
    test('Configuration - FIFO files fallback path', () {
      // :snippet-start: fifo-file
      var config =
          Configuration([Car.schema], fifoFilesFallbackPath: "./fifo_folder");
      var realm = Realm(config);
      // :snippet-end:
      realm.close();
    });
  });
}
