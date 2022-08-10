// Entrypoint. Call this to run the quick start.
func flexibleSyncQuickStart() async {
    // Instantiate the app
    let app = App(id: FS_APP_ID) // Replace FS_APP_ID with your Atlas App ID
    do {
        let user = try await app.login(credentials: Credentials.anonymous)
        print("Successfully logged in user: \(user)")
        await openSyncedRealm(user: user)
    } catch {
        print("Error logging in: \(error.localizedDescription)")
    }
    func openSyncedRealm(user: User) async {
        do {
            var config = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
                subs.append(
                    QuerySubscription<Todo> {
                        $0.ownerId == user.id
                    })
            })
            // Pass object types to the Flexible Sync configuration
            // as a temporary workaround for not being able to add a
            // complete schema for a Flexible Sync app.
            config.objectTypes = [Todo.self]
            let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
            await useRealm(realm: realm, user: user)
        } catch {
            print("Error opening realm: \(error.localizedDescription)")
        }
    }
    func useRealm(realm: Realm, user: User) async {
        // Get all todos in the realm
        let todos = realm.objects(Todo.self)

        // Retain notificationToken as long as you want to observe
        let notificationToken = todos.observe { (changes) in
            switch changes {
            case .initial: break
                // Results are now populated and can be accessed without blocking the UI
            case .update(_, let deletions, let insertions, let modifications):
                // Query results have changed.
                print("Deleted indices: ", deletions)
                print("Inserted indices: ", insertions)
                print("Modified modifications: ", modifications)
            case .error(let error):
                // An error occurred while opening the Realm file on the background worker thread
                fatalError("\(error)")
            }
        }

        // Delete all from the realm
        try! realm.write {
            realm.deleteAll()
        }

        // Add some tasks
        let todo = Todo(name: "Do laundry", ownerId: user.id)
        try! realm.write {
            realm.add(todo)
        }
        let anotherTodo = Todo(name: "App design", ownerId: user.id)
        try! realm.write {
            realm.add(anotherTodo)
        }

        // You can also filter a collection
        let todosThatBeginWithA = todos.where {
            $0.name.starts(with: "A")
        }
        print("A list of all todos that begin with A: \(todosThatBeginWithA)")

        // All modifications to a realm must happen in a write block.
        let todoToUpdate = todos[0]
        try! realm.write {
            todoToUpdate.status = "InProgress"
        }

        let todosInProgress = todos.where {
            $0.status == "InProgress"
        }
        print("A list of all todos in progress: \(todosInProgress)")

        // All modifications to a realm must happen in a write block.
        let todoToDelete = todos[0]
        try! realm.write {
            // Delete the Todo.
            realm.delete(todoToDelete)
        }

        print("A list of all todos after deleting one: \(todos)")

        do {
            try await user.logOut()
            print("Successfully logged user out")
        } catch {
            print("Failed to log user out: \(error.localizedDescription)")
        }

        // Invalidate notification tokens when done observing
        notificationToken.invalidate()
    }
}
