Log.i(TAG, "High priority tasks: " + tasksQuery.greaterThan("priority", 5).count());
Log.i(TAG, "Just-started or short tasks: " + tasksQuery.between("progressMinutes", 1, 10).count());
Log.i(TAG, "Unassigned tasks: " + tasksQuery.isNull("assignee").count());
Log.i(TAG, "Ali or Jamie's tasks: " + tasksQuery.in("assignee", new String[]{"Ali", "Jamie"}).count());
