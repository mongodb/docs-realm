// Add some tasks
let task = LocalOnlyQsTask(name: "Do laundry")
try! realm.write {
    realm.add(task)
}
