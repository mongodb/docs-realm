import Foundation
import RealmSwift
import Combine
import SwiftUI

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
    @objc dynamic var name: String = "\(randomAdjectives.randomElement()!) \(randomNouns.randomElement()!)"

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

/// The Realm app.
let app = App(id: YOUR_REALM_APP_ID_HERE)

/// State object for managing App flow.
/// As applications grow, this object may have to be broken out further.
class AppState: ObservableObject {
    /// Publisher that monitors log in state.
    @Published var loginPublisher = PassthroughSubject<User, Error>()
    /// Publisher that monitors log out state.
    @Published var logoutPublisher = PassthroughSubject<Void, Error>()
    /// Whether or not the app is active in the background.
    @Published var shouldIndicateActivity = false
    /// Cancellables to be retained for any Future.
    @Published var cancellables = Set<AnyCancellable>()
    /// The list of items in the first group in the realm that will be displayed to the user.
    @Published var items: RealmSwift.List<Item>?

    init() {
        // Monitor login state and open a realm on login
        loginPublisher
            .receive(on: DispatchQueue.main) // Ensure we update UI elements (shouldIndicateActivity) on the main thread
            .flatMap { user -> RealmPublishers.AsyncOpenPublisher in
                // If using Realm Sync, use the user configuration object with a partition value.
                let USE_REALM_SYNC = false
                let configuration = USE_REALM_SYNC ? user.configuration(partitionValue: user.id) : Realm.Configuration()
                self.shouldIndicateActivity = true
                // Logged in, now open the realm and watch for completion.
                return Realm.asyncOpen(configuration: configuration)
            }
            .receive(on: DispatchQueue.main) // Ensure we update UI elements (shouldIndicateActivity) on the main thread
            .sink(receiveCompletion: { result in
                self.shouldIndicateActivity = false
                // Check for failure.
                if case let .failure(error) = result {
                    print("Failed to log in and open realm: \(error.localizedDescription)")
                }
            }, receiveValue: { realm in
                self.shouldIndicateActivity = false
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
            .store(in: &self.cancellables)

        // Monitor logout state and unset the items list on logout.
        logoutPublisher.receive(on: DispatchQueue.main).sink(receiveCompletion: { _ in }, receiveValue: { _ in
                self.items = nil
            }).store(in: &cancellables)
        
        // If we have a current user, check if a Realm already exists
        // for the given configuration.
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
                ItemsView(items: items,
                    leadingBarButton: AnyView(LogoutButton().environmentObject(state)))
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
                    // ⚠️ ALWAYS freeze a Realm list while iterating in ForEach().
                    // Otherwise, unexpected behavior will occur (especially when
                    // deleting object from the list).
                    ForEach(items.freeze()) { frozenItem in
                        // "Thaw" the item before passing it in, as ItemRow
                        // may want to edit it, and cannot do so on a frozen object.
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
        // Write the new name to the newItemName state variable.
        // On commit, call our commit() function.
        TextField(item.name, text: $newItemName, onCommit: { self.commit() })
            .navigationBarTitle(item.name)
            .padding()
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
