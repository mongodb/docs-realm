let YOUR_REALM_APP_ID_HERE = "example-testers-kvjdy"

// :code-block-start: complete-swiftui-combine-quick-start
import Foundation
import RealmSwift
import Combine
import SwiftUI

// MARK: MongoDB Realm (Optional)

// Set this to true if you have set up a MongoDB Realm app
// with Realm Sync and anonymous authentication.
let USE_REALM_SYNC = false

/// The Realm app. Change YOUR_REALM_APP_ID_HERE to your Realm app ID.
// If you don't have a Realm app and don't wish to use Sync for now,
// change this to:
//   let app: RealmSwift.App? = nil
let app = USE_REALM_SYNC ? App(id: YOUR_REALM_APP_ID_HERE) : nil

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
    let items = RealmSwift.List<Item>()

    /// Declares the _id member as the primary key to the realm.
    override class func primaryKey() -> String? {
        "_id"
    }
}


// MARK: State Objects

/// State object for managing App flow.
/// As applications grow, this object may have to be broken out further.
class AppState: ObservableObject {
    /// Publisher that monitors log in state.
    var loginPublisher = PassthroughSubject<User, Error>()
    /// Publisher that monitors log out state.
    var logoutPublisher = PassthroughSubject<Void, Error>()
    /// Cancellables to be retained for any Future.
    var cancellables = Set<AnyCancellable>()
    /// Whether or not the app is active in the background.
    @Published var shouldIndicateActivity = false
    /// The list of items in the first group in the realm that will be displayed to the user.
    @Published var items: RealmSwift.List<Item>?

    init() {
        // Create a private subject for the opened realm, so that:
        // - if we are not using Realm Sync, we can open the realm immediately.
        // - if we are using Realm Sync, we can open the realm later after login.
        let realmPublisher = PassthroughSubject<Realm, Error>()
        // Specify what to do when the realm opens, regardless of whether
        // we're authenticated and using Realm Sync or not.
        realmPublisher
            .sink(receiveCompletion: { result in
                // Check for failure.
                if case let .failure(error) = result {
                    print("Failed to log in and open realm: \(error.localizedDescription)")
                }
            }, receiveValue: { realm in
                // The realm has successfully opened.
                // If no group has been created for this app, create one.
                if realm.objects(Group.self).count == 0 {
                    try! realm.write {
                        realm.add(Group())
                    }
                }
                assert(realm.objects(Group.self).count > 0)
                self.items = realm.objects(Group.self).first!.items
            })
            .store(in: &cancellables)
        
        // If the Realm app is nil, we are in the local-only use case
        // and do not need to log in or configure the realm for Sync.
        guard let app = app else {
            // MARK: Local-Only Use Case
            print("Not using Realm Sync - opening realm")
            // Directly open the default local-only realm.
            realmPublisher.send(try! Realm())
            return
        }

        // MARK: Realm Sync Use Case

        // Monitor login state and open a realm on login.
        loginPublisher
            .receive(on: DispatchQueue.main) // Ensure we update UI elements on the main thread.
            .flatMap { user -> RealmPublishers.AsyncOpenPublisher in
                // Logged in, now open the realm.

                // We want to chain the login to the opening of the realm.
                // flatMap() takes a result and returns a different Publisher.
                // In this case, flatMap() takes the user result from the login
                // and returns the realm asyncOpen's result publisher for further
                // processing.

                // We use "SharedPartition" as the partition value so that all users of this app
                // can see the same data. If we used the user.id, we could store data per user.
                // However, with anonymous authentication, that user.id changes upon logout and login,
                // so we will not see the same data or be able to sync across devices.
                let configuration = user.configuration(partitionValue: "SharedPartition")
                
                // Loading may take a moment, so indicate activity.
                self.shouldIndicateActivity = true

                // Open the realm and return its publisher to continue the chain.
                return Realm.asyncOpen(configuration: configuration)
            }
            .receive(on: DispatchQueue.main) // Ensure we update UI elements on the main thread.
            .map { // For each realm result, whether successful or not, always stop indicating activity.
                self.shouldIndicateActivity = false // Stop indicating activity.
                return $0 // Forward the result as-is to the next stage.
            }
            .subscribe(realmPublisher) // Forward the opened realm to the handler we set up earlier.
            .store(in: &self.cancellables)

        // Monitor logout state and unset the items list on logout.
        logoutPublisher.receive(on: DispatchQueue.main).sink(receiveCompletion: { _ in }, receiveValue: { _ in
                self.items = nil
            }).store(in: &cancellables)
        
        // If we already have a current user from a previous app
        // session, announce it to the world.
        if let user = app.currentUser {
            loginPublisher.send(user)
        }
    }
}

