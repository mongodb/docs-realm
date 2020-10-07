// Create a new Task with the text that the user entered.
let task = Task(partition: self.partitionValue, name: textField.text ?? "New Task")

// Any writes to the Realm must occur in a write block.
try! self.realm.write {
    // Add the Task to the Realm. That's it!
    self.realm.add(task)
}