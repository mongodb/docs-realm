let YOUR_REALM_APP_ID_HERE = "example-testers-kvjdy"

// :code-block-start: complete-swiftui-combine-quick-start
import Foundation
import RealmSwift
import Combine
import SwiftUI

// MARK: MongoDB Realm (Optional)

// Set this to true if you have set up a MongoDB Realm app
// with Realm Sync and anonymous authentication.
let USE_REALM_SYNC = true

// The Realm app. Change YOUR_REALM_APP_ID_HERE to your Realm app ID.
// If you don't have a Realm app and don't wish to use Sync for now,
// you can change this to:
//   let app: RealmSwift.App? = nil
let app = USE_REALM_SYNC ? RealmSwift.App(id: YOUR_REALM_APP_ID_HERE) : nil

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
    /// The unique ID of the Item.
    @objc dynamic var _id = ObjectId.generate()

    /// The name of the Item, By default, a random name is generated.
    @objc dynamic var name = "\(randomAdjectives.randomElement()!) \(randomNouns.randomElement()!)"

    /// A flag indicating whether the user "favorited" the item.
    @objc dynamic var isFavorite = false

    /// The backlink to the `Group` this item is a part of.
    let group = LinkingObjects(fromType: Group.self, property: "items")

    /// Declares the _id member as the primary key to the realm.
    override class func primaryKey() -> String? {
        "_id"
    }
}

/// Represents a collection of items.
final class Group: Object, ObjectKeyIdentifiable {
    /// The unique ID of the Group.
    @objc dynamic var _id = ObjectId.generate()

    /// The collection of Items in this group.
    var items = RealmSwift.List<Item>()

    /// Declares the _id member as the primary key to the realm.
    override class func primaryKey() -> String? {
        "_id"
    }
}


// MARK: Views

// MARK: Main View
/// The main screen that determines whether to present the SyncContentView or the LocalOnlyContentView.
@main
struct Main: SwiftUI.App {
    var body: some Scene {
        WindowGroup {
            // Using Sync?
            if let app = app {
                SyncContentView(app: app)
            } else {
                LocalOnlyContentView()
            }
        }
    }
}

// The main content view if not using Sync.
struct LocalOnlyContentView: View {
    // Implicitly use the default realm's objects(Group.self)
    @ObservedResults(Group.self) var groups
    
    var body: some View {
        if let group = groups.first {
            AnyView(ItemsView(group: group))
        } else {
            // For this small app, we only want one group in the realm.
            // You can expand this app to support multiple groups.
            // For now, if there is no group, add one here.
            AnyView(ProgressView().onAppear {
                $groups.append(Group())
            })
        }
    }
}

// The main content view if using Sync.
struct SyncContentView: View {
    // Observe the Realm app object in order to react to login state changes.
    @ObservedObject var app: RealmSwift.App
    
    // Observe a realm that may be opened after login.
    @State var realm: Realm?

    var body: AnyView {
        // If there is no user logged in, show the login view.
        guard let user = app.currentUser else {
            return AnyView(LoginView(app: app))
        }
        // If logged in but the realm is not open yet, then show a progress spinner
        // while opening the realm. Realm.asyncOpen() downloads the remote changes before
        // the realm opens, which might take a moment.
        guard let realm = realm else {
            return AnyView(ProgressView() // Show the activity indicator while the realm loads
                .onReceive(Realm.asyncOpen(configuration: user.configuration(partitionValue: user.id)).assertNoFailure()) { realm in
                    // Preload one group if it does not exist. This app only ever allows
                    // one group per user partition, but you could expand it to allow many groups.
                    if realm.objects(Group.self).count == 0 {
                        try! realm.write {
                            realm.add(Group())
                        }
                    }
                    // Assign the realm to the state property to trigger a view refresh.
                    self.realm = realm
                })
        }
        // If logged in and the realm has been opened, then go to the items
        // screen for the only group in the realm.
        return AnyView(ItemsView(group: realm.objects(Group.self).first!,
                                 leadingBarButton: AnyView(LogoutButton(app: app))))
        // Pass the app to descendents via this environment object.
    }
}

// MARK: Authentication Views
/// Represents the login screen. We will just have a button to log in anonymously.
struct LoginView: View {
    // Hold an error if one occurs so we can display it.
    @State var error: Error?
    
    // Keep track of whether login is in progress.
    @State var isLoggingIn = false
    
    // The Realm app is passed in from above
    @ObservedObject var app: RealmSwift.App

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
                app.login(credentials: .anonymous) { result in
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
    @ObservedObject var app: RealmSwift.App
    @State var isLoggingOut = false

    var body: some View {
        Button("Log Out") {
            guard let user = app.currentUser else {
                return
            }
            isLoggingOut = true
            user.logOut() { error in
                isLoggingOut = false
                // Other views are observing the app and will detect
                // that the currentUser has changed. Nothing more to do here.
                print("Logged out")
            }
        }.disabled(app.currentUser == nil || isLoggingOut)
    }
}

// MARK: Item Views
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
                        // just append directly to it.
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

// :code-block-end:

