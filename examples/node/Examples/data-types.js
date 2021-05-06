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
  });
});
