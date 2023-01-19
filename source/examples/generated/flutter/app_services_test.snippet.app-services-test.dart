import 'package:realm/realm.dart';
import 'package:flutter_test/flutter_test.dart';

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
