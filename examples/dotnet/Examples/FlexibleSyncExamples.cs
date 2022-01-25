using System;
using Realms;
using Realms.Sync;
using MongoDB.Bson;
using System.Linq;
using NUnit.Framework;

namespace Examples
{
    public class FlexibleSyncExamples
    {
        public FlexibleSyncExamples()
        {

        }
        [Test]
        public async void testUseFlexibleSync()
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

            // :code-block-start: update-subscriptions:
            subscriptions.Update(() =>
            {
                // subscribe to all long running tasks, and give the subscription the name 'longRunningTasksSubscription'
                var longRunningTasksQuery = realm.All<Task>().Where(t => t.Status == "completed" && t.ProgressMinutes > 120 ); 
                var longRunningTasksSubscriptionOptions = new SubscriptionOptions() { Name = "longRunningTasksSubscription" };
                var longRunningTasksSubscription = subscriptions.Add(longRunningTasksQuery, longRunningTasksSubscriptionOptions);

                // subscribe to all of Ben's Task objects
                var bensTasks = subscriptions.Add(realm.All<Task>().Where(t => t.Owner == "Ben"));

                // subscribe to all Teams, and give the subscription the name 'teamsSubscription' and throw an error if a new query is added to the team subscription
                var teamsSubscriptionOptions = new SubscriptionOptions() { Name = "teamsSubscription", UpdateExisting = false };
                var teamsSubscription = subscriptions.Add(realm.All<Team>(), teamsSubscriptionOptions); 
            });
            // :code-block-end:


            // :code-block-start: wait-for-synchronization
            // Wait for the server to acknowledge the subscription and return all objects
            // matching the query
            await subscriptions.WaitForSynchronizationAsync();
            // :code-block-end:

            // :code-block-start: update-a-subscription
            subscriptions.Update(() =>
            {
                var updatedLongRunningTasksQuery = realm.All<Task>().Where(t => t.Status == "completed" && t.ProgressMinutes > 130);
                var longRunningTasksSubscriptionOptions = new SubscriptionOptions() { Name = "longRunningTasksSubscription" };
                var longRunningTasksSubscription = subscriptions.Add(updatedLongRunningTasksQuery, longRunningTasksSubscriptionOptions);
            });
            // :code-block-end:

            // :code-block-start: remove-subscription-by-query
            // remove a subscription by it's query
            var query = realm.All<Task>().Where(t => t.Owner == "Ben");
            subscriptions.Remove(query);
            // :code-block-end:

            // :code-block-start: remove-subscription-by-name
            var subscriptionName = "longRunningTasksSubscription";
            subscriptions.Remove(subscriptionName);
            // :code-block-end:

            // :code-block-start: remove-all-subscriptions-of-object-type
            subscriptions.RemoveAll("Team");
            // :code-block-end:

            // :code-block-start: remove-all-subscriptions
            subscriptions.RemoveAll();
            // :code-block-end:
        }
    }
    class Task : RealmObject
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