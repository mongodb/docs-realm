const inquirer = require("inquirer");
const Realm = require("realm");
const bson = require("bson");
const index = require("./index");
const output = require("./output");

exports.getTasks = async () => {
  const realm = await index.getRealm();
  const tasks = realm.objects("Task");
  output.header("MY TASKS:");
  output.result(JSON.stringify(tasks, null, 2));
};

exports.getTask = async () => {
  const realm = await index.getRealm();
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
    output.error(err);
  }
};

exports.createTask = async () => {
  const realm = await index.getRealm();
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
        _partition: "My Project",
        name: task.name,
        status: task.status,
      });
    });

    output.header("New task created");
    output.result(JSON.stringify(result, null, 2));
  } catch (err) {
    output.error(err);
  }
};

exports.deleteTask = async () => {
  const realm = await index.getRealm();
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

exports.editTask = async () => {
  output.header("CHANGE A TASK");
  let answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the task ID (_id)?",
    },
    {
      type: "input",
      name: "key",
      message: "What is the field you want to change?",
    },
    {
      type: "input",
      name: "value",
      message: "What is the new value?",
    },
  ]);

  let changeResult = await modifyTask(answers);
  output.result("Task updated.");
  output.result(changeResult);
  return;
};

exports.changeStatus = async () => {
  output.header("Update Task Status");
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the task ID (_id)?",
    },
    {
      type: "rawlist",
      name: "value",
      message: "What is the new status?",
      choices: ["Open", "In Progress", "Closed"],
    },
  ]);

  answers.key = "status";
  let changeResult = await modifyTask(answers);
  output.result("Task updated.");
  output.result(changeResult);
  return;
};

async function modifyTask(answers) {
  const realm = await index.getRealm();
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
