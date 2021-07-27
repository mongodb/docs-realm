const config = {
  schema: [Task.schema]
  sync: {
    user: user,
    partitionValue: projectPartition,
  },
};

// Collect and sort tasks from a realm
collectTasks = (realm) => {
  const syncTasks = realm.objects("Task");
  let sortedTasks = syncTasks.sorted("name");
  setTasks([...sortedTasks]);
  sortedTasks.addListener(() => {
    setTasks([...sortedTasks]);
  });
}

// open a realm for this particular project
if(user){
  realmRef.current = new Realm(config);
  collectTasks(realmRef.current);
} else { 
  Realm.open(config).then((projectRealm) => {
    realmRef.current = projectRealm;
    collectTasks(projectRealm)
  });
}

