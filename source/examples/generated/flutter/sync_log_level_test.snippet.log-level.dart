import 'package:realm/realm.dart';
import 'package:logging/logging.dart';

main() {
  Realm.logger = Logger('Realm Error Logger')..level = RealmLogLevel.error;

  // ...rest of app

}
