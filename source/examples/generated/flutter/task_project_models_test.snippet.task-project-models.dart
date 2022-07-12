part 'models.g.dart';

@RealmModel()
class _Task {
  @MapTo("_id")
  @PrimaryKey()
  late ObjectId id;

  late String name;
  bool isComplete = false;
  String? assignee;
  int priority = 0;
  int progressMinutes = 0;
}

@RealmModel()
class _Project {
  @PrimaryKey()
  @MapTo("_id")
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Task> tasks;
  int? quota;
}
