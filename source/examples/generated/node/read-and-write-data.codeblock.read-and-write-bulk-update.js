realm.write(() => {
  // Create someone to take care of some dogs.
  const person = realm.create("Person", { name: "Ali" });
  // Find dogs younger than 2.
  const puppies = realm.objects("Dog").filtered("age < 2");

  // const results = realm.objects("whatever").filtered("whatever == 2");
  // for (const obj of results) {
  //   obj.whatever = 3;
  // }
  // Loop through to update.
  for (const puppy of puppies) {
    // Give all puppies to Ali.
    puppy.owner = person;
  }
  // Loop through to update.
  // puppies.forEach((puppy) => {
  //   // Give all puppies to Ali.
  //   puppy.owner = person;
  // });
});