// MARK: Views



// MARK: Main View
/// The main screen that determines whether to present the LoginView or the ItemsView for the one group in the realm.
@main
struct ContentView: SwiftUI.App {
    /// The state of this application.
    @ObservedObject var state = AppState()

    var view: some View {
        ZStack {
            // If a realm is open for a logged in user, show the ItemsView
            // else show the LoginView
            if let items = state.items {
                // If using Realm Sync and authentication, provide a logout button
                // in the top left of the ItemsView.
                let leadingBarButton = app != nil ? AnyView(LogoutButton().environmentObject(state)) : nil
                ItemsView(items: items,
                          leadingBarButton: leadingBarButton)
                    .disabled(state.shouldIndicateActivity)
            } else {
                LoginView()
            }
            // If the app is doing work in the background,
            // overlay an ActivityIndicator
            if state.shouldIndicateActivity {
                ActivityIndicator()
            }
        }
    }

    var body: some Scene {
        WindowGroup {
            // Pass the state object around as an EnvironmentObject
            view.environmentObject(state)
        }
    }
}


// MARK: Authentication Views
/// Represents the login screen. We will just have a button to log in anonymously.
struct LoginView: View {
    @EnvironmentObject var state: AppState
    // Display an error if it occurs
    @State var error: Error?

    var body: some View {
        VStack {
            if let error = error {
                Text("Error: \(error.localizedDescription)")
            }
            Button("Log in anonymously") {
                guard let app = app else {
                    print("Not using Realm Sync - not logging in")
                    return
                }
                state.shouldIndicateActivity = true
                app.login(credentials: .anonymous).receive(on: DispatchQueue.main).sink(receiveCompletion: {
                    state.shouldIndicateActivity = false
                    switch ($0) {
                    case .finished:
                        break
                    case .failure(let error):
                        self.error = error
                    }
                }, receiveValue: {
                    self.error = nil
                    state.loginPublisher.send($0)
                }).store(in: &state.cancellables)
            }.disabled(state.shouldIndicateActivity)
        }
    }
}

/// A button that handles logout requests.
struct LogoutButton: View {
    @EnvironmentObject var state: AppState
    var body: some View {
        Button("Log Out") {
            guard let app = app else {
                print("Not using Realm Sync - not logging out")
                return
            }
            state.shouldIndicateActivity = true
            app.currentUser?.logOut().receive(on: DispatchQueue.main).sink(receiveCompletion: { _ in }, receiveValue: {
                state.shouldIndicateActivity = false
                state.logoutPublisher.send($0)
            }).store(in: &state.cancellables)
        }.disabled(state.shouldIndicateActivity)
    }
}

// MARK: Item Views
/// The screen containing a list of items in a group. Implements functionality for adding, rearranging,
/// and deleting items in the group.
struct ItemsView: View {
    /// The items in this group.
    @ObservedObject var items: RealmSwift.List<Item>

    /// The button to be displayed on the top left.
    var leadingBarButton: AnyView?

