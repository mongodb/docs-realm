// Read from a frozen realm
let frozenTasks = frozenRealm.objects(Task.self)

// The collection that we pull from the frozen realm is also frozen
assert(frozenTasks.isFrozen)

// Get an individual task from the collection
let frozenTask = frozenTasks.first!

// To modify the task, you must first thaw it
// You can also thaw collections and realms
let thawedTask = frozenTask.thaw()

// Check to make sure this task is valid. An object is
// invalidated when it is deleted from its managing realm,
// or when its managing realm has invalidate() called on it.
assert(thawedTask?.isInvalidated == false)

// Thawing the task also thaws the frozen realm it references
assert(thawedTask!.realm!.isFrozen == false)

// Let's make the code easier to follow by naming the thawed realm
let thawedRealm = thawedTask!.realm!

// Now, you can modify the task
try! thawedRealm.write {
   thawedTask!.status = "Done"
}
