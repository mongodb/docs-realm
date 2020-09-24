console.log(
  "Number of Ali's complete tasks: " +
    tasks.filtered("assignee == 'Ali' && isComplete == true").length
);
