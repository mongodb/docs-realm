  // Projects with no complete tasks.
  "NONE tasks.isComplete == true"

  // Projects that contain a task with priority 10
  "ANY tasks.priority == 10"

  // Projects that only contain completed tasks
  "ALL tasks.isComplete == true"

  // Projects with at least one task assigned to either Alex or Ali
  "ANY tasks.assignee IN { 'Alex', 'Ali' }"

  // Projects with no tasks assigned to either Alex or Ali
  "NONE tasks.assignee IN { 'Alex', 'Ali' }"
