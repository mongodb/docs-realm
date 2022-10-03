import 'dart:io';

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
    });
  });
}
