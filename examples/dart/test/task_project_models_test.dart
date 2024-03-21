import 'package:realm_dart/realm.dart';

// :snippet-start: task-project-models

part 'task_project_models_test.realm.dart'; // :remove:
// :uncomment-start:
// part 'models.realm.dart';
// :uncomment-end:

@RealmModel()
class _Item {
  @MapTo("_id")
  @PrimaryKey()
  late ObjectId id;
  @Indexed(RealmIndexType.fullText)
  late String name;
  bool isComplete = false;
  String? assignee;
  int priority = 0;
  int progressMinutes = 0;
}

@RealmModel()
class _Project {
  @MapTo("_id")
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Item> items;
  int? quota;
}
// :snippet-end:

main() {}