    var body: some View {
        NavigationView {
            VStack {
                // The list shows the items in the realm.
                List {
                    // ⚠️ ALWAYS freeze a Realm list while iterating in a SwiftUI
                    // View's ForEach(). Otherwise, unexpected behavior will occur,
                    // especially when deleting object from the list.
                    ForEach(items.freeze()) { frozenItem in
                        // "Thaw" the item before passing it in, as ItemRow
                        // may want to edit it, and cannot do so on a frozen object.
                        // This is a convenient place to thaw because we have access
                        // to the unfrozen realm via the items list.
                        ItemRow(item: items.realm!.resolve(ThreadSafeReference(to: frozenItem))!)
                    }.onDelete(perform: delete)
                        .onMove(perform: move)
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
                    Button(action: addItem) { Image(systemName: "plus") }
                }.padding()
            }
        }
    }

    /// Adds a new randomly-named item to the group.
    func addItem() {
        let newItem = Item()
        guard let realm = items.realm else {
            items.append(newItem)
            return
        }
        try! realm.write {
            items.append(newItem)
        }
    }

    /// Deletes the given item.
    func delete(at offsets: IndexSet) {
        guard let realm = items.realm else {
            items.remove(at: offsets.first!)
            return
        }
        try! realm.write {
            realm.delete(items[offsets.first!])
        }
    }

    /// Rearranges the given item in the group.
    /// This is persisted because the items are stored in a Realm List.
    func move(fromOffsets offsets: IndexSet, toOffset to: Int) {
        guard let realm = items.realm else {
            items.move(fromOffsets: offsets, toOffset: to)
            return
        }
        try! realm.write {
            items.move(fromOffsets: offsets, toOffset: to)
        }
    }
}

/// Represents an Item in a list.
struct ItemRow: View {
    var item: Item
    var body: some View {
        // You can click an item in the list to navigate to an edit details screen.
        NavigationLink(destination: ItemDetailsView(item)) {
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
    var item: Item

    // ⚠️ Beware using a Realm object or its properties directly in a @Binding.
    // Writes to Realm objects MUST occur in a transaction (realm.write() block),
    // but a default Binding will not do that for you. Therefore, either use a
    // separate @State object to hold the data before writing (as we do here),
    // or create a custom Binding that handles writes in a transaction.
    @State var newItemName: String = ""

    init(_ item: Item) {
        // Ensure the item was thawed before passing in
        assert(!item.isFrozen)
        self.item = item
        self.newItemName = item.name
    }

    var body: some View {
        VStack(alignment: .leading) {
            Text("Enter a new name:")
            // Write the new name to the newItemName state variable.
            // On commit, call our commit() function.
            TextField(item.name, text: $newItemName, onCommit: { self.commit() })
                .navigationBarTitle(item.name)
                .navigationBarItems(trailing: FavoriteToggle(item: item))
        }.padding()
    }

    /// Writes the given name to the realm in a transaction.
    private func commit() {
        guard let realm = item.realm else {
            item.name = newItemName
            return
        }
        try! realm.write {
            item.name = newItemName
        }
    }
}

/// A control for toggling an item's isFavorite property. Demonstrates using a custom binding
/// to modify a Realm object in a transaction.
struct FavoriteToggle: View {
    var item: Item
    var body: some View {
        // ⚠️ We cannot use the item property directly, as sets will not
        // automatically run in a transaction. Here we provide a custom
        // binding to handle the update in a transaction.
        Toggle(isOn: Binding(get: {
            // Return the value as normal.
            item.isFavorite
        }, set: { (value) in
            // If the item is associated with a realm,
            // open a transaction on it in order to do
            // the write.
            guard let realm = item.realm else {
                item.isFavorite = value
                return
            }
            try! realm.write {
                item.isFavorite = value
            }
        })) {
            // 💡 It might have been nice to use a Button instead
            // of a Toggle, but that wouldn't demonstrate custom bindings.
            Image(systemName: item.isFavorite ? "heart.fill" : "heart")
        }
    }
}

// MARK: General View
/// Simple activity indicator to telegraph that the app is active in the background.
struct ActivityIndicator: UIViewRepresentable {
    func makeUIView(context: Context) -> some UIView {
        return UIActivityIndicatorView(style: .large)
    }

    func updateUIView(_ uiView: UIViewType, context: Context) {
        (uiView as! UIActivityIndicatorView).startAnimating()
    }
}

// :code-block-end: complete-swiftui-combine-quick-start

