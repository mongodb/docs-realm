final userTaskSub =
    realm.subscriptions.findByName('getUserItemsWithPriority'); 
if (userTaskSub == null) {
  realm.subscriptions.update((mutableSubscriptions) {
    // server-side rules ensure user only downloads own tasks
    mutableSubscriptions.add(
        realm.query<Item>(
          'priority <= \$0 OR priority == nil',
          [PriorityLevel.high],
        ),
        name: 'getUserItemsWithPriority');
  });
}
