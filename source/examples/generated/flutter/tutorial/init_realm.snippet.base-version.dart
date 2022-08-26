final userItemSub = realm.subscriptions.findByName('getUserItems');
if (userItemSub == null) {
  realm.subscriptions.update((mutableSubscriptions) {
    // server-side rules ensure user only downloads own items
    mutableSubscriptions.add(realm.all<Item>(), name: 'getUserItems');
  });
}
