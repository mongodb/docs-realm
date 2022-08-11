// tasks in the realm whose name begins with the letter 'G'
val tasksThatBeginWIthG: RealmResults<Task> =
    realm.query<Task>("name BEGINSWITH $0", "G") // Go Jogging, Go grocery shopping
        .find()
// tasks in the realm whose status is 'Open'
val openTasks: RealmResults<Task> =
    realm.query<Task>("status == $0", "Open") // Go Jogging
        .find()
