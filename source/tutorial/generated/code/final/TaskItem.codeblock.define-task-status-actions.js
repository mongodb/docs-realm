if (task.status !== "" && task.status !== Task.STATUS_OPEN) {
  actions.push({
    title: "Mark Open",
    action: () => {
      setTaskStatus(task, Task.STATUS_OPEN);
    },
  });
}
if (task.status !== Task.STATUS_IN_PROGRESS) {
  actions.push({
    title: "Mark In Progress",
    action: () => {
      setTaskStatus(task, Task.STATUS_IN_PROGRESS);
    },
  });
}
if (task.status !== Task.STATUS_COMPLETE) {
  actions.push({
    title: "Mark Complete",
    action: () => {
      setTaskStatus(task, Task.STATUS_COMPLETE);
    },
  });
}