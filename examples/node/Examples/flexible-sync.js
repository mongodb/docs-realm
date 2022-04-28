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
    // get the SubscriptionSet for the realm
    const subscriptions = realm.subscriptions;
    // :code-block-end:

    // :code-block-start: create-queries-to-subscribe-to
    const tasks = realm.objects("Task");
    const longRunningTasks = tasks.filtered(
      'status == "completed" && progressMinutes > 120'
    );
    const bensTasks = tasks.filtered('owner == "Ben"');
    // :code-block-end:

    // :code-block-start: subscribe-to-queryable-fields
    await realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(longRunningTasks, {
        name: "longRunningTasksSubscription",
      });
      mutableSubs.add(bensTasks);
      mutableSubs.add(realm.objects("Team"), {
        name: "teamsSubscription",
        throwOnUpdate: true,
      });
    });
    // :code-block-end:

    // :code-block-start: log-subscription-state
    console.log(realm.subscriptions.state); // log the subscription state
    // :code-block-end:

    // :code-block-start: update-subscriptions
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(
        tasks.filtered('status == "completed" && progressMinutes > 180'),
        {
          name: "longRunningTasksSubscription",
        }
      );
    });
    // :code-block-end:

    // :code-block-start: remove-single-subscription
    realm.subscriptions.update((mutableSubs) => {
      // remove a subscription with a specific query
      mutableSubs.remove(tasks.filtered('owner == "Ben"'));
    });
    // :code-block-end:

    // :code-block-start: remove-subscription-by-name
    realm.subscriptions.update((mutableSubs) => {
      // remove a subscription with a specific name
      mutableSubs.removeByName("longRunningTasksSubscription");
    });
    // :code-block-end:

    // :code-block-start: remove-subscription-by-reference
    let subscriptionReference;
    realm.subscriptions.update((mutableSubs) => {
      subscriptionReference = mutableSubs.add(realm.objects("Task"));
    });
    // later..
    realm.subscriptions.removeSubscription(subscriptionReference);
    // :code-block-end:

    // :code-block-start: remove-all-subscriptions-of-object-type
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.removeByObjectType("Team");
    });
    // :code-block-end:

    // :code-block-start: remove-all-subscriptions
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.removeAll();
    });
    // :code-block-end:
  });
});
