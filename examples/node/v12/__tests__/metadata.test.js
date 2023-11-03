import Realm, { BSON, MetadataMode } from "realm";
import { Task } from "./models/models.ts";
import { APP_ID } from "../config.ts";

describe("Handle Realm Metadata", () => {
  test("encrypting realm metadata", () => {
    // :snippet-start: encrypt-metadata
    // Retrieve encryption key from secure location or create one
    const encryptionKey = new ArrayBuffer(64);

    // Use encryption key in app configuration
    const config = {
      id: APP_ID,
      metadata: { mode: MetadataMode.Encryption, encryptionKey },
    };
    const app = new Realm.App(config);
    // :snippet-end:

    expect(app).toBeInstanceOf(Realm.App);
  });

  test("encrypting a realm", async () => {
    const taskId = new BSON.ObjectId();
    // :snippet-start: encrypt-realm
    // Retrieve encryption key from secure location or create one
    const encryptionKey = new ArrayBuffer(64);

    // Use encryption key in realm configuration
    const config = {
      schema: [Task],
      encryptionKey: encryptionKey,
    };

    const realm = await Realm.open(config);
    // :snippet-end:
    expect(realm.isClosed).toBeFalsy;

    realm.write(() => {
      realm.create(Task, {
        _id: taskId,
        name: "Sweep the floor",
      });
    });

    const Tasks = realm.objects(Task);
    expect(Tasks.length).toBeGreaterThan(0);

    realm.close();

    // Reopen realm with key
    const openRealmAgain = await Realm.open({
      schema: [Task],
      encryptionKey: encryptionKey,
    });

    const existingTask = openRealmAgain.objectForPrimaryKey(Task, taskId);
    expect(existingTask).toBeTruthy;
    expect(existingTask?._id).toEqual(taskId);
  });
});
