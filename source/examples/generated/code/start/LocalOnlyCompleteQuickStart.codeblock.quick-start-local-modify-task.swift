// All modifications to a realm must happen in a write block.
let taskToUpdate = tasks[0]
try! localRealm.write {
    taskToUpdate.status = "InProgress"
}
