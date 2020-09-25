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
    // // TODO: Call the objectForPrimaryKey() method to get a task by its ID and assign it to task.
    // let task;
    realm.write(() => {
      // // TODO: Call the delete() function.
      //
      output.result("Task deleted.");
    });
    return;
  }
};