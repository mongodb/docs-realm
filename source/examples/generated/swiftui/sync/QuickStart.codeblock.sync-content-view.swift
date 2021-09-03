// If using Sync, this view observes the app object.
struct SyncContentView: View {
    // Observe the Realm app object in order to react to login state changes.
    @ObservedObject var app: RealmSwift.App

    var body: AnyView {
        // If there is no user logged in, show the login view.
        guard let user = app.currentUser else {
            return AnyView(LoginView(app: app))
        }
        
        // If there is a user logged in, show the RealmContentView
        return AnyView(RealmContentView(user: user, leadingBarButton: AnyView(LogoutButton(app: app))))
    }
}
