import Realm, { SubscriptionSetState, WaitForSync } from "realm";
import { APP_ID, PBS_APP_ID } from "../config";
import { SubscriptionOptions } from "realm/dist/bundle";

class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  name!: String;
  status?: String;
  progressMinutes?: Number;
  owner?: String;
  dueDate?: Date;

  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      name: "string",
      status: "string?",
      progressMinutes: "int?",
      owner: "string?",
      dueDate: "date?",
    },
    primaryKey: "_id",
  };
}

const app = new Realm.App({ id: APP_ID });
const inProgressId = new Realm.BSON.ObjectId();

async function writeTestObjects(realm: Realm) {
  realm.write(() => {
    realm.create(Task, {
      _id: new Realm.BSON.ObjectId(),
      name: "Do the dishes",
      status: "Complete",
    });
    realm.create(Task, {
      _id: new Realm.BSON.ObjectId(),
      name: "Vacuum the rug",
      status: "Complete",
    });
    realm.create(Task, {
      _id: inProgressId,
      name: "Clean the bathroom",
      status: "In progress",
    });
  });
}

describe("Managing Sync Subscriptions", () => {
  beforeEach(async () => {
    await app.logIn(Realm.Credentials.anonymous());

    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    // Remove any active subs before each test.
    if (realm.subscriptions.length) {
      await realm.subscriptions.update((mutableSubs) => {
        mutableSubs.removeAll();
      });
    }

    realm.close();
  });

  test("add basic query subscription", async () => {
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-basic
    const completedTasks = await realm
      .objects(Task)
      .filtered('status == "completed"')
      .subscribe();
    const longRunningTasks = await completedTasks
      .filtered('status == "completed" && progressMinutes > 120')
      .subscribe();
    // :snippet-end:

    expect(realm.subscriptions.length).toBe(2);

    // :snippet-start: sub-remove-unnamed
    // Remove unnamed subscriptions.
    let numberRemovedSubscriptions = 0;
    await realm.subscriptions.update((mutableSubs) => {
      numberRemovedSubscriptions = mutableSubs.removeUnnamed();
    });
    // :snippet-end:

    expect(numberRemovedSubscriptions).toEqual(2);
    expect(realm.subscriptions.length).toBe(0);
  });

  test("name a subscription", async () => {
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // TODO: Create JS version
    // :snippet-start: sub-name
    const subOptions: SubscriptionOptions = {
      name: "All completed tasks",
    };
    const completedTasks = await realm
      .objects(Task)
      .filtered('status == "completed"')
      .subscribe(subOptions);
    const completedTasksSubscription = realm.subscriptions.findByName(
      "All completed tasks"
    );
    // :snippet-end:

    expect(realm.subscriptions.length).toBe(1);
    expect(completedTasksSubscription).not.toBe(null);

    // Remove unnamed subscriptions.
    completedTasks.unsubscribe();

    expect(realm.subscriptions.length).toBe(0);
  });

  test("add first time only wait for sync query subscription", async () => {
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-unsubscribe
    // :snippet-start: sub-wait-first
    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects(Task)
      .filtered("status == 'completed'");

    // Add a sync subscription. Only waits for sync to finish
    // the first time the subscription is added.
    await completedTasks.subscribe({
      behavior: WaitForSync.FirstTime,
      name: "First time sync only",
    });
    // :snippet-end:
    // :remove-start:
    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Complete);

    // Add subscription a second time. Does note wait for
    // sync to finish.
    await completedTasks.subscribe({
      behavior: WaitForSync.FirstTime,
      name: "First time sync only",
    });

    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Pending);

    expect(realm.subscriptions.length).toBe(1);
    // :remove-end:

    // Unsubscribe
    completedTasks.unsubscribe();
    // :snippet-end:

    expect(realm.subscriptions.length).toBe(0);
  });

  test("add always wait for sync query subscription", async () => {
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-always-wait
    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects(Task)
      .filtered("status == 'completed'");

    // Add a sync subscription. Always waits for sync to finish,
    // no matter how many times the subscription is added.
    await completedTasks.subscribe({
      behavior: WaitForSync.Always,
      name: "Always wait for sync",
    });
    // :snippet-end:

    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Complete);

    // Add subscription a second time. Will wait for
    // sync to finish.
    await completedTasks.subscribe({
      behavior: WaitForSync.Always,
      name: "Always wait for sync",
    });

    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Complete);

    expect(realm.subscriptions.length).toBe(1);

    // Unsubscribe
    completedTasks.unsubscribe();

    expect(realm.subscriptions.length).toBe(0);
  });

  test("add never wait for sync query subscription", async () => {
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-never-wait
    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects(Task)
      .filtered("status == 'completed'");

    // Add a sync subscription. Will not wait for sync to finish.
    await completedTasks.subscribe({
      behavior: WaitForSync.Never,
      name: "Never wait for sync",
    });
    // :snippet-end:

    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Pending);

    // Add subscription a second time. Will not wait for
    // sync to finish.
    await completedTasks.subscribe({
      behavior: WaitForSync.Never,
      name: "Never wait for sync",
    });

    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Pending);

    expect(realm.subscriptions.length).toBe(1);

    // Unsubscribe
    completedTasks.unsubscribe();

    expect(realm.subscriptions.length).toBe(0);
  });

  test("add timeout query subscription", async () => {
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-with-timeout
    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects(Task)
      .filtered("status == 'completed'");

    // Add subscription with timeout
    // If timeout is not long enough, will not wait for sync.
    const taskSubscription = await completedTasks.subscribe({
      behavior: WaitForSync.Always,
      timeout: 500,
    });
    // :snippet-end:

    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Complete);
    expect(realm.subscriptions.length).toBe(1);

    // Unsubscribe
    taskSubscription.unsubscribe();

    expect(realm.subscriptions.length).toBe(0);
  });

  test("open an FS realm with initial subscriptions", async () => {
    // :snippet-start: set-initial-subscriptions
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
        initialSubscriptions: {
          update: (subs, realm) => {
            subs.add(realm.objects(Task).filtered("status == 'in progress'"), {
              name: "In progress tasks",
            });
          },
          rerunOnOpen: true,
        },
      },
    };

    const realm = await Realm.open(config);
    // :snippet-end:

    expect(realm.isClosed).toBeFalsy();

    const sub = realm.subscriptions.findByName("In progress tasks");

    // There should be 1 active subscription from initialSubscriptions.
    expect(realm.subscriptions.length).toBe(1);
    expect(sub).not.toBeFalsy();

    await writeTestObjects(realm);

    const subscribedTasks = realm
      .objects("Task")
      .filtered("status == 'In progress'");

    expect(subscribedTasks.length).toBe(1);
    expect(subscribedTasks[0]._id).toEqual(inProgressId);
  });
});
