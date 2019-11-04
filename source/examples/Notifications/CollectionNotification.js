const dogs = realm.objects('Dog');

// Define the collection notification listener
function listener(dogs, changes) {

  // Update UI in response to deleted objects
  changes.deletions.forEach((index) => {
    // Deleted objects cannot be accessed directly,
    // but we can update a UI list, etc. knowing the index.
  });

  // Update UI in response to inserted objects
  changes.insertions.forEach((index) => {
    let insertedDog = dogs[index];
    // ...
  });

  // Update UI in response to modified objects
  changes.modifications.forEach((index) => {
    let modifiedDog = dogs[index];
    // ...
  });
}

// Observe collection notifications.
dogs.addListener(listener);

// Unregister all listeners
realm.removeAllListeners();

// OR Unregister this listener
dogs.removeListener(listener);
