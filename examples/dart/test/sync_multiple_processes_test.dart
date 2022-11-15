// @Skip('hmm')
import 'dart:io';

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
    setUp(() async {
      final appConfig = AppConfiguration(APP_ID);
      app = App(appConfig);
      final credentials =
          Credentials.emailPassword("bart@example.com", "abc123");
      currentUser = await app.logIn(credentials);
    });
    tearDown(() async {
      await currentUser.logOut();
      Realm.shutdown();
    });
    // Note: This test doesn't actually test what is being documented, b/c the
    // documentation is about working across multiple processes and it's not
    // intuitive to do that within a unit test (which runs in only 1 process)
    test("Sync multiple processes", () async {
      final schema = [Tricycle.schema];
      // :snippet-start: main-process
      // Same realm file location as secondary process
      final realmPath =
          path.join(Configuration.defaultStoragePath, 'synced.realm');

      final flexibleConfig =
          Configuration.flexibleSync(currentUser, schema, path: realmPath);
      final realmWithSync = Realm(flexibleConfig);
      // :snippet-end:
      realmWithSync.subscriptions.update((mutableSubscriptions) {
        mutableSubscriptions.add(realmWithSync.all<Tricycle>());
      });
      realmWithSync.write(() => realmWithSync.add(Tricycle(1, 'MyTri')));
      await realmWithSync.subscriptions.waitForSynchronization();
      realmWithSync.close();
      // :snippet-start: secondary-process
      // Same realm file location as primary process
      final sameRealmPath =
          path.join(Configuration.defaultStoragePath, 'synced.realm');

      final disconnectedSyncConfig =
          Configuration.disconnectedSync(schema, path: sameRealmPath);
      final realmWithDisconnectedSync = Realm(disconnectedSyncConfig);
      // :snippet-end:
      final myTri = realmWithDisconnectedSync.find<Tricycle>(1);
      expect(myTri, isNotNull);
      realmWithDisconnectedSync.close();
      // since both realm connections are only for 1 realm, this deletes both
    });
  });
}
