import 'package:realm/realm.dart';


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
