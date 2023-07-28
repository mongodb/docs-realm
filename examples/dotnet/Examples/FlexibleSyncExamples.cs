using System;
using Realms;
using Realms.Sync;
using MongoDB.Bson;
using System.Linq;
using NUnit.Framework;
using System.Threading.Tasks;
using Realms.Exceptions.Sync;
using Realms.Sync.Exceptions;

namespace Examples
{
    public class FlexibleSyncExamples
    {

        public async Task TestUseFlexibleSync()
        {
            var app = App.Create(Config.FSAppId);
            var user = await app.LogInAsync(Credentials.Anonymous());

            var config = new FlexibleSyncConfiguration(app.CurrentUser!);
            var realm = Realm.GetInstance(config);

            var subscriptions = realm.Subscriptions;

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

            try
            {
                await realm.Subscriptions.WaitForSynchronizationAsync();
            }
            catch (SubscriptionException ex)
            {
                // do something in response to the exception or log it
                Console.WriteLine($@"The subscription set's state is Error and synchronization is paused:  {ex.Message}");
            }

            realm.Subscriptions.Update(() =>
            {
                var updatedLongRunningItemsQuery = realm
                    .All<MyTask>()
                    .Where(i => i.Status == "completed" && i.ProgressMinutes > 130);
                realm.Subscriptions
                    .Add(updatedLongRunningItemsQuery,
                        new SubscriptionOptions() { Name = "longRunningItems" });
            });

            realm.Subscriptions.Update(() =>
            {
                // remove a subscription by it's query
                var query = realm.All<MyTask>().Where(i => i.Owner == "Ben");
                realm.Subscriptions.Remove(query);
            });

            realm.Subscriptions.Update(() =>
            {
                // remove a named subscription
                var subscriptionName = "longRunningItemsSubscription";
                realm.Subscriptions.Remove(subscriptionName);
            });

            realm.Subscriptions.Update(() =>
            {
                // remove all subscriptions of the "Team" Class Name
                realm.Subscriptions.RemoveAll("Team");

                // Alernatively, remove all subscriptions of the "Team" object type
                realm.Subscriptions.RemoveAll<Team>();
            });

            realm.Subscriptions.Update(() =>
            {
                // remove all subscriptions, including named subscriptions
                realm.Subscriptions.RemoveAll(true);
            });

        }

        [Test]
        public async Task TestOpenFSRealm()
        {
            // :snippet-start: open-fs-realm
            // :replace-start: {
            //  "terms": {
            //   "Config.FSAppId": "\"myRealmAppId\"",
            //   "Credentials.Anonymous(false)": "Credentials.Anonymous()"}
            // }
            var app = App.Create(Config.FSAppId);
            var user = await app.LogInAsync(Credentials.Anonymous(false));

            var config = new FlexibleSyncConfiguration(app.CurrentUser!)
            {
                PopulateInitialSubscriptions = (realm) =>
                {
                    var allTasks = realm.All<MyTask>();
                    realm.Subscriptions.Add(allTasks, new SubscriptionOptions { Name = "allTasks" });
                }
            };
            var realm = Realm.GetInstance(config);
            // :replace-end:
            // :snippet-end:
            realm.Subscriptions.Update(() =>
            {
                realm.Subscriptions.RemoveAll<MyTask>();
            });
        }

        [Test]
        public async Task TestOpenFSRealmOffline()
        {
            // :snippet-start: open-fs-realm-offline
            // :replace-start: {
            //  "terms": {
            //   "Config.FSAppId": "\"myRealmAppId\"",
            //   "Credentials.Anonymous(false)": "Credentials.Anonymous()"
            //  }
            // }
            var app = App.Create(Config.FSAppId);
            Realms.Sync.User user;
            FlexibleSyncConfiguration config;
            Realm realm;

            if (app.CurrentUser == null)
            {
                // App must be online for user to authenticate
                user = await app.LogInAsync(Credentials.Anonymous(false));

                config = new FlexibleSyncConfiguration(app.CurrentUser!);

                realm = await Realm.GetInstanceAsync(config);
                // Go on to add or update subscriptions and use the realm
            }
            else 
            {
                // This works whether online or offline
                // It requires a user to have been previously authenticated
                user = app.CurrentUser;
                config = new FlexibleSyncConfiguration(user);
                realm = Realm.GetInstance(config);
                // Go on to add or update subscriptions and use the realm
            }
            // :replace-end:
            // :snippet-end:
            realm.Subscriptions.Update(() =>
            {
                realm.Subscriptions.RemoveAll<MyTask>();
            });
        }

        [Test]
        public async Task TestCancelAsyncOperationsOnNonFatalErrors()
        {
            var app = App.Create(Config.FSAppId);
            var user = await app.LogInAsync(Credentials.Anonymous());

            // :snippet-start: appconfigsettings
            // :replace-start: {
            //  "terms": {
            //   "Config.FSAppId": "\"myRealmAppId\""}
            // }
            AppConfiguration configuration = new AppConfiguration(Config.FSAppId)
            {
                SyncTimeoutOptions = new SyncTimeoutOptions()
                {
                    ConnectTimeout = TimeSpan.FromMinutes(2),
                    ConnectionLingerTime = TimeSpan.FromSeconds(30),
                    PingKeepAlivePeriod = TimeSpan.FromMinutes(1),
                    PongKeepAliveTimeout = TimeSpan.FromMinutes(1),
                    FastReconnectLimit = TimeSpan.FromMinutes(1),
                },
            };
            // :replace-end:
            // :snippet-end:
            // :snippet-start: cancelasync
            var config = new FlexibleSyncConfiguration(app.CurrentUser!)
            {
                CancelAsyncOperationsOnNonFatalErrors = true,
            };

            // These operations will throw an exception
            // on timeout or other transient sync session errors.
            // :uncomment-start:
            //var realm = await Realm.GetInstanceAsync(config);

            //var session = realm.SyncSession;
            //await session.WaitForUploadAsync();
            //await session.WaitForDownloadAsync();
            // :uncomment-end:
            // :snippet-end:
        }
        public void WeeSnippetForDocs()
        {
            var realm = Realm.GetInstance();
            // :snippet-start: example_sub
            realm.Subscriptions.Update(() =>
            {
                var completedItemsQuery = realm
                    .All<MyTask>()
                    .Where(i => i.Status == "completed");
                realm.Subscriptions
                    .Add(completedItemsQuery,
                        new SubscriptionOptions() { Name = "completedItems" });
            });
            // :snippet-end:
        }
    }


    partial class MyTask : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("name")]
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
    partial class Team : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("name")]
        public string Name { get; set; }

        [MapTo("description")]
        public string Description { get; set; }

    }
}