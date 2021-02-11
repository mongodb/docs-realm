import Realm from "realm";

const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    age: "int?",
  },
};

describe("React to Changes", () => {
  test("should register a change listener on the realm", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [DogSchema],
    });
    let dog;
    let hasRealmChanged = false; // boolean value to test if a change to the realm has occurred

    // :code-block-start: react-to-changes-register-change-listener
    // Define a listener callback function
    function onRealmChange() {
      console.log("Something changed!");
      // :hide-start:
      hasRealmChanged = true;
      // :hide-end:
    }
    // Add the listener callback to the realm
    realm.addListener("change", onRealmChange);
    // :hide-start:
    realm.write(() => {
      dog = realm.create("Dog", {
        name: "Spot",
      });
    });
    // :hide-end:
    // Remember to remove the listener when you're done!
    realm.removeListener("change", onRealmChange);
    // :code-block-end:

    // if 'hasRealmChanged' is true, the listener has successfully been registered and fired
    expect(hasRealmChanged).toBe(true);

    // delete the realm objects to make the test idempotent
    realm.write(() => {
      realm.delete(dog);
    });
    // Discard the references.
    dog = null;
    realm.close();
  });
  test("Register a Collection Change Listener", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [DogSchema],
    });
    let dog;

    // boolean values to test if a change to the realm has occurred
    let dogHasBeenInserted = false;
    let dogHasBeenModified = false;
    let dogHasBeenDeleted = false;

    // :code-block-start: react-to-changes-register-collection-change-listener
    // You can define a listener for any collection of Realm objects
    const dogs = realm.objects("Dog");
    // Define a listener callback function for changes to any Dog
    function onDogsChange(dogs, changes) {
      // Handle deleted Dog objects
      changes.deletions.forEach((index) => {
        // You cannot directly access deleted objects,
        // but you can update a UI list, etc. based on the index.
        console.log(`Looks like Dog #${index} has left the realm.`);
        // :hide-start:
        dogHasBeenDeleted = true;
        // :hide-end:
      });

      // Handle newly added Dog objects
      changes.insertions.forEach((index) => {
        const insertedDog = dogs[index];
        console.log(`Welcome our new friend, ${insertedDog.name}!`);
        // :hide-start:
        dogHasBeenInserted = true;
        // :hide-end:
      });
      // Handle Dog objects that were modified
      changes.modifications.forEach((index) => {
        const modifiedDog = dogs[index];
        console.log(`Hey ${modifiedDog.name}, you look different!`);
        // :hide-start:
        dogHasBeenModified = true;
        // :hide-end:
      });
    }
    // Add the listener callback to the collection of dogs
    dogs.addListener(onDogsChange);
    // :hide-start:

    realm.write(() => {
      dog = realm.create("Dog", {
        name: "Spotto",
        age: 2,
      });
    });
    realm.write(() => {
      dog.age += 1;
    });
    realm.write(() => {
      realm.delete(dog);
    });
    realm.write(() => {
      dog = realm.create("Dog", {
        name: "testdog",
        age: 2,
      });
    });
    // :hide-end:
    // Remember to remove the listener when you're done!
    dogs.removeListener(onDogsChange);
    // :code-block-end:

    expect(dogHasBeenInserted).toBe(true);
    expect(dogHasBeenModified).toBe(true);
    expect(dogHasBeenDeleted).toBe(true);

    // delete the realm objects to make the test idempotent
    realm.write(() => {
      realm.delete(dog);
    });
    // Discard the references.
    dog = null;
    realm.close();
  });
});
