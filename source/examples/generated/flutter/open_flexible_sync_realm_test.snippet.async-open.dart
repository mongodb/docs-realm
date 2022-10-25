// Helper function to check if device is connected to the internet.
Future<bool> isDeviceOnline() async {
  // ...logic to check if device is online
}

final config = Configuration.flexibleSync(currentUser, [Tricycle.schema]);
// Only use asynchronous open if app is online.
late Realm realm;
if (await isDeviceOnline()) {
  realm = await Realm.open(config);
} else {
  realm = Realm(config);
}
