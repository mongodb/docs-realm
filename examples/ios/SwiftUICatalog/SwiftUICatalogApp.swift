import RealmSwift
import SwiftUI

let APP_SERVICES_APP_ID_HERE = "example-testers-kvjdy"

// :snippet-start: mongodb-realm
// MARK: Atlas App Services (Optional)

// The Atlas App Services app. Change YOUR_APP_SERVICES_APP_ID_HERE to your App Services app ID.
// If you don't have an App Services app and don't wish to use Sync for now,
// you can change this to:
//   let app: RealmSwift.App? = nil
let app: RealmSwift.App? = RealmSwift.App(id: APP_SERVICES_APP_ID_HERE)
// :snippet-end:

@main
struct SwiftUICatalogApp: SwiftUI.App {
    static let viewBuilders: [String: () -> AnyView] = [
        "DefaultView": { AnyView(DefaultView()) },
        "OpenSyncedRealm": { AnyView(OpenSyncedRealmView()) },
        "SyncContentView": { AnyView(SyncContentView(thisApp: app!))}]
    
    var body: some Scene {
        WindowGroup {
            if let viewName = ProcessInfo().customUITestedView,
               let viewBuilder = Self.viewBuilders[viewName] {
                viewBuilder()
            } else {
                AnyView(DefaultView())
            }
        }
    }
}

struct DefaultView: View {
    var body: some View {
        Text("This is the default view of the SwiftUI unit test host app.")
    }
}

extension ProcessInfo {
    var customUITestedView: String? {
        guard environment["MyUITestsCustomView"] == "true" else { return nil }
        return environment["MyCustomViewName"]
    }
}
