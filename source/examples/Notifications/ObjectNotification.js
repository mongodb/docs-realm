async function example() {
  // Open the default realm.
  const realm = await Realm.open();

  let dog;

  // Create an entry.
  realm.write(() => {
    dog = realm.create('Dog', {name: 'Max'})
  });

  // Observe object notifications.
  dog.addListener((_changedDog, changes) => {
    console.log(`dog is deleted? ${changes.deleted}`);
    console.log(`${changes.changedProperties.length} properties have been changed:`);
    changes.changedProperties.forEach((prop) => {
      console.log(` ${prop}`);
    });
  });

  // Later, update the dog to trigger the notification.
  realm.write(() => {
    dog.name = 'Wolfie'
  });
}
