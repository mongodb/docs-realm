  // Projects with no complete tasks.
  "NONE tasks.isComplete == true"

  // Projects that contain a task with priority 10
  "ANY tasks.priority == 10"

  // Projects that only contain completed tasks
  "ALL tasks.isComplete == true"
