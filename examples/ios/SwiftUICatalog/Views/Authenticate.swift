import RealmSwift
import SwiftUI

let thisApp: RealmSwift.App? = RealmSwift.App(id: YOUR_APP_SERVICES_APP_ID_HERE)

// :snippet-start: sync-content-view
/// This view observes the Realm app object.
/// Either direct the user to login, or open a realm
/// with a logged-in user.
struct SyncContentView: View {
    // Observe the Realm app object in order to react to login state changes.
    @ObservedObject var thisApp: RealmSwift.App

    var body: some View {
        if let user = thisApp.currentUser {
            // If there is a logged in user, pass the user ID as the
            // partitionValue to the view that opens a realm.
            // :snippet-start: partition-value-environment-object
            OpenSyncedRealmView().environment(\.partitionValue, user.id)
            // :snippet-end:
        } else {
            // If there is no user logged in, show the login view.
            LoginView()
        }
    }
}
// :snippet-end:

// MARK: Authentication Views
// :snippet-start: login-view
/// Represents the login screen. We will have a button to log in anonymously.
struct LoginView: View {
    // Hold an error if one occurs so we can display it.
    @State var error: Error?
    
    // Keep track of whether login is in progress.
    @State var isLoggingIn = false

    var body: some View {
        VStack {
            if isLoggingIn {
                ProgressView()
            }
            if let error = error {
                Text("Error: \(error.localizedDescription)")
            }
            Button("Log in anonymously") {
                // Button pressed, so log in
                isLoggingIn = true
                thisApp!.login(credentials: .anonymous) { result in
                    isLoggingIn = false
                    if case let .failure(error) = result {
                        print("Failed to log in: \(error.localizedDescription)")
                        // Set error to observed property so it can be displayed
                        self.error = error
                        return
                    }
                    // Other views are observing the app and will detect
                    // that the currentUser has changed. Nothing more to do here.
                    print("Logged in")
                }
            }.disabled(isLoggingIn)
        }
    }
}
// :snippet-end:

// :snippet-start: logout-button
/// A button that handles logout requests.
struct LogoutButton: View {
    @State var isLoggingOut = false

    var body: some View {
        Button("Log Out") {
            guard let user = thisApp!.currentUser else {
                return
            }
            isLoggingOut = true
            user.logOut() { error in
                isLoggingOut = false
                // Other views are observing the app and will detect
                // that the currentUser has changed. Nothing more to do here.
                print("Logged out")
            }
        }.disabled(thisApp!.currentUser == nil || isLoggingOut)
    }
}
// :snippet-end:
// :state-end:
