import 'models/car.dart';
import 'package:realm_dart/realm.dart';

void main(List<String> arguments) {
  // :snippet-start: create-bundle
  print("Bundling realm");
  final config = Configuration.local([Car.schema], path: 'bundle.realm');
  final realm = Realm(config);

  realm.write(() => realm.deleteAll<Car>()); // :remove:
  realm.write(() {
    realm.add(Car(ObjectId(), "Audi", model: 'A8'));
    realm.add(Car(ObjectId(), "Mercedes", model: 'G Wagon'));
  });
  print("Bundled realm location: " + realm.config.path);
  realm.close();
  // :snippet-end:
  Future<void> createSyncedBundle() async {
    final APP_ID = '';
    // :snippet-start: create-synced-bundle
    print("Bundling synced realm");

    // You must connect to the Device Sync server with an authenticated
    // user to work with the synced realm.
    final app = App(AppConfiguration(APP_ID));
    // Check if current user exists and log anonymous user if not.
    final user = app.currentUser ?? await app.logIn(Credentials.anonymous());

    final config = Configuration.flexibleSync(user, [Car.schema]);
    final realm = Realm(config);

    // Add data to realm
    realm.write(() => realm.deleteAll<Car>()); // :remove:
    realm.write(() {
      realm.add(Car(ObjectId(), "Audi", model: 'A8'));
      realm.add(Car(ObjectId(), "Mercedes", model: 'G Wagon'));
    });

    // Create new configuration for the bundled realm.
    // You must specify a path separate from the realm you
    // are copying for Realm.writeCopy() to succeed.
    final bundledConfig =
        Configuration.flexibleSync(user, [Car.schema], path: 'bundle.realm');
    realm.writeCopy(bundledConfig);

    print("Bundled realm location: " + bundledConfig.path);
    realm.close();
    // :snippet-end:
  }

  Realm.shutdown();
}
