adapter = TaskAdapter(realm.where<Task>().sort("id").findAll(), user!!, partition)
