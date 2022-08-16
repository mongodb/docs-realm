let YOUR_APP_SERVICES_APP_ID_HERE = "swiftui-tester-rhvvv"

import RealmSwift
import SwiftUI

/// This view opens a synced realm.
// :snippet-start: auto-open-synced-realm
struct OpenSyncedRealmView: View {
    // @AutoOpen attempts to connect to the server and download remote changes
    // before the realm opens, which might take a moment. However, if there is
    // no network connection, AutoOpen will open a realm on the device.
    // We can use an empty string as the partitionValue here because we're
    // injecting the user.id as an environment value from the LoginView.
    // :emphasize-start:
    @AutoOpen(appId: YOUR_APP_SERVICES_APP_ID_HERE, partitionValue: "", timeout: 4000) var autoOpen
    // :emphasize-end:
    // :remove-start:
    @State var searchFilter: String = ""
    // :remove-end:
    
    var body: some View {
        
        switch autoOpen {
        // Starting the Realm.autoOpen process.
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
            // Do something with the realm
            UseRealmView(realm: realm)
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
// :snippet-end:

struct UseRealmView: View {
    var realm: Realm
        
    var body: some View {
        VStack {
            Text("Successfully opened the realm")
        }
    }
}

struct ErrorView: View {
    var error: Error
        
    var body: some View {
        VStack {
            Text("Error opening the realm: \(error.localizedDescription)")
        }
    }
}
