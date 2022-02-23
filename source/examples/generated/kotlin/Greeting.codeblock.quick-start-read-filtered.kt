// all tasks in the realm
val tasksThatBeginWIthD = realm.query<Task>("name BEGINSWITH $0", "D").find()
val openTasks = realm.query<Task>("status == $0", "Open").find()
