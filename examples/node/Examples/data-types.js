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
  test("should work with UUID", async () => {
    // :code-block-start: work-with-uuid
    const { UUID } = Realm.BSON;
    const ProfileSchema = {
      name: "Profile",
      primaryKey: "_id",
      properties: {
        _id: "uuid",
        name: "string",
      },
    };
    const realm = await Realm.open({
      schema: [ProfileSchema],
    });
    realm.write(() => {
      realm.create("Profile", {
        name: "John Doe.",
        _id: new UUID(), // create a _id with a randomly generated UUID
      });
      realm.create("Profile", {
        name: "Tim Doe.",
        _id: new UUID("882dd631-bc6e-4e0e-a9e8-f07b685fec8c"), // create a _id with a specific UUId value
      });
    });
    // :code-block-end:

    const johnDoeProfile = realm
      .objects("Profile")
      .filtered("name = 'John Doe.'")[0];

    // test if johnDoeProfile's _id is a valid UUID field
    expect(UUID.isValid(johnDoeProfile._id)).toBe(true);

    // delete the objects to keep the tests idempotent
    realm.write(() => {
      realm.delete(johnDoeProfile);
    });
    // close the realm
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
    // delete the objects to keep the tests idempotent
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
    // delete the objects to keep the tests idempotent
    realm.write(() => {
      realm.delete(harryPotter);
    });
    // close the realm
    realm.close();
  });
});
