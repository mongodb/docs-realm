val tasksQuery = realm.where<ProjectTask>()

Log.i("EXAMPLE", "Ali has completed " +
    tasksQuery.equalTo("assignee", "Ali").and().equalTo("isComplete", true).findAll().count() +
    " tasks.")
