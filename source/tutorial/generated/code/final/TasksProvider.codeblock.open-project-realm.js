  const config = {
    sync: {
      user: user,
      partitionValue: projectPartition,
    },
  };
  // open a realm for this particular project

  // collect and sort tasks from a realm
  collectTasks = (realm) => {
    const syncTasks = realm.objects("Task");
    let sortedTasks = syncTasks.sorted("name");
    setTasks([...sortedTasks]);
    sortedTasks.addListener(() => {
      setTasks([...sortedTasks]);
    });
  }

  if(user){
    realmRef.current = new Realm({
      schema: [Task.schema]
    });
    collectTasks(realmRef.current);
  } else { 
  Realm.open(config).then((projectRealm) => {
    realmRef.current = projectRealm;
    collectTasks(projectRealm);
  });
}
