import 'package:test/test.dart';
import '../bin/models/Car.dart';
import 'package:realm_dart/realm.dart';

void main() {
  group('Open and Close a Realm', () {
    test('open a Realm', () {
      // :snippet-start: open-realm
      var config = Configuration([Car.schema]);
      var realm = Realm(config);
      // :snippet-end:
      expect(realm.isClosed, false);
      // :snippet-start: close-realm
      realm.close();
      // :snippet-end:
      expect(realm.isClosed, true);
    });
  });
}
