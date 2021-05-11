import Realm from "realm";

describe("Node.js Data Types", () => {
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
  });
});
