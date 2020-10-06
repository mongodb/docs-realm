const setTaskStatus = (task, status) => {
  // One advantage of centralizing the realm functionality in this provider is
  // that we can check to make sure a valid status was passed in here.
  if (
    ![
      Task.STATUS_OPEN,
      Task.STATUS_IN_PROGRESS,
      Task.STATUS_COMPLETE,
    ].includes(status)
  ) {
    throw new Error(`Invalid status: ${status}`);
  }
  const projectRealm = realmRef.current;

  projectRealm.write(() => {
    task.status = status;
  });
};