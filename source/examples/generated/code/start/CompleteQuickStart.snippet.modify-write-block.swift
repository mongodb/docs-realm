// All modifications to a realm must happen in a write block.
let taskToUpdate = tasks[0]
try! realm.write {
    taskToUpdate.status = "InProgress"
}
