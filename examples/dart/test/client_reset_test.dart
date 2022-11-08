import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';
import 'schemas.dart';
import 'utils.dart';

const APP_ID = "flex-config-tester-vwevn";
main() {
  late App app;
  final schema = [Car.schema];
  late User currentUser;
  setUpAll(() async {
    app = App(AppConfiguration(APP_ID));
    currentUser = await app.logIn(Credentials.anonymous());
  });
  tearDownAll(() async {
    await app.currentUser?.logOut();
  });
  group('Client Reset tests', () {
    test("Recover or discard mode", () async {
      // :snippet-start: recover-or-discard
      final config = Configuration.flexibleSync(currentUser, schema,
          clientResetHandler: RecoverOrDiscardUnsyncedChangesHandler(
            // All the following callbacks are optional
            onBeforeReset: (beforeResetRealm) {
              // Executed before the client reset begins.
              // Can be used to notify the user that a reset is going
              // to happen.
            },
            onAfterRecovery: (beforeResetRealm, afterResetRealm) {
              // Executed if and only if the automatic recovery has succeeded.
            },
            onAfterDiscard: (beforeResetRealm, afterResetRealm) {
              // Executed if the automatic recovery has failed
              // but the discard unsynced changes fallback has completed
              // successfully.
            },
            onManualResetFallback: (clientResetError) {
              // Automatic reset failed. Handle the reset manually here.
              // Refer to the "Manual Client Reset Fallback" documentation
              // for more information on what you can include here.
            },
          ));
      // :snippet-end:
    });
    test("Recover mode", () async {
      // :snippet-start: recover
      final config = Configuration.flexibleSync(currentUser, schema,
          clientResetHandler: RecoverUnsyncedChangesHandler(
            // All the following callbacks are optional
            onBeforeReset: (beforeResetRealm) {
              // Executed before the client reset begins.
              // Can be used to notify the user that a reset is going
              // to happen.
            },
            onAfterReset: (beforeResetRealm, afterResetRealm) {
              // Executed after the client reset is complete.
              // Can be used to notify the user that the reset is done.
            },

            onManualResetFallback: (clientResetError) {
              // Automatic reset failed. Handle the reset manually here.
              // Refer to the "Manual Client Reset Fallback" documentation
              // for more information on what you can include here.
            },
          ));
      // :snippet-end:
    });
    test("Discard mode", () async {
      // :snippet-start: discard
      final config = Configuration.flexibleSync(currentUser, schema,
          clientResetHandler: DiscardUnsyncedChangesHandler(
            onBeforeReset: (beforeResetRealm) {
              // Executed before the client reset begins.
              // Can be used to notify the user that a reset is going
              // to happen.
            },
            onAfterReset: (beforeResetRealm, afterResetRealm) {
              // Executed after the client reset is complete.
              // Can be used to notify the user that the reset is done.
            },
            onManualResetFallback: (clientResetError) {
              // Automatic reset failed. Handle the reset manually here.
              // Refer to the "Manual Client Reset Fallback" documentation
              // for more information on what you can include here.
            },
          ));
      // :snippet-end:
    });
    test("Manual client reset fallback", () async {
      bool showUserAConfirmationDialog() => true;
      // :snippet-start: manual-fallback
      late Realm realm;
      final config = Configuration.flexibleSync(currentUser, schema,

          // This example uses the `RecoverOrDiscardUnsyncedChangesHandler`,
          // but the same logic could also be used with the `RecoverUnsyncedChangesHandler`
          // or the `DiscardUnsyncedChangesHandler`.
          clientResetHandler: RecoverOrDiscardUnsyncedChangesHandler(
        onManualResetFallback: (clientResetError) {
          // Prompt user to perform a client reset immediately. If they don't,
          // they won't receive any data from the server until they restart the app
          // and all changes they make will be discarded when the app restarts.
          var didUserConfirmReset = showUserAConfirmationDialog();
          if (didUserConfirmReset) {
            // Close the Realm before doing the reset. It must be
            // deleted as part of the reset.
            final realmPath = realm.config.path;
            realm.close();
            Realm.deleteRealm(realmPath);

            // Attempt the client reset.
            try {
              clientResetError.resetRealm();
              // Navigate the user back to the main page or reopen the
              // the Realm and reinitialize the current page.

            } catch (err) {
              // Reset failed.
              // Notify user that they'll need to update the app
            }
          }
        },
      ));
      // :snippet-end:
      realm = Realm(config);
      cleanUpRealm(realm);
    });
    test("Manual recovery mode", () async {
      // :snippet-start: manual
      final config = Configuration.flexibleSync(currentUser, schema,
          clientResetHandler: ManualRecoveryHandler((clientResetError) {
        // Handle manual client reset here.
      }));
      // :snippet-end:
    });
  });
}
