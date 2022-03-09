// You can define a listener for any Realm object
const dogs = realm.objects("Dog");

// Define a listener callback function for changes to a specific Dog
function onDogChange(dog, changes) {
  const { deleted, changedProperties } = changes;
  if (deleted) {
    console.log(`${dog.name} was deleted!`);
  } else {
    const numChangedProperties = changes.changedProperties.length;
    console.log(`${numChangedProperties} properties changed for ${dog.name}:`);
    changes.changedProperties.forEach((prop) => {
      console.log(`* the value of "${prop}" changed to ${dog[prop]}`);
    });
  }
}

// Add the listener callback to each Dog individually
dogs.forEach((dog) => {
  dog.addListener(onDogChange);
});

// Remember to remove the listeners when you're done!
dogs.forEach((dog) => {
  dog.removeListener(onDogChange);
});
