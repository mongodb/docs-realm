exports.deleteTask = async (partition) => {
  const realm = await index.getRealm(partition);
  output.header("DELETE A TASK");
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the task ID (_id)?",
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure you want to delete this task?",
    },
  ]);

  if (answers.confirm) {
    let task = realm.objectForPrimaryKey("Task", new bson.ObjectID(answers.id));
    realm.write(() => {
      realm.delete(task);
      output.result("Task deleted.");
    });
    return;
  }
};