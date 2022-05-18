import 'package:realm_dart/realm.dart';

Future<void> cleanUpRealm(Realm realm, [App? app]) async {
  await app?.currentUser?.logOut();
  if (!realm.isClosed) {
    realm.close();
  }
  Realm.deleteRealm(realm.config.path);
}
