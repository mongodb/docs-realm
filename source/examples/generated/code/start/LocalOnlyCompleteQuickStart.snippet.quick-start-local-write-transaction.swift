// Add some tasks
let task = LocalOnlyQsTask(name: "Do laundry")
try! localRealm.write {
    localRealm.add(task)
}
