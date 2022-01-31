// :replace-start: {
//    "terms": {
//       "MyTask": "Task"
//    }
// }

using System;
using Realms;
using Realms.Sync;
using MongoDB.Bson;
using System.Linq;
using NUnit.Framework;
using System.Threading.Tasks;

namespace Examples
{
    public class FlexibleSyncExamples
    {
        [Test]
        public async Task TestUseFlexibleSync()
        {
            var app = App.Create("dotnet-flexible-wtzwc");
            var user = await app.LogInAsync(Credentials.Anonymous());

            // :code-block-start: open-a-flexible-synced-realm
            var config = new FlexibleSyncConfiguration(app.CurrentUser);
            var realm = Realm.GetInstance(config);
            // :code-block-end:
    

            // :code-block-start: get-subscriptions
            var subscriptions = realm.Subscriptions;
            // :code-block-end:

            // :code-block-start: update-subscriptions
            realm.Subscriptions.Update(() =>
            {
                // subscribe to all long running tasks, and give the subscription the name 'longRunningTasksSubscription'
                var longRunningTasksQuery = realm.All<MyTask>().Where(t => t.Status == "completed" && t.ProgressMinutes > 120 ); 
               subscriptions.Add(longRunningTasksQuery, new() { Name = "longRunningTasks" });

                // subscribe to all of Ben's Task objects
               subscriptions.Add(realm.All<MyTask>().Where(t => t.Owner == "Ben"));

                // subscribe to all Teams, and give the subscription the name 'teamsSubscription' and throw an error if a new query is added to the team subscription
                var teamsSubscriptionOptions = new SubscriptionOptions() { Name = "teamsSubscription", UpdateExisting = false };
                subscriptions.Add(realm.All<Team>(), new() { Name = "teams", UpdateExisting = false }); 
            });
            // :code-block-end:


            // :code-block-start: wait-for-synchronization
            // Wait for the server to acknowledge the subscription change and return all objects
            // matching the query
            await realm.Subscriptions.WaitForSynchronizationAsync();
            // :code-block-end:

            // :code-block-start: update-a-subscription
            realm.Subscriptions.Update(() =>
            {
                var updatedLongRunningTasksQuery = realm.All<MyTask>().Where(t => t.Status == "completed" && t.ProgressMinutes > 130);
                subscriptions.Add(updatedLongRunningTasksQuery, new() { Name = "longRunningTasks" });
            });
            // :code-block-end:

            // :code-block-start: remove-subscription-by-query
            // remove a subscription by it's query
            var query = realm.All<MyTask>().Where(t => t.Owner == "Ben");
            realm.Subscriptions.Remove(query);
            // :code-block-end:

            // :code-block-start: remove-subscription-by-name
            var subscriptionName = "longRunningTasksSubscription";
            realm.Subscriptions.Remove(subscriptionName);
            // :code-block-end:

            // :code-block-start: remove-all-subscriptions-of-object-type
            realm.Subscriptions.RemoveAll("Team");
            // :code-block-end:

            // :code-block-start: remove-all-subscriptions
            realm.Subscriptions.RemoveAll(true);
            // :code-block-end:
        }
    }
    class MyTask : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("name")]
        [Required]
        public string Name { get; set; }

        [MapTo("status")]
        public string Status { get; set; }

        [MapTo("owner")]
        public string Owner { get; set; }

        [MapTo("progressMinutes")]
        public int ProgressMinutes { get; set; }

    }
    public enum TaskStatus
    {
        Open,
        InProgress,
        Complete
    }
    class Team : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("name")]
        [Required]
        public string Name { get; set; }

        [MapTo("description")]
        public string Description { get; set; }

    }
}
// :replace-end: