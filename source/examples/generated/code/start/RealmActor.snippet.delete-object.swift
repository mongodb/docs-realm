let actor = try await RealmActor()

let todo = try await createObject(in: actor)
print("Successfully created an object with id: \(todo._id)")
let todoCount = await actor.count

try await actor.deleteTodo(todo: todo)
let updatedTodoCount = await actor.count
if updatedTodoCount == todoCount - 1 {
    print("Successfully deleted the todo")
}
