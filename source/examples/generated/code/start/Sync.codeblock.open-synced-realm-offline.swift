// You can use the same configuration from the initial open to
// re-open a Realm that is already on the device immediately.
// This doesn't wait to download changes from the server.
// Changes will attempt to sync in the background, but will
// not block opening the Realm.
let realm = try! Realm(configuration: configuration)
print("Opened realm: \(realm)")
