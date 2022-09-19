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
