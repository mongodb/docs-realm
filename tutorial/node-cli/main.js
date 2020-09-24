const inquirer = require("inquirer");
const ora = require("ora");

const tasks = require("./tasks");
const index = require("./index");
const watch = require("./watch");
const users = require("./users");
const output = require("./output");

const Choices = {
  CreateTask: "Create a task",
  ShowAllTasks: "Show all of my tasks",
  GetTask: "Get a specific task",
  ChangeTaskStatus: "Change a task status",
  EditTask: "Edit a task",
  DeleteTask: "Delete a task",
  WatchForChanges: "Watch for changes",
  LogOut: "Log out / Quit",
};

async function mainMenu() {
  try {
    const answers = await inquirer.prompt({
      type: "rawlist",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: [...Object.values(Choices), new inquirer.Separator()],
    });

    switch (answers.mainMenu) {
      case Choices.CreateTask: {
        await tasks.createTask();
        return mainMenu();
      }
      case Choices.ShowAllTasks: {
        await tasks.getTasks();
        return mainMenu();
      }
      case Choices.GetTask: {
        await tasks.getTask();
        return mainMenu();
      }
      case Choices.ChangeTaskStatus: {
        await tasks.changeStatus();
        return mainMenu();
      }
      case Choices.EditTask: {
        await tasks.editTask();
        return mainMenu();
      }
      case Choices.DeleteTask: {
        await tasks.deleteTask();
        return mainMenu();
      }
      case Choices.WatchForChanges: {
        await watch.watchForChanges();
        output.result(
          "We are now watching for changes to the task collection."
        );
        await ora("Watching (use Ctrl-C to quit)").start();

        /* Note: we've implemented this such that the console 
            stays open and no further input is possible while
            watching for changes. You can open a separate console
            to do further work, or you can uncomment the next line
            to continue working rather than waiting while watching. 
            Changes will still be displayed in the console as they 
            occur.
            */
        // return mainMenu();
        break;
      }
      case Choices.LogOut: {
        const loggedOut = await users.logOut();
        if (!loggedOut) {
          output.error("Error logging out");
        } else output.result("You have been logged out. Use Ctrl-C to quit.");
        return;
      }
      default: {
        return mainMenu();
      }
    }
  } catch (err) {
    output.error(err);
    return;
  }
}

exports.mainMenu = mainMenu;
