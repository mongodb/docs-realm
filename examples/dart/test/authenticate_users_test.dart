import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import './utils.dart';

const APP_ID = "flutter-flexible-luccm";

void main() {
  late App app;
  setUpAll(() async {
    app = App(AppConfiguration(APP_ID));
    EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
    try {
      await authProvider.registerUser("lisa@example.com", "myStr0ngPassw0rd");
    } catch (err) {
      print(err);
    }
    try {
      await authProvider.registerUser("bart@example.com", "myStr0ngPassw0rd");
    } catch (err) {
      print(err);
    }
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
    test("Multiple anonymous users", () async {
      // :snippet-start: multiple-anonymous-credentials
      User anonUser = await app.logIn(Credentials.anonymous());

      User otherAnonUser =
          await app.logIn(Credentials.anonymous(reuseCredentials: false));
      // :snippet-end:
      expect(anonUser.id == otherAnonUser.id, false);
      // clean up
      await app.deleteUser(anonUser);
      await app.deleteUser(otherAnonUser);
    });
    test("Email/password user", () async {
      // :snippet-start: email-password-credentials
      Credentials emailPwCredentials =
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd");
      await app.logIn(emailPwCredentials);
      // :snippet-end:
      expect(app.currentUser != null, true);
      expect(emailPwCredentials.provider, AuthProviderType.emailPassword);
    });
    test("Custom JWT user", () async {
      Future<String> authenticateWithExternalSystem() async {
        // Create a json web token
        final jwt = JWT(
          {
            "aud": "flutter-flexible-luccm",
            "sub": "example-user3",
            "name": "Jane Floww",
            "iat": 1660769831648,
            "exp": 1660769831648 + 1000000000000000000,
          },
        );
        final token = jwt.sign(
          SecretKey('E7D8WBPZD0Q37432NG51E7D8WBPZD0Q37432NG51'),
        );
        return token;
      }

      // :snippet-start: custom-jwt-credentials
      String token = await authenticateWithExternalSystem();
      Credentials jwtCredentials = Credentials.jwt(token);
      User currentUser = await app.logIn(jwtCredentials);
      print(currentUser.id);
      // :snippet-end:
    });
    test("Custom Function user", () async {
      // :snippet-start: custom-function-credentials
      // :snippet-end:
    });
    test("Facebook user", () async {
      // :snippet-start: facebook-credentials
      // :snippet-end:
    });
    test("Google user (auth code)", () async {
      // :snippet-start: google-auth-code-credentials
      // :snippet-end:
    });
    test("Google user (ID token)", () async {
      // :snippet-start: google-id-token-credentials
      // :snippet-end:
    });
    test("Apple user", () async {
      // :snippet-start: apple-credentials
      // :snippet-end:
    });
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
  group("Email password users", () {
    test("Register a user", () async {
      // :snippet-start: register-user
      EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
      await authProvider.registerUser("lisa@example.com", "myStr0ngPassw0rd");
      // :snippet-end:
    });

    group('Email confirmation', () {
      test("Send confirmation email", () async {
        const token = '';
        const tokenId = '';
        // :snippet-start: send-confirmation-email
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.confirmUser(token, tokenId);
        // :snippet-end:
      });
      test("Retry user confirmation function", () async {
        // :snippet-start: retry-user-confirmation-function
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.retryCustomConfirmationFunction("lisa@example.com");
        // :snippet-end:
      });
      test("Retry user confirmation email", () async {
        // :snippet-start: retry-user-confirmation-email
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.resendUserConfirmation("lisa@example.com");
        // :snippet-end:
      });
    });

    group('Password reset', () {
      test("Call a password reset function", () async {
        // :snippet-start: password-reset-function
        // The password reset function takes any number of
        // arguments. You might ask the user to provide answers to
        // security questions, for example, to verify the user
        // should be able to complete the password reset.
        final args = [
          "Snowball II",
          "Springfield Elementary School",
          "Bouvier"
        ];

        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.callResetPasswordFunction(
            "lisa@example.com", "n3wSt0ngP4ssw0rd!",
            functionArgs: args);
        // :snippet-end:
      });
      test("Send a password reset email", () async {
        // :snippet-start: password-reset-email
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.resetPassword("lisa@example.com");
        // :snippet-end:
      });
      test('Confirm password reset email', () async {
        const token = '';
        const tokenId = '';
        // :snippet-start: password-reset-email-confirmation
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.completeResetPassword(
            "n3wSt0ngP4ssw0rd!", token, tokenId);
        // :snippet-end:
      });
    });
  }, skip: 'Skipping because requires user interaction/email');
  group('Work with multiple users', () {
    late User lisa;
    late User bart;
    setUpAll(() async {
      await app.logIn(Credentials.anonymous());
      lisa = await app.logIn(
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd"));
      bart = await app.logIn(
          Credentials.emailPassword("bart@example.com", "myStr0ngPassw0rd"));
    });
    tearDownAll(() async {
      for (User user in app.users) {
        await user.logOut();
      }
    });

    test('List all users on the device', () async {
      // :snippet-start: list-all-users
      Iterable<User> users = app.users;
      // :snippet-end:
      expect(users.length, 3);
    });
    test('Change the active user', () async {
      User otherUser = lisa;
      // :snippet-start: change-active-user
      app.switchUser(otherUser);
      // :snippet-end:
    });
    test('Remove a user from the device', () async {
      late var user;
      if (app.currentUser != null) {
        user = app.currentUser;
        // :snippet-start: remove-user
        await app.removeUser(user);
        // :snippet-end:
      }
    });
  });
  group('Link user credentials', () {
    test('Basic link user credentials', () async {
      User user = await app.logIn(Credentials.anonymous());
      final USERNAME = "${generateRandomString(20)}@example.com";
      final PASSWORD = generateRandomString(8);
      EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
      await authProvider.registerUser(USERNAME, PASSWORD);
      Credentials additionalCredentials =
          Credentials.emailPassword(USERNAME, PASSWORD);
      // :snippet-start: link-user-credentials
      User linkedCredentialUser =
          await user.linkCredentials(additionalCredentials);
      // :snippet-end:
      expect(linkedCredentialUser.identities.length, 2);
    });
    test("Link user credentials example", () async {
      final USERNAME = "${generateRandomString(20)}@example.com";
      final PASSWORD = generateRandomString(8);
      // :snippet-start: link-user-credentials-example
      // on app start without registration
      User anonymousUser = await app.logIn(Credentials.anonymous());

      // ... user interacts with app

      //... user decides to sign up for app with email/password auth
      EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
      await authProvider.registerUser(USERNAME, PASSWORD);

      // link email/password credentials to anonymous user's credentials
      User linkedCredentialUser = await anonymousUser
          .linkCredentials(Credentials.emailPassword(USERNAME, PASSWORD));
      // :snippet-end:
      expect(linkedCredentialUser.identities.length, 2);
    });
  });

  // TODO: once custom user data functionality is expanded, refactor below tests
  // to have more info
  group('Custom user data', () {
    late User user;
    setUp(() async {
      user = await app.logIn(
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd"));
    });
    test('Read custom user data', () async {
      // :snippet-start: read-custom-user-data
      final customUserData = user.customData;
      // :snippet-end:
      expect(customUserData, isNull);
    });
    test('Refresh custom user data', () async {
      // :snippet-start: refresh-custom-user-data
      // refreshCustomData() returns the updated custom data object
      final updatedCustomData = await user.refreshCustomData();

      // Now when you access User.customData it's the value
      // returned from User.refreshCustomData()
      // :snippet-end:
      expect(updatedCustomData, user.customData);
    });
  });
}
