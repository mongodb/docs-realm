let actor = try await RealmActor()

// Add a todo to the realm so the collection has something to observe
try await actor.createTodo(name: "Arrive safely in Bree", owner: "Merry", status: "In Progress")
let todoCount = await actor.count
print("The actor currently has \(todoCount) tasks")

// Get a collection
let todos = await actor.realm.objects(Todo.self)

// Register a notification token, providing the actor
let token = await todos.observe(on: actor, { actor, changes in
    print("A change occurred on actor: \(actor)")
    switch changes {
    case .initial:
        print("The initial value of the changed object was: \(changes)")
    case .update(_, let deletions, let insertions, let modifications):
        if !deletions.isEmpty {
            print("An object was deleted: \(changes)")
        } else if !insertions.isEmpty {
            print("An object was inserted: \(changes)")
        } else if !modifications.isEmpty {
            print("An object was modified: \(changes)")
        }
    case .error(let error):
        print("An error occurred: \(error.localizedDescription)")
    }
})

// Make an update to an object to trigger the notification
await actor.realm.writeAsync {
    todos.first!.status = "Completed"
}

// Invalidate the token when done observing
token.invalidate()
