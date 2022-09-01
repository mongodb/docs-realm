// old subscriptions
final userItemSub = realm.subscriptions.findByName('getUserItems');
final userItemSubWithPriority =
    realm.subscriptions.findByName('getUserItemsWithPriority');
final userItemSubWithPriorityOrNothing =
    realm.subscriptions.findByName('getUserItemsWithPriorityOrNothing');

if (userItemSubWithPriorityOrNothing == null) {
  realm.subscriptions.update((mutableSubscriptions) {
    if (userItemSub != null) {
      mutableSubscriptions.remove(userItemSub);
    }
    if (userItemSubWithPriority != null) {
      mutableSubscriptions.remove(userItemSubWithPriority);
    }
    // server-side rules ensure user only downloads own items
    mutableSubscriptions.add(
        realm.query<Item>(
          'priority <= \$0 OR priority == nil',
          [PriorityLevel.high],
        ),
        name: 'getUserItemsWithPriorityOrNothing');
  });
}
