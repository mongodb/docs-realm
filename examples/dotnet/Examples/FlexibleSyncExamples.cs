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
using Realms.Exceptions.Sync;

namespace Examples
{
    public class FlexibleSyncExamples
    {
        public async Task TestUseFlexibleSync()
        {
            var app = App.Create("dotnet-flexible-wtzwc");
            var user = await app.LogInAsync(Credentials.Anonymous());

            // :snippet-start: open-a-flexible-synced-realm
            var config = new FlexibleSyncConfiguration(app.CurrentUser);
            var realm = Realm.GetInstance(config);
            // :snippet-end:


            // :snippet-start: botostrap-a-subscription
            // :uncomment-start:
            // var config = new FlexibleSyncConfiguration(app.CurrentUser)
            // {
            //     PopulateInitialSubscriptions = (realm) =>
            //     {
            //         var myTasks = realm.All<Task>().Where(n => n.AuthorId == myUserId);
            //         realm.Subscriptions.Add(myTasks);
            //     }
            // };
            // 
            // // The process will complete when all the user's tasks have been downloaded.
            // var realm = await Realm.GetInstanceAsync(config);
            // :uncomment-end:
            // :snippet-end:

            // :snippet-start: get-subscriptions
            var subscriptions = realm.Subscriptions;
            // :snippet-end:

            // :snippet-start: update-subscriptions
            realm.Subscriptions.Update(() =>
            {
                // subscribe to all long running tasks, and give the subscription the name 'longRunningTasksSubscription'
                var longRunningTasksQuery = realm.All<MyTask>().Where(t => t.Status == "completed" && t.ProgressMinutes > 120 );
                realm.Subscriptions.Add(longRunningTasksQuery, new SubscriptionOptions() { Name = "longRunningTasks" });

                // subscribe to all of Ben's Task objects
                realm.Subscriptions.Add(realm.All<MyTask>().Where(t => t.Owner == "Ben"));

                // subscribe to all Teams, and give the subscription the name 'teamsSubscription' and throw an error if a new query is added to the team subscription
                realm.Subscriptions.Add(realm.All<Team>(), new SubscriptionOptions() { Name = "teams", UpdateExisting = false }); 
            });
            // :snippet-end:


            // :snippet-start: wait-for-synchronization
            // Wait for the server to acknowledge the subscription change and return all objects
            // matching the query
            try
            {
                await realm.Subscriptions.WaitForSynchronizationAsync();
            }
            catch (SubscriptionException ex)
            {
                // do something in response to the exception or log it
                Console.WriteLine($@"The subscription set's state is Error and synchronization is paused:  {ex.Message}");
            }
            // :snippet-end:

            // :snippet-start: update-a-subscription
            realm.Subscriptions.Update(() =>
            {
                var updatedLongRunningTasksQuery = realm.All<MyTask>().Where(t => t.Status == "completed" && t.ProgressMinutes > 130);
                realm.Subscriptions.Add(updatedLongRunningTasksQuery, new SubscriptionOptions() { Name = "longRunningTasks" });
            });
            // :snippet-end:

            // :snippet-start: remove-subscription-by-query
            realm.Subscriptions.Update(() =>
            {
                // remove a subscription by it's query
                var query = realm.All<MyTask>().Where(t => t.Owner == "Ben");
                realm.Subscriptions.Remove(query);
            });
            // :snippet-end:

            // :snippet-start: remove-subscription-by-name
            realm.Subscriptions.Update(() =>
            {
                // remove a named subscription
                var subscriptionName = "longRunningTasksSubscription";
                realm.Subscriptions.Remove(subscriptionName);
            });
            // :snippet-end:

            // :snippet-start: remove-all-subscriptions-of-object-type
            realm.Subscriptions.Update(() =>
            {
                // remove all subscriptions of the "Team" Class Name 
                realm.Subscriptions.RemoveAll("Team");

                // Alernatively, remove all subscriptions of the "Team" object type
                realm.Subscriptions.RemoveAll<Team>();
            });
            // :snippet-end:

            // :snippet-start: remove-all-subscriptions
            realm.Subscriptions.Update(() =>
            {
                // remove all subscriptions, including named subscriptions
                realm.Subscriptions.RemoveAll(true);
            });
            // :snippet-end:
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