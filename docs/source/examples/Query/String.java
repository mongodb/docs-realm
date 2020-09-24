RealmQuery<Project> projectsQuery = realm.where(Project.class);

// Pass Case.INSENSITIVE as the third argument for case insensitivity.
Log.i(TAG, "Projects that start with 'e': "
  + projectsQuery.beginsWith("name", "e", Case.INSENSITIVE).count());

Log.i(TAG, "Projects that contain 'ie': "
  + projectsQuery.contains("name", "ie").count());
