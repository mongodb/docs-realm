realm.write(() => {
  // Create someone to take care of some dogs.
  const person = realm.create("Person", { name: "Ali" });
  // Find dogs younger than 2.
  const puppies = realm.objects("Dog").filtered("age < 2");
  // Loop through to update.
  puppies.forEach((puppy) => {
    // Give all puppies to Ali.
    puppy.owner = person;
  });
});
