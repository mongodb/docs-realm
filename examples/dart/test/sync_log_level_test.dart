import 'package:test/test.dart';
// :replace-start: {
//   "terms": {
//     "realm_dart": "realm"
//   }
// }
// :snippet-start: log-level
import 'package:realm_dart/realm.dart';
import 'package:logging/logging.dart';

main() {
  Realm.logger = Logger('Realm Error Logger')..level = RealmLogLevel.error;

  // ...rest of app
  // :remove-start:
  test("Add custom sync logger", () async {
    expect(Realm.logger.name, 'Realm Error Logger');
  });
  // :remove-end:
}
// :snippet-end:
// :replace-end:
