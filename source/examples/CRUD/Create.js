// Declare the instance.
let dog;

// Open a transaction.
realm.write(() => {
  // Assign a newly-created instance to the variable.
  dog = realm.create("Dog", { name: "Max", age: 5 });
});
