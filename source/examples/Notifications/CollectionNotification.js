const puppies = realm.objects('Dog').filtered('age < 2');

// Define the collection notification listener
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
    // ...
  });
}

// Register the collection listener
puppies.addListener(listener);

// Unregister all listeners
realm.removeAllListeners();

// OR Unregister this listener
puppies.removeListener(listener);
