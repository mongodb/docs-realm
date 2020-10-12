let YOUR_REALM_APP_ID_HERE = "example-testers-kvjdy"

import Foundation
import RealmSwift
import Combine
import SwiftUI

// --- MODELS ---

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


// --- MANAGERS / VIEWMODELS ---

/// The Realm app.
let app = App(id: YOUR_REALM_APP_ID_HERE)

/// Wraps Realm authentication to manage authentication for our app in a SwiftUI/Combine-y way. 
class Auth: ObservableObject {
    @Published var user: User? = app.currentUser
    @Published var error: Error? = nil
    @Published var isLoggingInOrOut = false

    var isLoggedIn: Bool {
        user?.isLoggedIn ?? false
    }

    /// Logs in anonymously.
    func logIn() {
        user = nil
        error = nil
        self.isLoggingInOrOut = true
        app.login(credentials: Credentials.anonymous) { (user, error) in
            DispatchQueue.main.async {
                self.isLoggingInOrOut = false
                guard error == nil else {
                    print("Failed to log in: \(error!)")
                    self.error = error!
                    return
                }
                print("Logged in as user: \(user!.id)")
                self.user = user
            }
        }
    }

    /// Logs out the current user, if any.
    func logOut() {
        self.isLoggingInOrOut = true
        user?.logOut() { (error) in
            DispatchQueue.main.async {
                self.isLoggingInOrOut = false
                guard error == nil else {
                    self.error = error
                    self.user = app.currentUser
                    return
                }
                self.error = nil
                self.user = nil
            }
        }
    }
}

/// Opens a realm when a user is logged in and retrieves the first group in the 
/// realm or creates one if no group exists. 
final class GroupOwner: ObservableObject {
    @Published var error: Error?
    @Published var group: Group?

    private(set) var auth: Auth

    private var cancellables = Set<AnyCancellable>()

    init(auth: Auth) {
        self.auth = auth
        
        // Use Combine to watch for changes to the authentication state, i.e.
        // when someone logs in or out.
        auth.$user.sink { (user) in
            if (user == nil) {
                print("User removed.")
                self.error = nil
                self.group = nil
                return
            }
            
            // When someone logs in, open the realm.
            // If you are using Realm Sync, you can use the user's configuration object
            // with a partition key value to open the realm and tie into the Sync backend.
            let USE_REALM_SYNC = false // Change to true if you have configured your MongoDB Realm app for Sync
            let configuration = USE_REALM_SYNC ? user!.configuration(partitionValue: user!.id) : Realm.Configuration()
            print("Opening realm")
            Realm.asyncOpen(configuration: configuration, callbackQueue: DispatchQueue.main) { (realm, error) in
                print("Realm opened")
                guard error == nil else {
                    self.error = error
                    // Observers of the error shall be notified
                    return
                }
                self.error = nil
                guard let realm = realm else {
                    // This should never happen. Please report a bug.
                    fatalError("realm and error both nil?!")
                }
                // Fetch the first group in the realm. If there is none, create one.
                print("Loading group...")
                var group = realm.objects(Group.self).first
                if (group == nil) {
                    print("No group found. Creating initial group...")
                    group = try! realm.write {
                        realm.create(Group.self)
                    }
                }
                self.group = group
                print("Group loaded: \(group!)")
                // Observers of the group shall be notified
            }
        }.store(in: &cancellables)
    }
}

// --- VIEWS ---

/// The screen containing a list of items in a group. Implements functionality for adding, rearranging, 
/// and deleting items in the group. 
struct ItemsView: View {
    /// The items in this group.
    @ObservedObject var items: RealmSwift.List<Item>
    
    /// The auth object that manages authentication state with Realm.
    @ObservedObject var auth: Auth

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
                        ItemRow(item: self.items.realm!.resolve(ThreadSafeReference(to: frozenItem))!)
                    }.onDelete(perform: delete)
                        .onMove(perform: move)
                }.listStyle(GroupedListStyle())
                    .navigationBarTitle("Items", displayMode: .large)
                    .navigationBarBackButtonHidden(true)
                    .navigationBarItems(
                        // Log out button on the left
                        leading: Button("Log Out", action: auth.logOut).disabled(auth.isLoggingInOrOut),
                        // Edit button on the right to enable rearranging items
                        trailing: EditButton().disabled(auth.isLoggingInOrOut))

                // Action bar at bottom contains Add button.
                HStack {
                    Spacer()
                    Button(action: addItem) { Image(systemName: "plus") }
                        .disabled(auth.isLoggingInOrOut)
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
    @ObservedObject var item: Item
    var body: some View {
        // You can click an item in the list to navigate to an edit details screen. 
        NavigationLink(destination: ItemDetailsView(item)) {
            Text(item.name)
        }
    }
}

/// Represents a screen where you can edit the item's name. 
struct ItemDetailsView: View {
    @ObservedObject var item: Item
    
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
        TextField(item.name, text: $newItemName) { self.commit() }
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

/// Represents the login screen. We will just have a button to log in anonymously.
struct LoginView: View {
    @ObservedObject var auth: Auth
    var body: some View {
        Button("Log in anonymously", action: auth.logIn).disabled(auth.isLoggingInOrOut)
    }
}

/// The main screen that determines whether to present the LoginView or the ItemsView for the one group in the realm.
struct ContentView: View {
    @ObservedObject var auth: Auth
    @ObservedObject var groupOwner: GroupOwner

    init() {
        let auth = Auth()
        self.groupOwner = GroupOwner(auth: auth)
        self.auth = auth
    }

    var body: some View {
        // When `auth` or `groupOwner` change, this will be reevaluated.
        if !auth.isLoggedIn || groupOwner.group == nil {
            // Not logged in or realm not ready -- show login screen
            return AnyView(LoginView(auth: auth))
        }
        // Logged in and realm ready -- show items view for the group
        return AnyView(ItemsView(items: groupOwner.group!.items, auth: auth))
    }
}
