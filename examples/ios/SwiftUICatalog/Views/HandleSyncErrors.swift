import SwiftUI
import RealmSwift

// :snippet-start: swiftui-app-with-error-handler
let app = App(id: flexibleSyncAppId)

// :uncomment-start:
// @main
// :uncomment-end:
struct realmSwiftUIApp: SwiftUI.App {
    // Initialize the error handler
    @StateObject var errorHandler = ErrorHandler(app: app)

    var body: some Scene {
        WindowGroup {
            NextView(app: app)
                // Inject the error handler as an environment object
                .environmentObject(errorHandler)
                // Display an alert to the user containing the error when a Sync error occurs
                .alert(Text("Error"), isPresented: .constant(errorHandler.error != nil)) {
                    Button("OK", role: .cancel) { errorHandler.error = nil }
                } message: {
                    Text(errorHandler.error?.localizedDescription ?? "")
                }
        }
    }
}
// :snippet-end:

// :snippet-start: swiftui-error-handler
final class ErrorHandler: ObservableObject {
    @Published var error: Swift.Error?

    init(app: RealmSwift.App) {
        // Sync Manager listens for sync errors.
        app.syncManager.errorHandler = { syncError, syncSession in
            self.error = syncError
        }
    }
}
// :snippet-end:

// :snippet-start: use-app-and-error-handler-in-next-view
struct NextView: View {
    @ObservedObject var app: RealmSwift.App
    // Use the error handler that you injected into the environment
    @EnvironmentObject var errorHandler: ErrorHandler
    
    var body: some View {
        Text("You might log users in or handle errors in this view")
    }
}
// :snippet-end:
