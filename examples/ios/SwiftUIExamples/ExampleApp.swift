let YOUR_REALM_APP_ID_HERE = "swiftui-tester-rhvvv"

import RealmSwift
import SwiftUI

// The Realm app. Change YOUR_REALM_APP_ID_HERE to your Realm app ID.
// If you don't have a Realm app and don't wish to use Sync for now,
// you can change this to:
//   let app: RealmSwift.App? = nil
let app: RealmSwift.App? = RealmSwift.App(id: YOUR_REALM_APP_ID_HERE)

// MARK: Models

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

    // :state-start: migration
    // :snippet-start: add-property-to-model
    /// Users can enter a description, which is an empty string by default
    @Persisted var itemDescription = ""
    // :snippet-end:
    // :state-end:
    
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

// MARK: Views

// MARK: Main Views
/// The main screen that determines whether to present the SyncContentView or the LocalOnlyContentView.
/// For now, it always displays the LocalOnlyContentView.
// :state-start: migration
// :snippet-start: realm-configuration-increment-schema
let config = Realm.Configuration(schemaVersion: 2)
// :snippet-end:
// :state-end:
// :state-start: migration
// :snippet-start: pass-environment-object-to-local-content-view
@main
struct ContentView: SwiftUI.App {
    var body: some Scene {
        WindowGroup {
            // Using Sync?
            if let app = app {
                SyncContentView(app: app)
            } else {
                LocalOnlyContentView()
                // :emphasize-start:
                // :snippet-start: pass-realm-config-as-environment-object
                    .environment(\.realmConfiguration, config)
                // :snippet-end:
                // :emphasize-end:
            }
        }
    }
}
// :snippet-end:
// :state-end:

/// The main content view if not using Sync.
// :snippet-start: implicitly-open-realm
struct LocalOnlyContentView: View {
    @State var searchFilter: String = ""
    // :emphasize-start:
    @ObservedResults(Group.self) var groups
    // :emphasize-end:
    
    var body: some View {
        if let group = groups.first {
            // Pass the Group objects to a view further
            // down the hierarchy
            ItemsView(group: group, searchFilter: $searchFilter)
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
// :snippet-end:

/// This view observes the Realm app object.
/// Either direct the user to login, or open a realm
/// with a logged-in user.
// :state-start: migration
// :snippet-start: pass-realm-config-to-synced-realm-view
struct SyncContentView: View {
    // Observe the Realm app object in order to react to login state changes.
    @ObservedObject var app: RealmSwift.App

    var body: some View {
        if let user = app.currentUser {
            // If there is a logged in user, pass the user ID as the
            // partitionValue to the view that opens a realm.
            OpenSyncedRealmView()
                .environment(\.partitionValue, user.id)
            // :emphasize-start:
                .environment(\.realmConfiguration, config)
            // :emphasize-end:
        } else {
            // If there is no user logged in, show the login view.
            LoginView()
        }
    }
}
// :snippet-end:
// :state-end:

/// This view opens a synced realm.
// :snippet-start: auto-open-synced-realm
struct OpenSyncedRealmView: View {
    // @AutoOpen attempts to connect to the server and download remote changes
    // before the realm opens, which might take a moment. However, if there is
    // no network connection, AutoOpen will open a realm on the device.
    // We can use an empty string as the partitionValue here because we're
    // injecting the user.id as an environment value from the LoginView.
    // :emphasize-start:
    @AutoOpen(appId: YOUR_REALM_APP_ID_HERE, partitionValue: "", timeout: 4000) var autoOpen
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
            // :emphasize-start:
        case .open(let realm):
            ItemsView(group: {
                if realm.objects(Group.self).count == 0 {
                    try! realm.write {
                        realm.add(Group())
                    }
                }
                return realm.objects(Group.self).first!
                // :emphasize-end:
            }(), searchFilter: $searchFilter, leadingBarButton: AnyView(LogoutButton())).environment(\.realm, realm)
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

struct ErrorView: View {
    var error: Error
        
    var body: some View {
        VStack {
            Text("Error opening the realm: \(error.localizedDescription)")
        }
    }
}
    
// MARK: Authentication Views
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

// MARK: Item Views
/// The screen containing a list of items in a group. Implements functionality for adding, rearranging,
/// and deleting items in the group.
struct ItemsView: View {
    @ObservedRealmObject var group: Group
    // :snippet-start: explicitly-provide-config-to-property-wrappers
    @ObservedResults(Item.self, configuration: config) var items
    // :snippet-end:
    @Binding var searchFilter: String

    /// The button to be displayed on the top left.
    var leadingBarButton: AnyView?

    var body: some View {
        NavigationView {
            VStack {
                // :snippet-start: searchable
                // The list shows the items in the realm.
                List {
                    ForEach(items) { item in
                        ItemRow(item: item)
                    }
                }
                .searchable(text: $searchFilter,
                            collection: $items,
                            keyPath: \.name) {
                    ForEach(items) { itemsFiltered in
                        Text(itemsFiltered.name).searchCompletion(itemsFiltered.name)
                    }
                }
                // :snippet-end:
                .listStyle(GroupedListStyle())
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
