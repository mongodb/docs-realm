// :snippet-start: schema
import 'package:realm_dart/realm.dart'; // :remove:
// :remove-start:
// import 'package:realm/realm.dart';
// If you are using Dart-standalone Realm (not Flutter),
//replace the import statement with:
// import 'package:realm_dart/realm.dart';
// :remove-end:

part 'sync_schemas.g.dart'; // :remove:

@RealmModel()
class _Todo {
  // When modeling data for a Realm with Device Sync, you must map
  // your primary key to `_id` with the decorator @MapTo('id').
  @MapTo('_id')
  @PrimaryKey()
  late ObjectId id;
  bool isComplete = false;
  late String summary;
  @MapTo('owner_id')
  late String ownerId;
}
// :snippet-end:
