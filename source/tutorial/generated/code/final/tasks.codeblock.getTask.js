exports.getTask = async (partition) => {
  const realm = await index.getRealm(partition);
  try {
    const task = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "What is the task ID (_id)?",
      },
    ]);
    let result = realm.objectForPrimaryKey("Task", new bson.ObjectID(task.id));
    if (result !== undefined) {
      output.header("Here is the task you requested:");
      output.result(JSON.stringify(result, null, 2));
    }
  } catch (err) {
    output.error(JSON.stringify(err));
  }
};