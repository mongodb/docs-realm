func deleteTodo(todo: Todo) async throws {
    try await realm.asyncWrite {
        realm.delete(todo)
    }
}
