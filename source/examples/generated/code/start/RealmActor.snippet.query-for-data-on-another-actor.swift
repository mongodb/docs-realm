// A simple example of a custom global actor
@globalActor actor BackgroundActor: GlobalActor {
    static var shared = BackgroundActor()
}

@BackgroundActor
func createObjectOnBackgroundActor() async throws -> ObjectId {
    // Explicitly specifying the actor is required for anything that is not MainActor
    let realm = try await Realm(actor: BackgroundActor.shared)
    let newTodo = try await realm.asyncWrite {
        return realm.create(Todo.self, value: [
            "name": "Pledge fealty and service to Gondor",
            "owner": "Pippin",
            "status": "In Progress"
        ])
    }
    // Share the todo's primary key so we can easily query for it on another actor
    return newTodo._id
}

@MainActor
func mainThreadFunction() async throws {
    let newTodoId = try await createObjectOnBackgroundActor()
    let realm = try await Realm()
    let todoOnMainActor = realm.object(ofType: Todo.self, forPrimaryKey: newTodoId)
}
