// tasks in the realm whose name begins with the letter 'E'
val tasksThatBeginWIthE: RealmResults<Task> =
    realm.query<Task>("name BEGINSWITH $0", "E") // Exercise at the gym
        .find()
// tasks in the realm whose status is 'Open'
val openTasks: RealmResults<Task> =
    realm.query<Task>("status == $0", "Open") // Go Jogging, Go grocery shoppingt
        .find()
