import 'dart:io';

import 'package:realm_dart/realm.dart';
import 'dart:math';

Future<void> cleanUpRealm(Realm realm, [App? app]) async {
  if (app != null) {
    await app.currentUser?.logOut();
  }
  if (!realm.isClosed) {
    realm.close();

    await delay(200);
  }
  sleep(Duration(milliseconds: 500));
  Realm.deleteRealm(realm.config.path);
}

final random = Random();
String generateRandomString(int len) {
  const _chars = 'abcdefghjklmnopqrstuvwxuz';
  return List.generate(len, (index) => _chars[random.nextInt(_chars.length)])
      .join();
}

Future delay(duration) async {
  await Future.delayed(Duration(milliseconds: duration));
}
