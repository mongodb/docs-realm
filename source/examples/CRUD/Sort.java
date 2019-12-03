RealmResults<Project> results = projectsQuery.sort("name", Sort.DESCENDING).findAll();
