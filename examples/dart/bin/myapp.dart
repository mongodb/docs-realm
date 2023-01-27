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
    final user = await app.logIn(Credentials.anonymous());

    final config =
        Configuration.flexibleSync(user, [Car.schema], path: 'bundle.realm');
    final realm = Realm(config);

    // Add data to realm
    realm.write(() => realm.deleteAll<Car>()); // :remove:
    realm.write(() {
      realm.add(Car(ObjectId(), "Audi", model: 'A8'));
      realm.add(Car(ObjectId(), "Mercedes", model: 'G Wagon'));
    });

    // Sync changes with the server
    await realm.syncSession.waitForUpload();
    await realm.syncSession.waitForDownload();

    print("Bundled realm location: " + realm.config.path);
    realm.close();
    // :snippet-end:
  }

  Realm.shutdown();
}
