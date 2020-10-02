const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

module.exports.intro = function () {
  clear();
  console.log(
    chalk.green.bold(
      figlet.textSync("Realm Tasks", {
        font: "Colossal",
      })
    )
  );
};

module.exports.header = function (text) {
  console.log(chalk.yellowBright.bold("\n" + text + "\n"));
};

module.exports.error = function (text) {
  console.log(chalk.red.bold("\n ❗\n" + text + "\n ❗\n"));
};

module.exports.result = function (text) {
  console.log(chalk.yellowBright(text + "\n"));
};

module.exports.watchResult = function (header, text) {
  console.log(
    chalk.bgCyan.black("\n---------------" + header + "----------------\n")
  );
  console.log(chalk.cyanBright(text + "\n"));
};
