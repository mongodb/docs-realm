@RealmModel()
class _SyncSchema {
  @PrimaryKey()
  @MapTo("_id")
  late int id;

  // ... other properties
}

