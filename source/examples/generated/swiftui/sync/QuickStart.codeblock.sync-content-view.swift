// If using Sync, this view observes the app object.
struct SyncContentView: View {
    // Observe the Realm app object in order to react to login state changes.
    @ObservedObject var app: RealmSwift.App

    var body: some View {
        // If there is no user logged in, show the login view.
        if app.currentUser == nil {
            LoginView(app: app)
        } else {
            RealmContentView()
        }
    }
}
