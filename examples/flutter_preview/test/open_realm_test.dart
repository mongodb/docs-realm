import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider_shopper/models/car.dart';
import 'package:realm/realm.dart';

void main() {
  group('Open Realm', () {
    test('open a Realm', () {
      // :snippet-start: open-realm
      var config = Configuration();
      config.schema.add(Car);
      var realm = Realm(config);
      // :snippet-end:
      expect(realm.isClosed, false);
      realm.close();
    });
  });
}
