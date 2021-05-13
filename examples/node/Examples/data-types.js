import Realm from "realm";
import BSON from "bson";

// :code-block-start: define-embedded-objects
const AddressSchema = {
  name: "Address",
  embedded: true, // default: false
  properties: {
    street: "string?",
    city: "string?",
    country: "string?",
    postalCode: "string?",
  },
};

const ContactSchema = {
  name: "Contact",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    address: "Address", // Embed a single object
  },
};

const BusinessSchema = {
  name: "Business",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    addresses: { type: "list", objectType: "Address" }, // Embed an array of objects
  },
};
// :code-block-end:

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
    expect(peopleWithHousesWithAListedPrice.length).toBe(1); // there should only be one house with a listed price
    expect(redHouse.doors).toBe(3); // the red house should have 3 doors

    let dictionaryListenerHasBeenCalled = false;
    // :code-block-start: add-a-listener-to-a-dictionary
    summerHillHouse.addListener((changedHouse, changes) => {
      // :hide-start:
      dictionaryListenerHasBeenCalled = true;
      // :hide-end:
      console.log("A change has occurred to the Summer Hill House object");
    });
    // :code-block-end:

    // :code-block-start: update-a-dictionary
    realm.write(() => {
      // use the `put()` method to update a field of a dictionary
      summerHillHouse.put({ price: 400100 });
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

    console.log(summerHillHouse);
    // :code-block-start: remove-fields-of-the-dictionary
    realm.write(() => {
      // remove the 'windows' and 'doors' field of the Summerhill House.
      // :uncomment-start:
      // summerHillHouse.remove(["windows", "doors"]);
      // :uncomment-end:
    });
    // :code-block-end:

    // expect(summerHillHouse.windows).toBe(undefined); // since windows has been removed as a field, it should be undefined
    // expect(summerHillHouse.doors).toBe(undefined); // since doors has been removed as a field, it should be undefined

    // delete the objects to keep the test idempotent
    realm.write(() => {
      realm.delete(johnDoe);
      realm.delete(janeSmith);
    });
    // close the realm to avoid memory leaks
    realm.close();
  });
  test("should work with Mixed Type", async () => {
    // :code-block-start: define-mixed-in-schema
    const DogSchema = {
      name: "Dog",
      properties: {
        name: "string",
        birthDate: "mixed",
      },
    };
    // :code-block-end:

    const realm = await Realm.open({
      schema: [DogSchema],
    });

    // :code-block-start: create-objects-with-mixed-values
    realm.write(() => {
      // create a Dog with a birthDate value of type string
      realm.create("Dog", { name: "Euler", birthDate: "December 25th, 2017" });

      // create a Dog with a birthDate value of type date
      realm.create("Dog", {
        name: "Blaise",
        birthDate: new Date("August 17, 2020"),
      });
      // create a Dog with a birthDate value of type int
      realm.create("Dog", {
        name: "Euclid",
        birthDate: 10152021,
      });
      // create a Dog with a birthDate value of type null
      realm.create("Dog", {
        name: "Pythagoras",
        birthDate: null,
      });
    });
    // :code-block-end:

    // :code-block-start: query-objects-with-mixed-values
    // To query for Blaise's birthDate, filter for his name to retrieve the realm object.
    // Use dot notation to access the birthDate property.
    let blaiseBirthDate = realm.objects("Dog").filtered(`name = 'Blaise'`)[0]
      .birthDate;
    console.log(`Blaise's birth date is ${blaiseBirthDate}`);
    // :code-block-end:
    expect(blaiseBirthDate).toEqual(new Date("August 17, 2020"));

    // delete the objects specifically created in this test to keep tests idempotent
    const Euler = realm.objects("Dog").filtered(`name = 'Euler'`)[0];
    const Blaise = realm.objects("Dog").filtered(`name = 'Blaise'`)[0];
    const Euclid = realm.objects("Dog").filtered(`name = 'Euclid'`)[0];
    const Pythagoras = realm.objects("Dog").filtered(`name = 'Pythagoras'`)[0];
    realm.write(() => {
      realm.delete(Euler);
      realm.delete(Blaise);
      realm.delete(Euclid);
      realm.delete(Pythagoras);
    });
    // close the realm
    realm.close();
  });
  test("should create and read and delete an embedded object", async () => {
    const realm = await Realm.open({
      schema: [AddressSchema, ContactSchema],
    });

    // :code-block-start: create-an-embedded-object
    //   create an embedded address object
    const sydneyOrthodontics = {
      street: "42 Wallaby Way",
      city: "Sydney",
      country: "Australia",
      postalCode: "2774",
    };
    realm.write(() => {
      // create a contact object
      realm.create("Contact", {
        _id: new BSON.ObjectId(),
        name: "Philip Sherman",
        address: sydneyOrthodontics, // embed the address in the contact object
      });
    });
    // :code-block-end:

    // :code-block-start: query-an-embedded-object
    const philipShermanAddress = realm
      .objects("Contact")
      .filtered("name = 'Philip Sherman'")[0].address.street;
    console.log(`Philip Sherman's address is ${philipShermanAddress}`);
    // :code-block-end:
    expect(philipShermanAddress).toBe("42 Wallaby Way"); // this assertion tests both the 'query-an-embedded-object' and 'create-an-embedded-object' code blocks

    // // :code-block-start: delete-an-embedded-object
    realm.write(() => {
      // Deleting the contact will delete the embedded address of that contact
      realm.delete(
        realm.objects("Contact").filtered("name = 'Philip Sherman'")
      );
    });
    // :code-block-end:
    // close the realm
    realm.close();
  });
  // update and delete an embedded object
  test("should update and overwrite an embedded object", async () => {
    const realm = await Realm.open({
      schema: [AddressSchema, ContactSchema],
    });
    const harryAddress = {
      street: "4 Privet Drive",
      city: "Little Whinging, Surrey",
      country: "UK",
      postalCode: "WD4 8PN",
    };
    realm.write(() => {
      realm.create("Contact", {
        _id: new BSON.ObjectId(),
        name: "Harry Potter",
        address: harryAddress,
      });
    });

    // :code-block-start: update-an-embedded-object
    // Find the contact with the address you want to update
    const harryPotter = realm
      .objects("Contact")
      .filtered("name = 'Harry Potter'")[0];
    // modify the property of the embedded object in a write transaction
    realm.write(() => {
      // update the embedded object directly through the contact
      harryPotter.address.street = "1 Hogwarts Ave";
    });
    // :code-block-end:
    expect(harryPotter.address.street).toBe("1 Hogwarts Ave");

    // :code-block-start: overwrite-an-embedded-object
    // create a new address
    const harryNewAddress = {
      street: "12 Grimmauld Place",
      city: "London",
      country: "UK",
      postalCode: "E1 7AA",
    };
    realm.write(() => {
      // overwrite the embedded object with the new address within a write transaction
      harryPotter.address = harryNewAddress;
    });
    // :code-block-end:

    expect(harryPotter.address.city).toBe("London");
    // delete the object specifically created in this test to keep tests idempotent
    realm.write(() => {
      realm.delete(harryPotter);
    });
    // close the realm
    realm.close();
  });
});
