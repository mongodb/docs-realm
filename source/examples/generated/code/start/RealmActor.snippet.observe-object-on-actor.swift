// Create a simple actor
@globalActor actor BackgroundActor: GlobalActor {
    static var shared = BackgroundActor()
}

// Execute some code on a different actor - in this case, the MainActor
@MainActor
func mainThreadFunction() async throws {
    // Create a todo item so there is something to observe
    let realm = try! await Realm()
    let scourTheShire = try await realm.asyncWrite {
        return realm.create(Todo.self, value: [
            "_id": ObjectId.generate(),
            "name": "Scour the Shire",
            "owner": "Merry",
            "status": "In Progress"
        ])
    }
    
    // Register a notification token, providing the actor
    let token = await scourTheShire.observe(on: BackgroundActor.shared, { actor, change in
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
    
    // Update the object to trigger the notification.
    // This triggers a notification that the object's `status` property has been changed.
    try await realm.asyncWrite {
        scourTheShire.status = "Complete"
    }
    
    // Invalidate the token when done observing
    token.invalidate()
}
