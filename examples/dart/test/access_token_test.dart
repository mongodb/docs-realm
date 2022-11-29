import 'dart:async';
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'dart:convert';

import 'sync_multiple_processes_test.dart';

void main() {
  const APP_ID = "example-testers-kvjdy";
  group('Access tokens - ', () {
    late App app;
    setUp(() async {
      final appConfig = AppConfiguration(APP_ID);
      app = App(appConfig);
      final authProvider = EmailPasswordAuthProvider(app);
      final email = "lisa@example.com";
      final password = "myStr0ngPassw0rd";
      try {
        await authProvider.registerUser(email, password);
      } catch (err) {
        print(err);
      }
      await app.logIn(Credentials.emailPassword(email, password));
    });
    tearDown(() async {
      await app.currentUser?.logOut();
    });
    test('Get access token', () {
      // :snippet-start: get-access-token
      final token = app.currentUser?.accessToken;
      //:snippet-end:
      expect(isJwt(token!), isTrue);
    });
    test("Refresh access token", () async {
      final oldToken = app.currentUser!.accessToken.toString();
      // :snippet-start: refresh-access-token
      Future<String> getValidAccessToken(User user) async {
        // An already logged in user's access token might be stale. To
        // guarantee that the token is valid, refresh it if necessary.
        await user.refreshCustomData();
        return user.accessToken;
      }
      // :snippet-end:

      final newToken = await getValidAccessToken(app.currentUser!);
      expect(oldToken == newToken, isTrue);
      expect(isJwt(newToken), isTrue);
    });
    test("Periodically refresh access token", () async {
      // :snippet-start: periodic-refresh
      // Refresh the token every 29 minutes
      Timer.periodic(Duration(minutes: 29), (_) {
        app.currentUser?.refreshCustomData();
      });
      // :snippet-end:
    });
  });
}

bool isJwt(String maybeJwt) {
  final parts = maybeJwt.split('.');
  if (parts.length != 3) {
    return false;
  }
  try {
    final payload = _decodeBase64(parts[1]);
    final payloadMap = json.decode(payload);
    if (payloadMap is! Map<String, dynamic>) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
}

String _decodeBase64(String str) {
  String output = str.replaceAll('-', '+').replaceAll('_', '/');

  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw Exception('Illegal base64url string!"');
  }

  return utf8.decode(base64Url.decode(output));
}
