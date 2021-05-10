import Realm from "realm";

describe("Node.js Data Types", () => {
  test("should create, update and query Realm dictionaries", async () => {
    // :code-block-start: define-dictionary-in-schema
    const CitySchema = {
      name: "City",
      properties: {
        name: "string",
        home: "{}",
      },
    };
    // :code-block-end:

    const realm = await Realm.open({
      schema: [CitySchema],
    });

    // :code-block-start: create-realm-obj-with-dictionary
    let sanDiegoCity;
    realm.write(() => {
      sanDiegoCity = realm.create("City", {
        name: "san diego",
        home: {
          windows: 5,
          doors: 3,
          floor: 1,
          color: "red",
          address: "Summerhill St.",
        },
      });
    });
    // :code-block-end:

    // :code-block-start: query-a-dictionary
    // find all houses in san diego
    const housesInSanDiego = realm
      .objects("City")
      .filtered("name = 'san diego'");
    // filtered for a house with the address Summerhill St.
    const summerHillHouse = housesInSanDiego.filtered(
      `home['address'] = "Summerhill St."`
    )[0];

    // Find all houses that has windows as a key.
    const housesWithWindows = housesInSanDiego.filtered(
      `home.@keys = "windows" `
    );
    // find all houses that has any field with a value of 'red'
    const redHouses = housesInSanDiego.filtered(`home.@values = "red" `);
    // :code-block-end:

    // the following assertion tests both creation of a dictionary + querying a dictionary
    expect(housesInSanDiego[0].home.windows).toBe(5); // there should be 5 windows in the houses in san diego

    let dictionaryListenerHasBeenCalled = false;
    // :code-block-start: add-a-listener-to-a-dictionary
    summerHillHouse.addListener((changedHouse, changes) => {
      // :hide-start:
      dictionaryListenerHasBeenCalled = true;
      // :hide-end:
      console.log(
        `The following changes have occurred in the home: ${JSON.stringify(
          changes,
          null,
          2
        )}`
      );
    });
    // :code-block-end:

    // :code-block-start: update-a-dictionary
    // update an existing home, from an existing city in the database
    realm.write(() => {
      // use the `put()` method to add a field to a dictionary property
      summerHillHouse.home.put({ style: "Victorian" });
      // alternatively, set a field of a dictionary through dot notation
      summerHillHouse.color = "brown";
    });
    // :code-block-end:

    expect(dictionaryListenerHasBeenCalled).toBe(true); // a home (dictionary inside a realm object) should be able to have a change listener
    expect(summerHillHouse.home.style).toBe("Victorian"); // the summerHillHouse should be a Victorian style house

    let queensCity, yakimaCity;
    realm.write(() => {
      queensCity = realm.create("City", {
        name: "Richmond Hill, Queens, NY",
      });
      yakimaCity = realm.create("City", {
        name: "Yakima, Washington",
      });
    });

    // :code-block-start: setting-new-dictionaries-to-existing-objects
    let newVictorianHome;
    realm.write(() => {
      newVictorianHome = {
        doors: 4,
        floor: 3,
        color: "white",
        address: "Trailwoods Rd.",
      };
      // use the `put()` method to add a dictionary to a pre-existing city in the database
      summerHillHouse.home.put(newVictorianHome);

      // alternatively, use dot notation to add a dictionary to a pre-existing city
      yakimaCity.home = newVictorianHome;
    });
    // :code-block-end:

    // :code-block-start: set-additional-fields
    // use the `put()` method to set a new field, yearBuilt, to the yakimaCity home
    yakimaCity.home.put({ yearBuilt: 1993 });
    // alternatively, use dot notation to add a new field, price, to the yakimaCity home
    yakimaCity.home.price = 512400;
    // :code-block-end:

    expect(yakimaCity.home.color).toBe("white"); // yakimaCity's home should be updated with the newVictorianHome 'white' color

    // :code-block-start: remove-fields-of-the-dictionary
    realm.write(() => {
      // remove the 'color' and 'floors' field of the Yakima City Victorian Home
      yakimaCity.home.remove(["color", "floor"]);
    });
    // :code-block-end:

    expect(yakimaCity.home.color).toBe(undefined); // since color has been removed as a field, it should be undefined

    // delete the objects to keep the test idempotent
    realm.write(() => {
      realm.delete(sanDiegoCity);
      realm.delete(queensCity);
      realm.delete(yakimaCity);
    });
    // close the realm to avoid memory leaks
    realm.close();
  });
});
