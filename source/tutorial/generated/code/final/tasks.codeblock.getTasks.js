exports.getTasks = async (partition) => {
  const realm = await index.getRealm(partition);
  const tasks = realm.objects("Task");
  output.header("MY TASKS:");
  output.result(JSON.stringify(tasks, null, 2));
};