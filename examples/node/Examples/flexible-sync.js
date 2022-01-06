import Realm from "realm";

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
    progressMinutes: "int?",
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
  test.skip("should open a FS realm, get subscriptions, subscribe to Queryable Fields, ", async () => {
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
    const completedTasks = tasks.filtered('status == "completed"');
    // :code-block-end:

    // :code-block-start: subscribe-to-queryable-fields
    let sub1, sub2, sub3;
    subscriptions.update((mutableSubscriptionsInstance) => {
      sub1 = mutableSubscriptionsInstance.add(longRunningTasks);
      sub2 = mutableSubscriptionsInstance.add(completedTasks);
      sub3 = mutableSubscriptionsInstance.add(realm.objects("Team"), {
        name: "Developer Education Team",
      });
    });
    // :code-block-end:

    // :code-block-start: log-subscription-state
    console.log(realm.getSubscriptions().state); // log the subscription state
    // :code-block-end:

    // :code-block-start: remove-single-subscription
    subscriptions.update((mutableSubscriptionsInstance) => {
      mutableSubscriptionsInstance.remove(longRunningTasks);
    });
    // :code-block-end:

    // :code-block-start: remove-all-subscriptions-of-object-type
    subscriptions.update((mutableSubscriptionsInstance) => {
      mutableSubscriptionsInstance.removeByObjectType("Team");
    });
    // :code-block-end:
  });
});
