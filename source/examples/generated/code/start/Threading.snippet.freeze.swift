let realm = try! Realm()

// Get an immutable copy of the realm that can be passed across threads
let frozenRealm = realm.freeze()

assert(frozenRealm.isFrozen)

let todos = realm.objects(Todo.self)

// You can freeze collections
let frozenTodos = todos.freeze()

assert(frozenTodos.isFrozen)

// You can still read from frozen realms
let frozenTodos2 = frozenRealm.objects(Todo.self)

assert(frozenTodos2.isFrozen)

let todo = todos.first!

assert(!todo.realm!.isFrozen)

// You can freeze objects
let frozenTodo = todo.freeze()

assert(frozenTodo.isFrozen)
// Frozen objects have a reference to a frozen realm
assert(frozenTodo.realm!.isFrozen)
