let YOUR_REALM_APP_ID_HERE = "example-testers-kvjdy"

// :code-block-start: complete-swiftui-quick-start
// :code-block-start: imports
import RealmSwift
import SwiftUI
// :code-block-end:

// :state-start: sync
// :code-block-start: mongodb-realm
// MARK: MongoDB Realm (Optional)

// The Realm app. Change YOUR_REALM_APP_ID_HERE to your Realm app ID.
// If you don't have a Realm app and don't wish to use Sync for now,
// you can change this to:
//   let app: RealmSwift.App? = nil
let app: RealmSwift.App? = RealmSwift.App(id: YOUR_REALM_APP_ID_HERE)
// :code-block-end:
// :state-end:
// MARK: Models

// :code-block-start: models
/// Random adjectives for more interesting demo item names
let randomAdjectives = [
    "fluffy", "classy", "bumpy", "bizarre", "wiggly", "quick", "sudden",
    "acoustic", "smiling", "dispensable", "foreign", "shaky", "purple", "keen",
    "aberrant", "disastrous", "vague", "squealing", "ad hoc", "sweet"
]

/// Random noun for more interesting demo item names
let randomNouns = [
    "floor", "monitor", "hair tie", "puddle", "hair brush", "bread",
    "cinder block", "glass", "ring", "twister", "coasters", "fridge",
    "toe ring", "bracelet", "cabinet", "nail file", "plate", "lace",
    "cork", "mouse pad"
]

/// An individual item. Part of a `Group`.
final class Item: Object, ObjectKeyIdentifiable {
    /// The unique ID of the Item. `primaryKey: true` declares the
    /// _id member as the primary key to the realm.
    @Persisted(primaryKey: true) var _id: ObjectId

    /// The name of the Item, By default, a random name is generated.
    @Persisted var name = "\(randomAdjectives.randomElement()!) \(randomNouns.randomElement()!)"

    /// A flag indicating whether the user "favorited" the item.
    @Persisted var isFavorite = false

    /// The backlink to the `Group` this item is a part of.
    @Persisted(originProperty: "items") var group: LinkingObjects<Group>
}

/// Represents a collection of items.
final class Group: Object, ObjectKeyIdentifiable {
    /// The unique ID of the Group. `primaryKey: true` declares the
    /// _id member as the primary key to the realm.
    @Persisted(primaryKey: true) var _id: ObjectId

    /// The collection of Items in this group.
    @Persisted var items = RealmSwift.List<Item>()
}
// :code-block-end:

// MARK: Views

// MARK: Main Views
// :code-block-start: content-view
/// The main screen that determines whether to present the SyncContentView or the LocalOnlyContentView.
// :state-start: local
/// For now, it always displays the LocalOnlyContentView.
// :state-end:
@main
struct ContentView: SwiftUI.App {
    var body: some Scene {
        WindowGroup {
            // :state-start: sync
            // Using Sync?
            if let app = app {
                SyncContentView(app: app)
            } else {
                LocalOnlyContentView()
            }
            // :state-end:
            // :state-uncomment-start: local
            // LocalOnlyContentView()
            // :state-uncomment-end:
        }
    }
}
// :code-block-end:

// :code-block-start: local-only-content-view
/// The main content view if not using Sync.
struct LocalOnlyContentView: View {
    // Implicitly use the default realm's objects(Group.self)
    @ObservedResults(Group.self) var groups
    
    var body: some View {
        if let group = groups.first {
            ItemsView(group: group)
        } else {
            // For this small app, we only want one group in the realm.
            // You can expand this app to support multiple groups.
            // For now, if there is no group, add one here.
            ProgressView().onAppear {
                $groups.append(Group())
            }
        }
    }
}
// :code-block-end:

// :state-start: sync
// :code-block-start: sync-content-view
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
            // :code-block-start: partition-value-environment-object
            OpenSyncedRealmView().environment(\.partitionValue, user.id)
            // :code-block-end:
        } else {
            // If there is no user logged in, show the login view.
            LoginView()
        }
    }
}
// :code-block-end:

