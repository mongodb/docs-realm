let task = QsTask(name: "Do laundry")
try! realm.write {
    realm.add(task)
}
