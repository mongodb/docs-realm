import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'package:path/path.dart';
import './utils.dart';
import './schemas.dart';

late App app;
late Realm realm;
late User currentUser;
const APP_ID = "flutter-flexible-luccm";

void main() {
  group('Sync multiple processes', () {
    setUpAll(() async {
      AppConfiguration appConfig = AppConfiguration(APP_ID);
      app = App(appConfig);
      Credentials credentials =
          Credentials.emailPassword("lisa@example.com", "abc123");
      currentUser = await app.logIn(credentials);
    });
    tearDownAll(() async {
      await app.currentUser?.logOut();
    });
    test("Sync multiple processes", () {
      // Same realm file location as secondary process
      String realmPath =
          path.join(Configuration.defaultStoragePath, 'synced.realm');

      Configuration flexibleConfig =
          Configuration.flexibleSync(currentUser, schema, path: realmPath);
      Realm realmWithSync = Realm(flexibleConfig);
    });
  });
}
