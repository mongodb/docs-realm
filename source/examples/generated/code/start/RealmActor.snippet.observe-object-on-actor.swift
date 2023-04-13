let actor = try await RealmActor()

// Add a todo to the realm so we can observe it
try await actor.createTodo(name: "Write a code example for observing an object on an actor", owner: "Dachary", status: "In Progress")
let todoCount = await actor.count
print("The actor currently has \(todoCount) tasks")

// Get an object
let todo = await actor.realm.objects(Todo.self).where {
    $0.name == "Write a code example for observing an object on an actor"
}.first!

// Register a notification token, providing the actor
let token = await todo.observe(on: actor, { actor, change in
    print("A change occurred on actor: \(actor)")
    switch change {
    case .change(let object, let properties):
        for property in properties {
            print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
        }
    case .error(let error):
        print("An error occurred: \(error)")
    case .deleted:
        print("The object was deleted.")
    }
})

// Make an update to an object to trigger the notification
await actor.realm.writeAsync {
    todo.status = "Completed"
}

// Invalidate the token when done observing
token.invalidate()
