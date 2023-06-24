void handleCompensatingWrite(
    CompensatingWriteError compensatingWriteError) {
  final writeReason = compensatingWriteError.compensatingWrites!.first;

  print("Error message: " + writeReason.reason);
  // ... handle compensating write error as needed.
}

final config = Configuration.flexibleSync(currentUser, [Car.schema],
    syncErrorHandler: (syncError) {
  // 231 is the error code for compensating write errors.
  if (syncError.codeValue == 231) {
    handleCompensatingWrite(syncError.as<CompensatingWriteError>());
  }
});

final realm = Realm(config);
