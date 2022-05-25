import 'package:realm_dart/realm.dart';
import 'package:test/expect.dart';
import 'package:test/scaffolding.dart';


part 'car.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late String make;

  late String? model;
  late int? miles;
}
