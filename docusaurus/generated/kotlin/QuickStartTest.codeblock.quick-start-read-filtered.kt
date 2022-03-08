// tasks in the realm whose name begins with the letter 'D'
val tasksThatBeginWIthD: RealmResults<Task> =
    realm.query<Task>("name BEGINSWITH $0", "D")
        .find()
val openTasks: RealmResults<Task> =
    realm.query<Task>("status == $0", "Open")
        .find()
