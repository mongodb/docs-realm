import 'package:realm_dart/realm.dart';

part 'car.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late int id;

  late String make;
  late String? model;
  late int? miles;
}
