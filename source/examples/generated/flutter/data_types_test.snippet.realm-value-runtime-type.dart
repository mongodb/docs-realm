for (var obj in data) {
  for (var mixedValue in obj.listOfMixedAnyValues) {
    var actualValue = mixedValue.value;
    // Use RealmValue.value.runtimeType to access stored value at runtime
    if (actualValue == null) {
      print('Null value');
    } else {
      switch (actualValue.runtimeType) {
        case const (int):
          print('Int value: $actualValue');
          break;
        case const (String):
          print('String value: $actualValue');
          break;
        // Add cases for other expected types...
        default:
          print(
              'Unhandled type: ${actualValue.runtimeType} with value $actualValue');
      }
    }
  }
}
