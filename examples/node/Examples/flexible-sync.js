import Realm from "realm";

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
    progressMinutes: "int?",
    owner: "string?",
  },
  primaryKey: "_id",
};

const TeamSchema = {
  name: "Team",
  properties: {
    _id: "int",
    name: "string",
    description: "string?",
  },
  primaryKey: "_id",
};

const app = new Realm.App({ id: "flexsyncjstest-smixl" });

describe("Flexible Sync Tests", () => {
  test.skip("should open a FS realm, get subscriptions, subscribe to Queryable Fields, check state, update a subscription, remove a subscription(s)", async () => {
    await app.logIn(Realm.Credentials.anonymous());
    // :code-block-start: open-flexible-sync-realm
    const realm = await Realm.open({
      schema: [TaskSchema, TeamSchema],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    });
    // :code-block-end:

    // :code-block-start: get-subscriptions
    const subscriptions = realm.getSubscriptions();
    // :code-block-end:

    // :code-block-start: create-queries-to-subscribe-to
    const tasks = realm.objects("Task");
    const longRunningTasks = tasks.filtered(
      'status == "completed" && progressMinutes > 120'
    );
    const bensTasks = tasks.filtered('owner == "Ben"');
    // :code-block-end:

    // :code-block-start: subscribe-to-queryable-fields
    subscriptions.update((mutableSubscriptionsInstance) => {
      mutableSubscriptionsInstance.add(longRunningTasks, {
        name: "longRunningTasksSubscription",
      });
      mutableSubscriptionsInstance.add(bensTasks);
      mutableSubscriptionsInstance.add(realm.objects("Team"), {
        name: "teamsSubscription",
        throwOnUpdate: true,
      });
    });
    // :code-block-end:

    // :code-block-start: log-subscription-state
    console.log(realm.getSubscriptions().state); // log the subscription state
    // :code-block-end:

    // :code-block-start: wait-for-synchronization
    try {
      subscriptions.update((mutableSubscriptionsInstance) => {
        mutableSubscriptionsInstance.add("Person"); // At this point, data may or may not be downloaded.
      });
      await subscriptions.waitForSynchronization(); // wait for the server to acknowledge this set of subscriptions and return the matching objects
      // New data is made available
    } catch (error) {
      console.log(error);
    }
    // :code-block-end:

    // :code-block-start: update-subscriptions
    subscriptions.update((mutableSubscriptionsInstance) => {
      mutableSubscriptionsInstance.add(
        tasks.filtered('status == "completed" && progressMinutes > 180'),
        {
          name: "longRunningTasksSubscription",
        }
      );
    });
    // :code-block-end:

    // :code-block-start: remove-single-subscription
    subscriptions.update((mutableSubscriptionsInstance) => {
      // remove a subscription with a specific query
      mutableSubscriptionsInstance.remove(tasks.filtered('owner == "Ben"'));
    });
    // :code-block-end:

    // :code-block-start: remove-subscription-by-name
    subscriptions.update((mutableSubscriptionsInstance) => {
      // remove a subscription with a specific name
      mutableSubscriptionsInstance.removeByName("longRunningTasksSubscription");
    });
    // :code-block-end:

    // :code-block-start: remove-subscription-by-reference
    let subscriptionReference;
    subscriptions.update((mutableSubscriptionsInstance) => {
      subscriptionReference = mutableSubscriptionsInstance.add(
        realm.objects("Task")
      );
    });

    // later..
    subscriptions.removeSubscription(subscriptionReference);
    // :code-block-end:

    // :code-block-start: remove-all-subscriptions-of-object-type
    subscriptions.update((mutableSubscriptionsInstance) => {
      mutableSubscriptionsInstance.removeByObjectType("Team");
    });
    // :code-block-end:

    // :code-block-start: remove-all-subscriptions
    subscriptions.update((mutableSubscriptionsInstance) => {
      mutableSubscriptionsInstance.removeAll();
    });
    // :code-block-end:
  });
});
