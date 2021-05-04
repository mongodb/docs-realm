const Realm = require("realm");
const BSON = require("bson");
const app = new Realm.App({ id: "synced-schema-changes-tester-quljf" });
const credentials = Realm.Credentials.anonymous();

const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    age: "int?",
  },
};

describe("Schema Changes for Synced Realms", () => {
  // this test is skipped because we currently are unable to test Synced Realms
  // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
  test.skip("should add a property to the schema of a synced realm", async () => {
    await app.logIn(credentials);
    const syncConfig = {
      user: app.currentUser,
      partitionValue: "myPartition",
    };

    async function openRealmWithInitialSchema() {
      // :code-block-start: sync-schema-changes-add-a-property-initial-schema
      const DogSchema = {
        name: "Dog",
        properties: {
          name: "string",
        },
      };
      const config = {
        sync: syncConfig, // a predefined sync configuration object
        schema: [DogSchema],
      };
      const realm = await Realm.open(config);
      // :code-block-end:
      return realm;
    }

    async function openRealmWithUpdatedSchema() {
      // :code-block-start: sync-schema-changes-add-a-property-updated-schema
      const DogSchema = {
        name: "Dog",
        properties: {
          name: "string",
          owner: "Person",
        },
      };
      const PersonSchema = {
        name: "Person",
        properties: {
          name: "string",
          birthdate: "date",
        },
      };
      const config = {
        sync: syncConfig, // a predefined sync configuration object
        schema: [DogSchema, PersonSchema],
      };
      const realm = await Realm.open(config);
      // :code-block-end:
      return realm;
    }
    const realmWithInitialSchema = openRealmWithInitialSchema();
    const realmWithUpdatedSchema = openRealmWithUpdatedSchema();

    // you can test that a realm has been open in general (but not if a realm has been open with a specific path or schema)
    expect(realmWithInitialSchema).toStrictEqual(new Realm());
    expect(realmWithUpdatedSchema).toStrictEqual(new Realm());
  });
  test.skip("should delete a property from the schema of a synced realm", async () => {
    await app.logIn(credentials);
    const syncConfig = {
      user: app.currentUser,
      partitionValue: "myPartition",
    };

    async function openRealmWithInitialSchema() {
      // :code-block-start: sync-schema-changes-delete-a-property-initial-schema
      const DogSchema = {
        name: "Dog",
        properties: {
          name: "string",
          breed: "string",
        },
      };
      const config = {
        sync: syncConfig, // a predefined sync configuration object
        schema: [DogSchema],
      };
      const realm = await Realm.open(config);
      realm.write(() => {
        realm.create("Dog", { name: "Scruffy", breed: "Husky" });
      });
      // :code-block-end:
      return realm;
    }

    async function openRealmWithUpdatedSchema() {
      // :code-block-start: sync-schema-changes-delete-a-property-updated-schema
      const DogSchema = {
        name: "Dog",
        properties: {
          name: "string",
        },
      };
      const config = {
        sync: syncConfig, // a predefined sync configuration object
        schema: [DogSchema],
      };
      const realm = await Realm.open(config);
      realm.write(() => {
        realm.create("Dog", { name: "Spot" });
      });
      // :code-block-end:
      return realm;
    }
    const realmWithInitialSchema = openRealmWithInitialSchema();
    const realmWithUpdatedSchema = openRealmWithUpdatedSchema();
    const realm = realmWithUpdatedSchema;
    // :code-block-start: sync-schema-changes-delete-a-property-log-objects
    const scruffyDog = realm.objects("Dog").filtered("name = 'Scruffy'")[0];
    const spotDog = realm.objects("Dog").filtered("name = 'Spot'")[0];
    console.log(`Scruffy the dog: ${JSON.stringify(scruffyDog, null, 2)}`);
    console.log(`Spot the dog: ${JSON.stringify(spotDog, null, 2)}`);
    // :code-block-end:
    expect(scruffyDog.breed).toStrictEqual("Husky");
    // expect the schema with the deleted breed property to have an empty string ""
    expect(spotDog.breed).toStrictEqual("");
  });
});
