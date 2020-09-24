console.log(
  "Number of projects with no complete tasks: " +
    projects.filtered("ALL tasks.isComplete == false").length
);
console.log(
  "Number of projects with any top priority tasks: " +
    projects.filtered("ANY tasks.priority == 10").length
);
