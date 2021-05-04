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

describe("Additive Schema Changes for Synced Realms", () => {
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
    // close the realms
    realmWithInitialSchema.close();
    realmWithUpdatedSchema.close();
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

    // close the realms
    realmWithInitialSchema.close();
    realmWithUpdatedSchema.close();
  });
});
describe("Destructive Schema Changes for Synced Realms", () => {
  // this test is skipped because we currently are unable to test Synced Realms
  // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
  test.skip("should create an initial collection", async () => {
    // :code-block-start: sync-schema-changes-destructive-changes-initial-collection
    const TaskSchema = {
      name: "Task",
      properties: {
        _id: "objectId",
        name: "string",
        difficulty: "int",
      },
      primaryKey: "_id",
    };

    async function createInitialCollection() {
      await app.logIn(credentials);
      const syncConfig = {
        user: app.currentUser,
        partitionValue: "myPartition",
      };
      const realm = await Realm.open({
        schema: [TaskSchema],
        sync: syncConfig, // predefined sync configuration object
      });
      // :hide-start:
      const tasks = realm.objects("Task");
      realm.write(() => {
        realm.delete(tasks); // delete tasks objects to keep unit test idempotent
      });
      // :hide-end:
      // Create some tasks in the first client
      realm.write(() => {
        realm.create("Task", {
          _id: new BSON.ObjectID(),
          name: "Buy some groceries from Trader Joes",
          difficulty: 1,
        });
        realm.create("Task", {
          _id: new BSON.ObjectID(),
          name: "Buy some notebooks from Staples",
          difficulty: 1,
        });
        realm.create("Task", {
          _id: new BSON.ObjectID(),
          name: "Wash the car",
          difficulty: 2,
        });
      });
      // :hide-start:
      return realm;
      // :hide-end:
    }
    // :code-block-end:
    const realm = createInitialCollection();
    // test if the objects have been written to the collection with the initial schema
    expect(realm.objects("Task").length).toBe(3);

    // close the realm
    realm.close();
  });
  test.skip("should create a second version of the collection", async () => {
    // :code-block-start: sync-schema-changes-destructive-changes-second-version-collection
    const TaskSchema = {
      name: "Task",
      properties: {
        _id: "objectId",
        name: "string",
        difficulty: "int",
      },
      primaryKey: "_id",
    };

    const TaskSchemaV2 = {
      name: "TaskV2",
      properties: {
        _id: "objectId",
        name: "string",
        difficulty: { type: "int", optional: true },
      },
      primaryKey: "_id",
    };

    async function createSecondVersionOfCollection() {
      await app.logIn(credentials);
      const syncConfig = {
        user: app.currentUser,
        partitionValue: "myPartition",
      };

      const realm = await Realm.open({
        schema: [TaskSchema, TaskSchemaV2],
        sync: syncConfig, // predefined sync configuration object
      });
      //:hide-start:
      const tasks = realm.objects("Task");
      const tasksV2 = realm.objects("TaskV2");

      realm.write(() => {
        realm.delete(tasksV2);
      });
      // :hide-end:

      // copy the objects from the initial collection to partner collection with the modified schema
      tasks.map((task) => {
        realm.write(() => {
          realm.create("TaskV2", task);
        });
      });

      // check to see if both collection have the same objects
      console.log(
        `The lists of tasks are: ${tasks.map((task) =>
          JSON.stringify(task, null, 2)
        )}`
      );
      console.log(
        `The lists of version 2 tasks are: ${tasksV2.map((task) =>
          JSON.stringify(task, null, 2)
        )}`
      );
    }
    // :code-block-end:
    const realm = createSecondVersionOfCollection();
    // test if the objects have been written to the collection with the initial schema
    expect(realm.objects("TaskV2").length).toBe(3);

    // close the realm
    realm.close();
  });
});
