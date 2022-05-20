// All modifications to a realm must happen in a write block.
let taskToDelete = tasks[0]
try! localRealm.write {
    // Delete the LocalOnlyQsTask.
    localRealm.delete(taskToDelete)
}
