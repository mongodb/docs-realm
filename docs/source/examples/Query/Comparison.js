console.log("Number of high priority tasks: "
  + tasks.filtered("priority > 5").length);

console.log(
  "Number of just-started or short-running tasks: " +
    tasks.filtered("1 <= progressMinutes && progressMinutes < 10").length
);

console.log("Number of unassigned tasks: "
  + tasks.filtered("assignee == null").length);
