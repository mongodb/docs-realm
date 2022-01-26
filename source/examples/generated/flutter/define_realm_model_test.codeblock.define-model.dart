import 'package:realm/realm.dart';

part 'car.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late final String make;

  late final String model;
  late int? miles;
}
