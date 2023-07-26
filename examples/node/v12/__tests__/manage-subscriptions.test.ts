import Realm, { SubscriptionSetState, WaitForSync } from "realm";
import { APP_ID, PBS_APP_ID } from "../config";

const Task = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
    progressMinutes: "int?",
    owner: "string?",
    dueDate: "date?",
  },
  primaryKey: "_id",
};

const app = new Realm.App({ id: APP_ID });

describe("Managing Sync Subscriptions", () => {
  beforeEach(async () => {
    await app.logIn(Realm.Credentials.anonymous());

    const realm = await Realm.open({
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    });

    // Remove any active subs before each test.
    if (realm.subscriptions.length) {
      await realm.subscriptions.update((mutableSubs) => {
        mutableSubs.removeAll();
      });
    }

    realm.close();
  });

  test("add basic query subscription", async () => {
    const realm = await Realm.open({
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    });

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-basic
    // Get results and subscribe
    const tasks = await realm.objects("Task").subscribe();
    // :snippet-end:

    expect(realm.subscriptions.length).toBe(1);

    // :snippet-start: sub-remove-unnamed
    // Remove unnamed subscriptions.
    let numberRemovedSubscriptions = 0;
    await realm.subscriptions.update((mutableSubs) => {
      numberRemovedSubscriptions = mutableSubs.removeUnnamed();
    });
    // :snippet-end:

    expect(numberRemovedSubscriptions).toEqual(1);
    expect(realm.subscriptions.length).toBe(0);
  });

  test("add first time only wait for sync query subscription", async () => {
    const realm = await Realm.open({
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    });

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-unsubscribe
    // :snippet-start: sub-wait-first
    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects("Task")
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
    const realm = await Realm.open({
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    });

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-always-wait
    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects("Task")
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
    const realm = await Realm.open({
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    });

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-never-wait
    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects("Task")
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
    const realm = await Realm.open({
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    });

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);

    // :snippet-start: sub-with-timeout
    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects("Task")
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
});
