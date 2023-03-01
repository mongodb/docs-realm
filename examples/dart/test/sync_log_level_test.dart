import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './schemas.dart';
import 'utils.dart';

const APP_ID = "flutter-flexible-luccm";
final SCHEMA_OBJECTS = [SyncSchema.schema];
main() async {
  test("Add custom sync logger", () async {
    // :snippet-start: log-level
    // Must set log level before opening synced realm.
    Realm.logger.level = RealmLogLevel.error;

    // Initialize app and user before can open synced realm.
    final app = App(AppConfiguration(APP_ID));
    final user = await app.logIn(Credentials.anonymous());

    // Synced realm writes logs according to log level set above.
    final realm = Realm(Configuration.flexibleSync(user, SCHEMA_OBJECTS));
    // :snippet-end:
    expect(Realm.logger.level, RealmLogLevel.error);
    cleanUpRealm(realm, app);
  });
}
