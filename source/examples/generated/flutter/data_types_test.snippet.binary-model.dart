@RealmModel()
class _BinaryExample {
  late String name;
  late Uint8List requiredBinaryProperty;
  var defaultValueBinaryProperty = Uint8List(8);
  late Uint8List? nullableBinaryProperty;
}
