const output = require("./output");
const index = require("./index");

function listener(tasks, changes) {
  changes.deletions.forEach((index) => {
    // Deleted objects cannot be accessed directly,
    // but we can update a UI list, etc. knowing the index.
    output.watchResult("Task Deleted", "A task has been deleted.");
  });

  changes.insertions.forEach((index) => {
    let insertedTask = tasks[index];
    output.watchResult("Task Created", JSON.stringify(insertedTask, null, 2));
  });

  changes.modifications.forEach((index) => {
    let modifiedTask = tasks[index];
    output.watchResult("Task Modified", JSON.stringify(modifiedTask, null, 2));
  });
}

async function watchForChanges() {
  const realm = await index.getRealm();
  const tasks = realm.objects("Task");
  tasks.addListener(listener);
}

module.exports.watchForChanges = watchForChanges;
