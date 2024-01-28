import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import "dart:io";
import "dart:convert";
import "dart:isolate";


void main() {
  const APP_ID = "example-testers-kvjdy";

  group('App Services client - ', () {
    test('Access App client', () {
      // :snippet-start: access-app-client
      final appConfig = AppConfiguration(APP_ID);
      final app = App(appConfig);
      //:snippet-end:
      expect(app, isNotNull);
      expect(app.id, APP_ID);
    });
    test('App client advanced configuration', () {
      // :snippet-start: app-client-advanced-configuration
      final appConfig = AppConfiguration(APP_ID,
          defaultRequestTimeout: const Duration(seconds: 120)
          // ... see reference docs for all available configuration options
          );
      //:snippet-end:
      final app = App(appConfig);
      expect(app, isNotNull);
      expect(app.id, APP_ID);
      expect(appConfig.defaultRequestTimeout, Duration(seconds: 120));
    });

    test('Access App on background isolate by id', () async {
      // :snippet-start: access-app-by-id
      // Create an App instance once on main isolate,
      // ideally as soon as the app starts
      final appConfig = AppConfiguration(APP_ID);
      final app = App(appConfig);
      final appId = app.id;
      final receivePort = ReceivePort();
      // :remove-start:
      expect(app, isNotNull);
      final anonUser =
          await app.logIn(Credentials.anonymous(reuseCredentials: false));
      expect(anonUser.id, app.currentUser?.id);
      // :remove-end:

      // Later, access the App instance on background isolate
      await Isolate.spawn((List<Object> args) async {
        final sendPort = args[0] as SendPort;
        final appId = args[1] as String;

        try {
          final backgroundApp = App.getById(appId); // :emphasize:

          // ... Access App users 
          final user = backgroundApp?.currentUser!;
          expect(user, isNotNull); // :remove:

          // Use the App and user as needed.

          sendPort.send('Background task completed');
        } catch (e) {
          sendPort.send('Error: $e');
        }
      }, [receivePort.sendPort, appId]);
      // :snippet-end:

      receivePort.listen((message) {
        expect(message, equals('Background task completed'));
        receivePort.close(); 
      });
        if (app.currentUser != null) {
          app.deleteUser(anonUser);
         }
    });

    test("Custom SSL Certificate", () async {
      // :snippet-start: custom-ssl-cert
      // :uncomment-start:
      // import 'package:realm_dart/realm.dart';
      // import "dart:io";
      // import "dart:convert";
      // :uncomment-end:

      HttpClient createCustomHttpsClient(String cert) {
        SecurityContext context = SecurityContext.defaultContext;
        try {
          final bytes = utf8.encode(cert);
          context.setTrustedCertificatesBytes(bytes);
        } on TlsException catch (e) {
          final message = e.osError?.message ?? "";
          if (!message.contains('CERT_ALREADY_IN_HASH_TABLE')) {
            rethrow;
          }
        }

        return HttpClient(context: context);
      }

      App createAppWithCustomHttpsClient(
          String letsEncryptCertificate, String appId) {
        HttpClient httpClient = createCustomHttpsClient(letsEncryptCertificate);
        final appConfig = AppConfiguration(appId, httpClient: httpClient);
        return App(appConfig);
      }

      final letsEncryptCertificate = "<LET'S ENCRYPT CERTIFICATE>";
      final appId = "<YOUR APP ID>";

      final app = createAppWithCustomHttpsClient(letsEncryptCertificate, appId);
      // :snippet-end:
    },
        skip:
            """Skipping because this is quite challenging to test in our unit test suite
    because our unit tests use a version of Dart that doesn't require a custom SSL certificate.

    For more information on this, refer to https://stackoverflow.com/questions/69511057/flutter-on-android-7-certificate-verify-failed-with-letsencrypt-ssl-cert-after-s""");
  });
}
