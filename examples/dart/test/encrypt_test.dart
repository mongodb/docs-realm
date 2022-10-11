import 'package:test/test.dart';
import './schemas.dart';
import 'package:realm_dart/realm.dart';
import 'dart:math';
import './utils.dart';

void main() {
  group("Encryption - ", () {
    test("Open Realm with encryption key", () {
      // :snippet-start: encrypt-realm
      // Generate encryption key
      List<int> key = List<int>.generate(64, (i) => Random().nextInt(256));

      Configuration encryptedConfig = Configuration.local([Car.schema],
          encryptionKey: key, path: 'encrypted.realm');
      Realm encryptedRealm = Realm(encryptedConfig);
      // :snippet-end:
      expect(encryptedRealm.isClosed, isFalse);
      // Note: no way to test if Realm is encrypted per SDK PR - https://github.com/realm/realm-dart/blob/7b16c62fae4baf8b257531db6f1ed36093fa7309/test/configuration_test.dart#L550-L553
      cleanUpRealm(encryptedRealm);
    });
  });
}
