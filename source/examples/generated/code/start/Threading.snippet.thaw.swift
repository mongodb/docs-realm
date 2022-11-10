// Read from a frozen realm
let frozenTodos = frozenRealm.objects(Todo.self)

// The collection that we pull from the frozen realm is also frozen
assert(frozenTodos.isFrozen)

// Get an individual task from the collection
let frozenTodo = frozenTodos.first!

// To modify the todo, you must first thaw it
// You can also thaw collections and realms
let thawedTodo = frozenTodo.thaw()

// Check to make sure this todo is valid. An object is
// invalidated when it is deleted from its managing realm,
// or when its managing realm has invalidate() called on it.
assert(thawedTodo?.isInvalidated == false)

// Thawing the todo also thaws the frozen realm it references
assert(thawedTodo!.realm!.isFrozen == false)

// Let's make the code easier to follow by naming the thawed realm
let thawedRealm = thawedTodo!.realm!

// Now, you can modify the todo
try! thawedRealm.write {
   thawedTodo!.status = "Done"
}
