// all tasks in the realm
val tasksThatBeginWIthD = realm.objects<Task>().query("name BEGINSWITH $0'", "D")
val openTasks = realm.objects<Task>().query("status == $0", "Open")
