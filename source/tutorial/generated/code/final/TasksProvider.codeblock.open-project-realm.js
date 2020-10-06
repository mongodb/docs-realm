const config = {
  sync: {
    user: user,
    partitionValue: projectPartition,
  },
};
// open a realm for this particular project
Realm.open(config).then((projectRealm) => {
  realmRef.current = projectRealm;

  const syncTasks = projectRealm.objects("Task");
  let sortedTasks = syncTasks.sorted("name");
  setTasks([...sortedTasks]);
  sortedTasks.addListener(() => {
    setTasks([...sortedTasks]);
  });
});