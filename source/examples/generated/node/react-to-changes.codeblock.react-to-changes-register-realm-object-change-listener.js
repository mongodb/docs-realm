
// Define a listener callback function for changes to a specific Dog
function onDogChange(dog, changes) {
  if (changes.deleted) {
    console.log(`dog is deleted: ${changes.deleted}`);
  } else {
    changes.changedProperties.forEach((prop) => {
      console.log(`* the value of "${prop}" changed to ${dog[prop]}`);
    });
  }
}
// You can define a listener for any Realm object
dog.addListener(onDogChange);
// Remember to remove the listeners when you're done!
dog.removeListener(onDogChange);
