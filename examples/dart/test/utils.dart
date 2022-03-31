import 'package:realm_dart/realm.dart';

void cleanUpRealm(Realm realm, Configuration config) {
  if (!realm.isClosed) {
    realm.close();
  }
  Realm.deleteRealm(config.path);
}
