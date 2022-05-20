// all tasks in the realm
val tasks: RealmResults<Task> = realm.query<Task>().find()
