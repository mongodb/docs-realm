async function modifyTask(answers, partition) {
  const realm = await index.getRealm(partition);
  let task;
  try {
    realm.write(() => {
      task = realm.objectForPrimaryKey("Task", new bson.ObjectID(answers.id));
      task[answers.key] = answers.value;
    });
    return JSON.stringify(task, null, 2);
  } catch (err) {
    return output.error(err);
  }
}