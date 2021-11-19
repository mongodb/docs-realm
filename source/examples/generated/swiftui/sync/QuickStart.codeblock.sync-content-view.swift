/// This view observes the Realm app object.
/// Either direct the user to login, or open a realm
/// with a logged-in user.
struct SyncContentView: View {
    // Observe the Realm app object in order to react to login state changes.
    @ObservedObject var app: RealmSwift.App

    var body: some View {
        if let user = app.currentUser {
            // If there is a logged in user, pass the user ID as the
            // partitionValue to the view that opens a realm.
            OpenSyncedRealmView().environment(\.partitionValue, user.id)
        } else {
            // If there is no user logged in, show the login view.
            LoginView()
        }
    }
}
