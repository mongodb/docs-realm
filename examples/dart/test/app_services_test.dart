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
      expect(app.currentUser, null);
    });
    test('App client advanced configuration', () {
      // :snippet-start: app-client-advanced-configuration
      final appConfig = AppConfiguration(APP_ID,
          defaultRequestTimeout: const Duration(seconds: 120)
          // ... see reference docs for all available configuration options
          );
      //:snippet-end:
      final app = App(appConfig);
      expect(app.currentUser, null);
      expect(appConfig.defaultRequestTimeout, Duration(seconds: 120));
    });

    test('Access App on background isolate by id', () async {
      // :snippet-start: access-app-by-id
      // Create an App instance once on main isolate,
      // ideally as soon as the app starts
      final appConfig = AppConfiguration(APP_ID);
      final app = App(appConfig);
      final appId = app.id;
      // :remove-start:
      expect(app, isNotNull);
      final receivePort = ReceivePort();
      // :remove-end:
      // Later, access the App instance on background isolate
      await Isolate.spawn((List<Object> args) async {
        final sendPort = args[0] as SendPort;
        final appId = args[1] as String;

        try {
          final app = App.getById(appId); // :emphasize:

          // ... Access App users 
          final user = app?.currentUser!;

          // ... Open and use the synced database as usual

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
