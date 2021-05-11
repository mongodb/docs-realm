import Realm from "realm";

describe("Node.js Data Types", () => {
  test("should create, update and query Realm dictionaries", async () => {
    // :code-block-start: define-dictionary-in-schema
    const PersonSchema = {
      name: "Person",
      properties: {
        name: "string",
        home: "{}",
      },
    };
    // :code-block-end:

    const realm = await Realm.open({
      schema: [PersonSchema],
    });

    // :code-block-start: create-realm-obj-with-dictionary
    let johnDoe;
    let janeSmith;
    realm.write(() => {
      johnDoe = realm.create("Person", {
        name: "John Doe",
        home: {
          windows: 5,
          doors: 3,
          color: "red",
          address: "Summerhill St.",
          price: 400123,
        },
      });
      janeSmith = realm.create("Person", {
        name: "Jane Smith",
        home: {
          address: "100 northroad st.",
          yearBuilt: 1990,
        },
      });
    });
    // :code-block-end:

    // :code-block-start: query-a-dictionary
    // query for all Person objects
    const persons = realm.objects("Person");

    // run the `.filtered()` method on all the returned persons to find the house with the address "Summerhill St."
    const summerHillHouse = persons.filtered(
      `home['address'] = "Summerhill St."`
    )[0].home;

    // Find all people that have a house with a listed price
    const peopleWithHousesWithAListedPrice = persons.filtered(
      `home.@keys = "price" `
    );
    // find a house that has any field with a value of 'red'
    const redHouse = persons.filtered(`home.@values = "red" `)[0].home;
    // :code-block-end:

    // the following assertion tests both creation of a dictionary + querying a dictionary
    expect(summerHillHouse.windows).toBe(5); // there should be 5 windows in the summer hill house
    expect(peopleWithHousesWithAListedPrice.length).toBe(1); // there should only be one house with a listed price
    expect(redHouse.doors).toBe(3); // the red house should have 3 doors

    let dictionaryListenerHasBeenCalled = false;
    // :code-block-start: add-a-listener-to-a-dictionary
    summerHillHouse.addListener((changedHouse, changes) => {
      // :hide-start:
      dictionaryListenerHasBeenCalled = true;
      // :hide-end:
      console.log("A change has occurred to the Summer Hill House Object");
    });
    // :code-block-end:

    // :code-block-start: update-a-dictionary
    realm.write(() => {
      // use the `put()` method to update a field of a dictionary
      summerHillHouse.price = 400100;
      // alternatively, update a field of a dictionary through dot notation
      summerHillHouse.color = "brown";
      // update a dictionary by adding a field
      summerHillHouse.yearBuilt = 2004;
    });
    // :code-block-end:

    expect(dictionaryListenerHasBeenCalled).toBe(true); // a home (dictionary inside a realm object) should be able to have a change listener
    expect(summerHillHouse.price).toBe(400100); // the summerHillHouse should be $400,100 now
    expect(summerHillHouse.color).toBe("brown"); // the summerHillHouse should be brown now
    expect(summerHillHouse.yearBuilt).toBe(2004); // the summerHillHouse should've been built in 2004

    // :code-block-start: remove-fields-of-the-dictionary
    realm.write(() => {
      // remove the 'color' and 'floors' field of the Summerhill House.
      summerHillHouse.remove(["windows", "doors"]);
    });
    // :code-block-end:

    expect(summerHillHouse.color).toBe(undefined); // since color has been removed as a field, it should be undefined
    expect(summerHillHouse.floor).toBe(undefined); // since color has been removed as a field, it should be undefined

    // delete the objects to keep the test idempotent
    realm.write(() => {
      realm.delete(johnDoe);
      realm.delete(janeSmith);
    });
    // close the realm to avoid memory leaks
    realm.close();
  });
});
