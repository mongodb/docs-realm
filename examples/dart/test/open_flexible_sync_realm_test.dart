import 'dart:io';
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
    AppConfiguration appConfig = AppConfiguration(APP_ID);
    App app = App(appConfig);
    test("Open Flexible Sync Realm", () async {
      Credentials credentials = Credentials.anonymous();
      // :snippet-start: open-flexible-sync-realm
      User currentUser = await app.logIn(credentials);
      Configuration config = Configuration.flexibleSync(
          currentUser, [Tricycle.schema],
          path: 'flex.realm');
      Realm realm = Realm(config);
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
      Configuration config =
          Configuration.flexibleSync(currentUser, [Tricycle.schema]);
      Realm fullySyncedRealm = await Realm.open(config);
      // :snippet-end:
      expect(fullySyncedRealm.isClosed, false);
      cleanUpRealm(fullySyncedRealm, app);
    });
    test('Track download progress', () async {
      Credentials credentials = Credentials.anonymous();
      User currentUser = await app.logIn(credentials);
      late int transferred;
      late int transferable;
      // :snippet-start: async-open-track-progress
      Configuration config =
          Configuration.flexibleSync(currentUser, [Tricycle.schema]);
      Realm fullySyncedRealm =
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
      expect(fullySyncedRealm.isClosed, false);
      expect(transferred, transferable);
      expect(transferred, greaterThanOrEqualTo(0));
      cleanUpRealm(fullySyncedRealm, app);
    });
    test('Cancel download in progress', () async {
      Credentials credentials = Credentials.anonymous();
      User currentUser = await app.logIn(credentials);
      late int transferred;
      late int transferable;
      // :snippet-start: async-open-cancel
      Configuration config =
          Configuration.flexibleSync(currentUser, [Tricycle.schema]);

      CancellationToken token = CancellationToken();
      Realm fullySyncedRealm =
          await Realm.open(config, cancellationToken: token);
      // Cancel operation after 5 seconds.
      Timer(
          Duration(seconds: 5),
          () => token.cancel(CancelledException(
              cancellationReason:
                  "Took too long to open realm. Aborting operation")));
      // :snippet-end:
      expect(token.isCancelled, false);
      expect(fullySyncedRealm.isClosed, false);
      cleanUpRealm(fullySyncedRealm, app);
    });

    test("Handle Sync Error", () async {
      var handlerCalled = false;
      Credentials credentials = Credentials.anonymous();
      User currentUser = await app.logIn(credentials);
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
