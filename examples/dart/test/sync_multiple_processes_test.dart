// @Skip('hmm')
import 'dart:io';

import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'package:path/path.dart' as path;
import './utils.dart';
import './open_flexible_sync_realm_test.dart';

part 'sync_multiple_processes_test.g.dart';

late App app;
late Realm realm;
late User currentUser;
const APP_ID = "flutter-flexible-luccm";

@RealmModel()
class _Person {
  @PrimaryKey()
  late String name;
}

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
  // Note: This test doesn't actually test what is being documented, b/c the
  // documentation is about working across multiple processes and it's not
  // intuitive to do that within a unit test (which runs in only 1 process)
  test("Realm.refresh()", () async {
    final realm = Realm(Configuration.local([Person.schema]));
    realm.write(() => realm.add(Person('John')));
    // :snippet-start: refresh-main-process
    // Delete object in one process
    realm.write(() {
      realm.add(Person('John'));
    });
    // :snippet-end:
    // :snippet-start: refresh-secondary-process
    // You must call realm.refresh() in the secondary process
    // before the data written in the main process registers
    // in the secondary process.
    realm.refresh();
    realm.find<Person>('John');
    // :snippet-end:
    // :snippet-start: refresh-async
    // Asynchronously refresh the realm. Once the refresh operation occurs
    // in the background.
    realm.refreshAsync();
    // :snippet-end:
    // wait for async operation to finish before clean up
    await realm.refreshAsync();

    cleanUpRealm(realm);
  });
}
