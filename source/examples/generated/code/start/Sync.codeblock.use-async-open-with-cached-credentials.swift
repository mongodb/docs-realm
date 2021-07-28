// Use asyncOpen to sync changes with the backend before
// opening the realm. This only works when the user is online,
// so first, check for a network connection.
let syncedRealm = try! Realm(configuration: configuration)
let syncSession = syncedRealm.syncSession!
let observer = syncSession.observe(\.connectionState, options: [.initial]) { (syncSession, change) in
    switch syncSession.connectionState {
    case .connecting:
        print("Connecting...")
    case .connected:
        print("Connected")
        // After the user is connected, use `asyncOpen`
        // to sync changes before opening the realm.
        Realm.asyncOpen(configuration: configuration) { result in
            switch result {
            case .failure(let error):
                print("Failed to open realm: \(error.localizedDescription)")
                // Handle error
            case .success(let realm):
                print("Successfully opened realm: \(realm)")
                // Use realm
            }
        }
    case .disconnected:
        // Let the user know they can't use the app
        // as they are not currently connected. Alternately,
        // you could fall back to `init` open if the user
        // is offline.
        print("Can't open the app because there is no network connection.")
    default:
        break
    }
}
