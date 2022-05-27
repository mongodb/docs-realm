/// This view opens a synced realm.
struct OpenSyncedRealmView: View {
    // Use AsyncOpen to download the latest changes from
    // your Realm app before opening the realm.
    // Leave the `partitionValue` an empty string to get this
    // value from the environment object passed in above.
    @AsyncOpen(appId: YOUR_REALM_APP_ID_HERE, partitionValue: "", timeout: 4000) var asyncOpen
    
    var body: some View {
        
        switch asyncOpen {
        // Starting the Realm.asyncOpen process.
        // Show a progress view.
        case .connecting:
            ProgressView()
        // Waiting for a user to be logged in before executing
        // Realm.asyncOpen.
        case .waitingForUser:
            ProgressView("Waiting for user to log in...")
        // The realm has been opened and is ready for use.
        // Show the content view.
        case .open(let realm):
            ItemsView(itemGroup: {
                if realm.objects(ItemGroup.self).count == 0 {
                    try! realm.write {
                        realm.add(ItemGroup())
                    }
                }
                return realm.objects(ItemGroup.self).first!
            }(), leadingBarButton: AnyView(LogoutButton())).environment(\.realm, realm)
            // The realm is currently being downloaded from the server.
            // Show a progress view.
            case .progress(let progress):
                ProgressView(progress)
            // Opening the Realm failed.
            // Show an error view.
            case .error(let error):
                ErrorView(error: error)
        }
    }
}
