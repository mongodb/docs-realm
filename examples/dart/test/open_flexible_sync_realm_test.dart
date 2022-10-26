import 'dart:async';
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';
part 'open_flexible_sync_realm_test.g.dart';

@RealmModel()
class _Tricycle {
  @PrimaryKey()
  @MapTo('_id')
  late int id;

  late String name;
}

void main() {
  group('Open Flexible Sync Realm', () {
    const APP_ID = "flex-config-tester-vwevn";
    final appConfig = AppConfiguration(APP_ID);
    final app = App(appConfig);
    test("Open Flexible Sync Realm", () async {
      final credentials = Credentials.anonymous();
      // :snippet-start: open-flexible-sync-realm
      final currentUser = await app.logIn(credentials);
      final config = Configuration.flexibleSync(currentUser, [Tricycle.schema],
          path: 'flex.realm');
      final realm = Realm(config);
      // :snippet-end:
      expect(realm.isClosed, false);
      expect(app.currentUser?.id != null, true);
      await cleanUpRealm(realm, app);
      expect(realm.isClosed, true);
      expect(app.currentUser, null);
    });
    test('Async Open Flexible Sync Realm', () async {
      Credentials credentials = Credentials.anonymous();
      User currentUser = await app.logIn(credentials);
      // :snippet-start: async-open
      // Helper function to check if device is connected to the internet.
      Future<bool> isDeviceOnline() async {
        // ...logic to check if device is online
        return true; // :remove:
      }

      final config = Configuration.flexibleSync(currentUser, [Tricycle.schema]);
      // Only use asynchronous open if app is online.
      late Realm realm;
      if (await isDeviceOnline()) {
        // If the device is online, download changes and then open the realm.
        realm = await Realm.open(config);
      } else {
        // If the device is offline, open the realm immediately
        // and sync changes in the background.
        realm = Realm(config);
      }
      // :snippet-end:
      expect(realm.isClosed, false);
      cleanUpRealm(realm, app);
    });
    test('Track download progress', () async {
      Credentials credentials = Credentials.anonymous();
      User currentUser = await app.logIn(credentials);
      late int transferred;
      late int transferable;
      final config = Configuration.flexibleSync(currentUser, [Tricycle.schema]);
      // :snippet-start: async-open-track-progress
      final realm =
          await Realm.open(config, onProgressCallback: (syncProgress) {
        if (syncProgress.transferableBytes == syncProgress.transferredBytes) {
          print('All bytes transferred!');
          // :remove-start:
          transferred = syncProgress.transferredBytes;
          transferable = syncProgress.transferableBytes;
          // :remove-end:
        }
      });
      // :snippet-end:
      expect(realm.isClosed, false);
      expect(transferred, transferable);
      expect(transferred, greaterThanOrEqualTo(0));
      cleanUpRealm(realm, app);
    });
    test('Cancel download in progress', () async {
      final credentials = Credentials.anonymous();
      final currentUser = await app.logIn(credentials);
      late int transferred;
      late int transferable;
      final config = Configuration.flexibleSync(currentUser, [Tricycle.schema]);
      // :snippet-start: async-open-cancel
      final token = CancellationToken();

      // Cancel the open operation after 30 seconds.
      // Alternatively, you could display a loading dialog and bind the cancellation
      // to a button the user can click to stop the wait.
      Future<void>.delayed(
          const Duration(seconds: 30),
          () => token.cancel(CancelledException(
              cancellationReason: "Realm took too long to open")));

      // If realm does not open after 30 seconds with asynchronous Realm.open(),
      // open realm synchronously with Realm().
      late Realm realm;
      try {
        realm = await Realm.open(config, cancellationToken: token);
      } on CancelledException catch (err) {
        print(err.cancellationReason); // prints "Realm took too long to open"
        realm = Realm(config);
      }
      // :snippet-end:
      expect(token.isCancelled, false);
      cleanUpRealm(realm, app);
    });

    test("Handle Sync Error", () async {
      var handlerCalled = false;
      final credentials = Credentials.anonymous();
      final currentUser = await app.logIn(credentials);
      // :snippet-start: sync-error-handler
      Configuration config = Configuration.flexibleSync(
          currentUser, [Tricycle.schema], syncErrorHandler: (SyncError error) {
        handlerCalled = true; // :remove:
        print("Error message" + error.message.toString());
      });
      Realm realm = Realm(config);
      // :snippet-end:
      // TODO: generate SyncError to trigger `syncErrorHandler`
      await Future.delayed(Duration(milliseconds: 500));
      expect(handlerCalled, true);

      await cleanUpRealm(realm, app);
      expect(realm.isClosed, true);
      expect(app.currentUser, null);
    },
        skip:
            "Skipping because there's not a straightforward way to simulate a sync error");
  });
}
