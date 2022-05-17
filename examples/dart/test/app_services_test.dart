import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';

void main() {
  const APP_ID = "example-testers-kvjdy";
  group('App Services client - ', () {
    test('Access App client', () {
      // :snippet-start: access-app-client
      AppConfiguration appConfig = AppConfiguration(APP_ID);
      App app = App(appConfig);
      //:snippet-end:
      expect(app.currentUser, null);
    });
    test('App client advanced configuration', () {
      // :snippet-start: app-client-advanced-configuration
      AppConfiguration appConfig = AppConfiguration(APP_ID,
          defaultRequestTimeout: const Duration(seconds: 120),
          localAppVersion: '2.0'
          // ... see reference docs for all available configuration options
          );
      //:snippet-end:
      App app = App(appConfig);
      expect(app.currentUser, null);
      expect(app.configuration.localAppVersion, '2.0');
    });
  });
}
