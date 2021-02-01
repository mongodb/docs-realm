import Realm from "realm";

const app = new Realm.App({ id: "example-testers-kvjdy" });

describe("Synced Realm", () => {
    test("should open a synced realm", async () => {
        const TaskSchema = {
            name: 'Task',
            properties: {
              _id: 'objectId',
              _partition: 'string?',
              name: 'string',
              status: 'string',
            },
            primaryKey: '_id',
        };

        await app.logIn(Realm.Credentials.anonymous());

        const config = {
            schema: [TaskSchema],
            sync: {
               user: app.currentUser,
               partitionValue: "myPartition",
            }
         };
          
         const realm = await Realm.open(config);
         console.log("r:::", realm)
         expect(realm).toBe({});
    })
})
