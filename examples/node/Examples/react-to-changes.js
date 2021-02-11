import Realm from "realm";

const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    age: "int?",
  },
};

describe("Read & Write Data", () => {
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
});
