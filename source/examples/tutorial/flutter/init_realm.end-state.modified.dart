final userItemSub = realm.subscriptions.findByName(
  'getUserItemsWithHighPriority'
);
if (userItemSub == null) {
  realm.subscriptions.update((mutableSubscriptions) {
      // server-side rules ensure user only downloads own items
      mutableSubscriptions.add(
        realm.query<Item>(
            'priority <= \$0', [PriorityLevel.high]
        ),
        name: 'getUserItemsWithHighPriority');
  });
}
