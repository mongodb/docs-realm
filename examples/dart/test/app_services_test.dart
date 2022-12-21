import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import "dart:io";
import "dart:convert";

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
          defaultRequestTimeout: const Duration(seconds: 120),
          localAppVersion: '2.0'
          // ... see reference docs for all available configuration options
          );
      //:snippet-end:
      final app = App(appConfig);
      expect(app.currentUser, null);
      expect(appConfig.localAppVersion, '2.0');
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
