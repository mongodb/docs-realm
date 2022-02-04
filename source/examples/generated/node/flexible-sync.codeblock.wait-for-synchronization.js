try {
  realm.subscriptions.update(( mutableSubs) => {
    mutableSubs.add("Person"); // At this point, data may or may not be downloaded.
  });
  await realm.subscriptions.waitForSynchronization(); // wait for the server to acknowledge this set of subscriptions and return the matching objects
  // New data is made available
} catch (error) {
  console.log(error);
}
