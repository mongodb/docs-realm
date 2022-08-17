// @Skip('currently failing (see issue 1234)')

import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';

const APP_ID = "example-testers-kvjdy";

void main() {
  late App app;
  late EmailPasswordAuthProvider authProvider;
  setUpAll(() async {
    app = App(AppConfiguration(APP_ID));
    authProvider = EmailPasswordAuthProvider(app);
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
    test("Email/password user", () async {
      // :snippet-start: email-password-credentials
      Credentials emailPwCredentials =
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd");
      await app.logIn(emailPwCredentials);
      // :snippet-end:
      expect(app.currentUser != null, true);
      expect(emailPwCredentials.provider, AuthProviderType.emailPassword);
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

  test('Delete user', () async {
    await authProvider.registerUser("moe@example.com", "myStr0ngPassw0rd");
    final credentials =
        Credentials.emailPassword("moe@example.com", "myStr0ngPassw0rd");
    await app.logIn(credentials);
    // :snippet-start: delete-user
    final currentUser = app.currentUser!;
    await app.deleteUser(currentUser);
    // :snippet-end:
    expect(app.currentUser, null);
  });
}
