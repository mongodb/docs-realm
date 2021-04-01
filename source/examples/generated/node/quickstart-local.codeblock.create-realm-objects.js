// Add a couple of Tasks in a single, atomic transaction
let task1, task2;
realm.write(() => {
  task1 = realm.create("Task", {
    _id: 1,
    name: "go grocery shopping",
    status: "Open",
  });

  task2 = realm.create("Task", {
    _id: 2,
    name: "go exercise",
    status: "Open",
  });
  console.log(`created two tasks: ${task1.name} & ${task2.name}`);
});
// use task1 and task2
