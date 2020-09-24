// Use dot notation to access properties of collection entries
Log.i(TAG, "Projects with any top priority tasks: " + projectsQuery.equalTo("tasks.priority", 10));
