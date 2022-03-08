const inquirer = require("inquirer");
const users = require("./users");
const output = require("./output");
const projects = require("./projects");

const Choices = {
  ShowProjects: "Show all of my projects",
  SelectProject: "Select a project",
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
      case Choices.ShowProjects: {
        await projects.showProjects();
        return mainMenu();
      }
      case Choices.SelectProject: {
        return projects.selectProject();
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
    output.error(err.message);
    return;
  }
}


exports.mainMenu = mainMenu;
