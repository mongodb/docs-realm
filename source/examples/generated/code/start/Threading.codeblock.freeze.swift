let realm = try! Realm()

// Get an immutable copy of the realm that can be passed across threads
let frozenRealm = realm.freeze()

assert(frozenRealm.isFrozen)

let tasks = realm.objects(Task.self)

// You can freeze collections
let frozenTasks = tasks.freeze()

assert(frozenTasks.isFrozen)

// You can still read from frozen realms
let frozenTasks2 = frozenRealm.objects(Task.self)

assert(frozenTasks2.isFrozen)

let task = tasks.first!

assert(!task.realm!.isFrozen)

// You can freeze objects
let frozenTask = task.freeze()

assert(frozenTask.isFrozen)
// Frozen objects have a reference to a frozen realm
assert(frozenTask.realm!.isFrozen)
