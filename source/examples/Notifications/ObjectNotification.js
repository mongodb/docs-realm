async function example() {
  // Open the realm
  const realm = await Realm.open({
    schema: [{name: 'Dog', properties: {name: 'string'}}],
  });

  let dog;

  // Create an entry
  realm.write(() => {
    dog = realm.create('Dog', {name: 'Max'})
  });

  // Observe the dog for changes
  dog.addListener((obj, changes) => {
    // obj === dog
    console.log(`object is deleted? ${changes.deleted}`);
    console.log(`${changes.changedProperties.length} properties have been changed:`);
    changes.changedProperties.forEach((prop) => {
      console.log(` ${prop}`);
    });
  });

  // Later update the dog to trigger the notification
  realm.write(() => {
    dog.name = 'Wolfie'
  });
}