// :code-block-start: open-synced-realm-view
/// This view opens a synced realm.
struct OpenSyncedRealmView: View {
    // Use AsyncOpen to download the latest changes from
    // your Realm app before opening the realm.
    // Leave the `partitionValue` an empty string to get this
    // value from the environment object passed in above.
    // :code-block-start: partition-value-empty-string
    @AsyncOpen(appId: YOUR_REALM_APP_ID_HERE, partitionValue: "", timeout: 4000) var asyncOpen
    // :code-block-end:
    
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
            ItemsView(group: {
                if realm.objects(Group.self).count == 0 {
                    try! realm.write {
                        realm.add(Group())
                    }
                }
                return realm.objects(Group.self).first!
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
// :code-block-end:

struct ErrorView: View {
    var error: Error
        
    var body: some View {
        VStack {
            Text("Error opening the realm: \(error.localizedDescription)")
        }
    }
}
    
// MARK: Authentication Views
// :code-block-start: login-view
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
                app!.login(credentials: .anonymous) { result in
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
// :code-block-end:

// :code-block-start: logout-button
/// A button that handles logout requests.
struct LogoutButton: View {
    @State var isLoggingOut = false

    var body: some View {
        Button("Log Out") {
            guard let user = app!.currentUser else {
                return
            }
            isLoggingOut = true
            user.logOut() { error in
                isLoggingOut = false
                // Other views are observing the app and will detect
                // that the currentUser has changed. Nothing more to do here.
                print("Logged out")
            }
        }.disabled(app!.currentUser == nil || isLoggingOut)
    }
}
// :code-block-end:
// :state-end:

// MARK: Item Views
// :code-block-start: items-view
/// The screen containing a list of items in a group. Implements functionality for adding, rearranging,
/// and deleting items in the group.
struct ItemsView: View {
    /// The group is a container for a list of items. Using a group instead of all items
    /// directly allows us to maintain a list order that can be updated in the UI.
    @ObservedRealmObject var group: Group

    /// The button to be displayed on the top left.
    var leadingBarButton: AnyView?

    var body: some View {
        NavigationView {
            VStack {
                // The list shows the items in the realm.
                List {
                    ForEach(group.items) { item in
                        ItemRow(item: item)
                    }.onDelete(perform: $group.items.remove)
                    .onMove(perform: $group.items.move)
                }.listStyle(GroupedListStyle())
                    .navigationBarTitle("Items", displayMode: .large)
                    .navigationBarBackButtonHidden(true)
                    .navigationBarItems(
                        leading: self.leadingBarButton,
                        // Edit button on the right to enable rearranging items
                        trailing: EditButton())

                // Action bar at bottom contains Add button.
                HStack {
                    Spacer()
                    Button(action: {
                        // The bound collection automatically
                        // handles write transactions, so we can
                        // append directly to it.
                        $group.items.append(Item())
                    }) { Image(systemName: "plus") }
                }.padding()
            }
        }
    }
}
// :code-block-end:

// :code-block-start: item-row-and-details
/// Represents an Item in a list.
struct ItemRow: View {
    @ObservedRealmObject var item: Item

    var body: some View {
        // You can click an item in the list to navigate to an edit details screen.
        NavigationLink(destination: ItemDetailsView(item: item)) {
            Text(item.name)
            if item.isFavorite {
                // If the user "favorited" the item, display a heart icon
                Image(systemName: "heart.fill")
            }
        }
    }
}

/// Represents a screen where you can edit the item's name.
struct ItemDetailsView: View {
    @ObservedRealmObject var item: Item

    var body: some View {
        VStack(alignment: .leading) {
            Text("Enter a new name:")
            // Accept a new name
            TextField("New name", text: $item.name)
                .navigationBarTitle(item.name)
                .navigationBarItems(trailing: Toggle(isOn: $item.isFavorite) {
                    Image(systemName: item.isFavorite ? "heart.fill" : "heart")
                })
        }.padding()
    }
}
// :code-block-end:

// :code-block-end:
