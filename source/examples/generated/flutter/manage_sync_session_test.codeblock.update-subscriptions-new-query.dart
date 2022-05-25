final longerTrainQuery = realm.all<Train>().query("numCars >= 10");

realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
  mutableSubscriptions.add(longerTrainQuery, name: 'long-trains');
});
