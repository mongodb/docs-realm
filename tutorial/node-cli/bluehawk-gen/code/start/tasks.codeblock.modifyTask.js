async function modifyTask(answers, partition) {
  const realm = await index.getRealm(partition);
  let task;
  try {
    realm.write(() => {
      // // TODO: Call the objectForPrimaryKey() method to get the task by ID and
      // // change the task object's status. 
      //
    });
    return JSON.stringify(task, null, 2);
  } catch (err) {
    return output.error(err);
  }
}