subscriptions.update(({ remove }) => {
  // remove a subscription with a specific query
  remove(tasks.filtered('owner == "Ben"'));
});
