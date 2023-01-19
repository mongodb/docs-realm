// :snippet-start: app-services-test
import 'package:realm/realm.dart';
import 'package:flutter_test/flutter_test.dart';

const TEST_APP_ID = 'flutter-flexible-luccm'; // :remove:
void main() {
  late App app;

  setUp(() async {
    app = App(AppConfiguration(TEST_APP_ID));
    await app.logIn(Credentials.anonymous());
  });

  // Log current user out
  tearDown(() async {
    await app.currentUser?.logOut();
    // Realm.shutdown();
  });

  test("Check user type", () {
    final user = app.currentUser!;
    expect(user.provider, AuthProviderType.anonymous);
  });
}
// :snippet-end:
