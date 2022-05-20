// All modifications to a realm must happen in a write block.
let taskToDelete = tasks[0]
try! realm.write {
    // Delete the QsTask.
    realm.delete(taskToDelete)
}
