adapter = TaskAdapter(realm.where<Task>().sort("_id").findAll(), user!!, partition)
