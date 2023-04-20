import 'package:realm/realm.dart';

part 'car.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late final String make;
  late String? model;
  late int? miles;
}
