// all tasks in the realm
val tasksThatBeginWIthD = realm.objects(Task::class).query("name BEGINSWITH $0'", "D")
val openTasks = realm.objects(Task::class).query("status == $0", "Open")
