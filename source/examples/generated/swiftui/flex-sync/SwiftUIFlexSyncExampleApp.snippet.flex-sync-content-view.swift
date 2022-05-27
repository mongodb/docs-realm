struct SyncContentView: View {
    // Observe the Realm app object in order to react to login state changes.
    @ObservedObject var app: RealmSwift.App

    var body: some View {
        if let user = app.currentUser {
            OpenSyncedRealmView()
        } else {
            // If there is no user logged in, show the login view.
            LoginView()
        }
    }
}
