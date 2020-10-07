exports.createTask = async (partition) => {
  const realm = await index.getRealm(partition);
  try {
    output.header("*** CREATE NEW TASK ***");
    const task = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the task text?",
      },
      {
        type: "rawlist",
        name: "status",
        message: "What is the task status?",
        choices: ["Open", "In Progress", "Closed"],
        default: function () {
          return "Open";
        },
      },
    ]);
    let result;
    realm.write(() => {
      result = realm.create("Task", {
        _id: new bson.ObjectID(),
        _partition: partition,
        name: task.name,
        status: task.status.replace(/\s/g, ''), // Removes space from "In Progress",
      });
    });

    output.header("New task created");
    output.result(JSON.stringify(result, null, 2));
  } catch (err) {
    output.error(JSON.stringify(err));
  }
};