@Skip('hmm')
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'package:path/path.dart' as path;
import './utils.dart';
import './open_flexible_sync_realm_test.dart';

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
    // Note: This test doesn't actually test what is being documented, b/c the
    // documentation is about working across multiple processes and it's not
    // intuitive to do that within a unit test (which runs in only 1 process)
    test("Sync multiple processes", () {
      final schema = [Tricycle.schema];
      // :snippet-start: main-process
      // Same realm file location as secondary process
      String realmPath =
          path.join(Configuration.defaultStoragePath, 'synced1234.realm');

      Configuration flexibleConfig =
          Configuration.flexibleSync(currentUser, schema, path: realmPath);
      Realm realmWithSync = Realm(flexibleConfig);
      // :snippet-end:
      // :snippet-start: secondary-process
      // Same realm file location as primary process
      final sameRealmPath =
          path.join(Configuration.defaultStoragePath, 'synced.realm');

      final disconnectedSyncConfig =
          Configuration.disconnectedSync(schema, path: sameRealmPath);
      Realm realmWithDisconnectedSync = Realm(disconnectedSyncConfig);
      // :snippet-end:
      realmWithSync.write(() => Tricycle(1, 'MyTri'));
      final myTri = realmWithDisconnectedSync.all<Tricycle>()[0];
      expect(myTri.name, 'MyTri');
      realmWithDisconnectedSync.close();
      realmWithSync.close();
      // since both realm connections are only for 1 realm, this deletes both
      Realm.deleteRealm(realmPath);
    });
  });
}
