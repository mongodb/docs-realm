import 'package:realm_dart/realm.dart';

part 'car.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late final String make;

  late String? model;
  late int? miles;
}
