let sub1, sub2, sub3;
subscriptions.update((mutableSubscriptionsInstance) => {
  sub1 = mutableSubscriptionsInstance.add(longRunningTasks);
  sub2 = mutableSubscriptionsInstance.add(completedTasks);
  sub3 = mutableSubscriptionsInstance.add(realm.objects("Team"), {
    name: "Developer Education Team",
  });
});
