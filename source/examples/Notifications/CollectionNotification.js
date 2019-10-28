collectionListenerRetainer = realm.objects('Dog').filtered('age < 2');

// Observe Collection Notifications
function listener(puppies, changes) {

  // Update UI in response to inserted objects
  changes.insertions.forEach((index) => {
    let insertedDog = puppies[index];
    // ...
  });

  // Update UI in response to modified objects
  changes.modifications.forEach((index) => {
    let modifiedDog = puppies[index];
    // ...
  });

  // Update UI in response to deleted objects
  changes.deletions.forEach((index) => {
    // Deleted objects cannot be accessed directly
    // Support for accessing deleted objects coming soon...
    // ...
  });
}

collectionListenerRetainer.addListener(listener);

// Unregister all listeners
realm.removeAllListeners();

// OR Unregister this listener
collectionListenerRetainer.removeListener(listener);
