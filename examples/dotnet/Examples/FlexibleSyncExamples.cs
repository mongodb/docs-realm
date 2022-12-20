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
            var app = App.Create(Config.fsAppId);
            var user = await app.LogInAsync(Credentials.Anonymous());

            // :snippet-start: open-a-flexible-synced-realm
            var config = new FlexibleSyncConfiguration(app.CurrentUser);
            var realm = Realm.GetInstance(config);
            // :snippet-end:


            // :snippet-start: bootstrap-a-subscription
            // :uncomment-start:
            // var config = new FlexibleSyncConfiguration(app.CurrentUser)
            // {
            //     PopulateInitialSubscriptions = (realm) =>
            //     {
            //         var myItems = realm.All<Item>().Where(n => n.OwnerId == myUserId);
            //         realm.Subscriptions.Add(myItems);
            //     }
            // };
            // 
            // // The process will complete when all the user's items have been downloaded.
            // var realm = await Realm.GetInstanceAsync(config);
            // :uncomment-end:
            // :snippet-end:

            // :snippet-start: get-subscriptions
            var subscriptions = realm.Subscriptions;
            // :snippet-end:

            // :snippet-start: update-subscriptions
            // :replace-start: {
            //  "terms": {
            //   "MyTask": "Item"
            //  }
            // }
            realm.Subscriptions.Update(() =>
            {
                // subscribe to all long running items, and give the subscription the name 'longRunningItems'
                var longRunningItemsQuery = realm.All<MyTask>()
                    .Where(i => i.Status == "completed" && i.ProgressMinutes > 120);
                realm.Subscriptions
                    .Add(longRunningItemsQuery,
                        new SubscriptionOptions() { Name = "longRunningItems" });

                // subscribe to all of Ben's Item objects
                realm.Subscriptions.Add(realm.All<MyTask>().Where(i => i.Owner == "Ben"));

                // subscribe to all Teams, and give the subscription the name 'teamsSubscription' and throw an error if a new query is added to the team subscription
                realm.Subscriptions.Add(realm.All<Team>(), new SubscriptionOptions() { Name = "teams", UpdateExisting = false });
            });
            // :replace-end:
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
            // :replace-start: {
            //  "terms": {
            //   "MyTask": "Item"
            //  }
            // }
            realm.Subscriptions.Update(() =>
            {
                var updatedLongRunningItemsQuery = realm
                    .All<MyTask>()
                    .Where(i => i.Status == "completed" && i.ProgressMinutes > 130);
                realm.Subscriptions
                    .Add(updatedLongRunningItemsQuery,
                        new SubscriptionOptions() { Name = "longRunningItems" });
            });
            // :replace-end:
            // :snippet-end:

            // :snippet-start: remove-subscription-by-query
            // :replace-start: {
            //  "terms": {
            //   "MyTask": "Item"
            //  }
            // }
            realm.Subscriptions.Update(() =>
            {
                // remove a subscription by it's query
                var query = realm.All<MyTask>().Where(i => i.Owner == "Ben");
                realm.Subscriptions.Remove(query);
            });
            // :replace-end:
            // :snippet-end:

            // :snippet-start: remove-subscription-by-name
            // :replace-start: {
            //  "terms": {
            //   "MyTask": "Item"
            //  }
            // }
            realm.Subscriptions.Update(() =>
            {
                // remove a named subscription
                var subscriptionName = "longRunningItemsSubscription";
                realm.Subscriptions.Remove(subscriptionName);
            });
            // :replace-end:
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
        public enum ItemStatus
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
}