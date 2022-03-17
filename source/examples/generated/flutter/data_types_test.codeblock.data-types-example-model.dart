
part 'car.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late final int id; // Flutter SDK does not yet support ObjectId

  String? licensePlate;
  final bool isElectric = false;
  double milesDriven = 0;
  late final List<String> attributes = [];
  late _Person? owner;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late final int id; // Flutter SDK does not yet support ObjectId

  late String name;
  late int age;
}
