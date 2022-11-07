import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';
import 'schemas.dart';

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
            onBeforeReset: (beforeResetRealm) {
              // TODO
            },
            onAfterDiscard: (beforeResetRealm, afterResetRealm) {
              // TODO
            },
            onAfterRecovery: (beforeResetRealm, afterResetRealm) {
              // TODO
            },
            onManualResetFallback: (clientResetError) {
              // TODO
            },
          ));
      // :snippet-end:
    });
    test("Recover mode", () async {
      // :snippet-start: recover
      final config = Configuration.flexibleSync(currentUser, schema,
          clientResetHandler: RecoverUnsyncedChangesHandler(
            onBeforeReset: (beforeResetRealm) {
              // TODO
            },
            onAfterReset: (beforeResetRealm, afterResetRealm) {
              // TODO
            },
            onManualResetFallback: (clientResetError) {
              // TODO
            },
          ));
      // :snippet-end:
    });
    test("Discard mode", () async {
      // :snippet-start: discard
      final config = Configuration.flexibleSync(currentUser, schema,
          clientResetHandler: DiscardUnsyncedChangesHandler(
            onBeforeReset: (beforeResetRealm) {
              // TODO
            },
            onAfterReset: (beforeResetRealm, afterResetRealm) {
              // TODO
            },
            onManualResetFallback: (clientResetError) {
              // TODO
            },
          ));
      // :snippet-end:
    });
    test("Manual client reset fallback", () async {
      // :snippet-start: discard
      final config = Configuration.flexibleSync(currentUser, schema,
          clientResetHandler: DiscardUnsyncedChangesHandler(
            onBeforeReset: (beforeResetRealm) {
              // TODO
            },
            onAfterReset: (beforeResetRealm, afterResetRealm) {
              // TODO
            },
            onManualResetFallback: (clientResetError) {
              // TODO -- fill in well
            },
          ));
      // :snippet-end:
    });
    test("Manual recovery mode", () async {
      // :snippet-start: manual
      final config = Configuration.flexibleSync(currentUser, schema,
          clientResetHandler: ManualRecoveryHandler((clientResetError) {
        // TODO
      }));
      // :snippet-end:
    });
  });
}
