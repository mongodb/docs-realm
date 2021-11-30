const inquirer = require("inquirer");
const Realm = require("realm");
const bson = require("bson");
const index = require("./index");
const output = require("./output");
const users = require("./users");
const main = require("./main");
const tasks = require("./tasks");
const manageTeam = require("./manageTeam");

// :code-block-start: getProjects
async function getProjects() {
  // :state-start: final
  const user = users.getAuthedUser();
  try {
    const { memberOf: projects } = await user.refreshCustomData();

    // Make sure that the user object has been created
    if (!projects) {
      output.error("The user object hasn't been created yet. Try again soon.");
      throw new Error("No projects for user");
    }
    return projects;
  } catch (err) {
    output.error(err);
    output.error("There was a problem accessing custom user data.");
  }
  // :state-end: :state-uncomment-start: start
  // // TODO: Call the refreshCustomData() method to get the user's available
  // projects from custom user data.
  //
  // return projects;
  // :state-uncomment-end:
}
// :code-block-end:

exports.showProjects = async () => {
  const projects = await getProjects();
  output.header("MY PROJECTS:");
  output.result(JSON.stringify(projects, null, 2));
};

exports.selectProject = async () => {
  const projects = await getProjects();
  // Get a list of all the valid project names to show in the menu
  const projectNames = projects.map((p) => p.name);
  try {
    // Let the user select a project by name
    const { selectedProjectName } = await inquirer.prompt({
      type: "rawlist",
      name: "selectedProjectName",
      message: "Which project do you want to access?",
      choices: [...projectNames, new inquirer.Separator()],
    });
    // Find the corresponding project document so that we can get the partition value
    const selectedProject = projects.find(
      (p) => p.name === selectedProjectName
    );
    return projectMenu(selectedProject.partition);
  } catch (err) {
    output.error(err.message);
  }
};

const Choices = {
  CreateTask: "Create a task",
  ShowAllTasks: "Show all of my tasks",
  GetTask: "Get a specific task",
  ChangeTaskStatus: "Change a task status",
  EditTask: "Edit a task",
  DeleteTask: "Delete a task",
  ManageTeam: "Manage my team",
  MainMenu: "Return to main menu",
  LogOut: "Log out / Quit",
};

async function projectMenu(partition) {
  const projectPartition = partition;
  try {
    const answers = await inquirer.prompt({
      type: "rawlist",
      name: "projectMenu",
      message: "What would you like to do?",
      choices: [...Object.values(Choices), new inquirer.Separator()],
    });

    switch (answers.projectMenu) {
      case Choices.CreateTask: {
        await tasks.createTask(projectPartition);
        return projectMenu(projectPartition);
      }
      case Choices.ShowAllTasks: {
        await tasks.getTasks(projectPartition);
        return projectMenu(projectPartition);
      }
      case Choices.GetTask: {
        await tasks.getTask(projectPartition);
        return projectMenu(projectPartition);
      }
      case Choices.ChangeTaskStatus: {
        await tasks.changeStatus(projectPartition);
        return projectMenu(projectPartition);
      }
      case Choices.EditTask: {
        await tasks.editTask();
        return projectMenu(projectPartition);
      }
      case Choices.DeleteTask: {
        await tasks.deleteTask(projectPartition);
        return projectMenu(projectPartition);
      }
      case Choices.ManageTeam: {
        return manageTeam.manageTeamMenu(projectPartition);
      }
      case Choices.MainMenu: {
        return main.mainMenu();
      }
      case Choices.LogOut: {
        const loggedOut = await users.logOut();
        if (!loggedOut) {
          output.error("Error logging out");
        } else output.result("You have been logged out. Use Ctrl-C to quit.");
        return;
      }
      default: {
        return projectMenu();
      }
    }
  } catch (err) {
    output.error(err.message);
    return;
  }
}

exports.projectMenu = projectMenu;
