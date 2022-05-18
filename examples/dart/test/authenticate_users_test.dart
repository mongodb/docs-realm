import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';

const APP_ID = "example-testers-kvjdy";

void main() {
  late App app;
  setUpAll(() {
    app = App(AppConfiguration(APP_ID));
  });
  tearDown(() async {
    if (app.currentUser != null) {
      await app.currentUser?.logOut();
    }
  });

  group('Log in user - ', () {
    test("Anonymous user", () async {
      // :snippet-start: anonymous-credentials
      Credentials anonCredentials = Credentials.anonymous();
      await app.logIn(anonCredentials);
      // :snippet-end:
      expect(app.currentUser != null, true);
      expect(anonCredentials.provider, AuthProviderType.anonymous);
    });
    test("Email/password user", () async {
      // :snippet-start: email-password-credentials
      Credentials emailPwCredentials =
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd");
      await app.logIn(emailPwCredentials);
      // :snippet-end:
      expect(app.currentUser != null, true);
      expect(emailPwCredentials.provider, AuthProviderType.emailPassword);
    }, skip: 'must be manually validated');
  });
  test("Log out user", () async {
    Credentials anonCredentials = Credentials.anonymous();
    User user = await app.logIn(anonCredentials);
    // :snippet-start: log-out
    await user.logOut();
    // :snippet-end:
    expect(app.currentUser, null);
  });
  test("Retrieve current user", () async {
    Credentials anonCredentials = Credentials.anonymous();
    await app.logIn(anonCredentials);
    // :snippet-start: retrieve-current-user
    User? user = app.currentUser;
    // :snippet-end:
    expect(app.currentUser?.id.isNotEmpty, true);
  });
}
