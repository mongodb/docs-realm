using System;
using System.IO;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Task = dotnet.Task;
using System.Collections.Specialized;
using System.Diagnostics;

namespace Examples
{
    public class WorkWithRealm
    {
        App app;
        Realms.Sync.User user;
        string myRealmAppId = Config.appid;

        [OneTimeSetUp]
        public async System.Threading.Tasks.Task Setup()
        {
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                // LogLevel = LogLevel.Debug,
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            user = await app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar"));
            return;
        }

        public async System.Threading.Tasks.Task LotsaStuff()
        {
            string userEmail = "bob@bob.com";

            // :code-block-start: initialize-realm
            var myRealmAppId = "<your_app_id>";
            var app = App.Create(myRealmAppId);
            //:code-block-end:
            // :code-block-start: appConfig
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                //LogLevel = LogLevel.Debug,
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            //:code-block-end:
            // :code-block-start: register-user
            await app.EmailPasswordAuth.RegisterUserAsync(userEmail, "sekrit");
            //:code-block-end:
            // :code-block-start: confirm-user
            await app.EmailPasswordAuth.ConfirmUserAsync("<token>", "<token-id>");
            //:code-block-end:
            // :code-block-start: reset-user-1
            await app.EmailPasswordAuth.SendResetPasswordEmailAsync(userEmail);
            //:code-block-end:
            string myNewPassword = "";
            // :code-block-start: reset-user-2
            await app.EmailPasswordAuth.ResetPasswordAsync(
                myNewPassword, "<token>", "<token-id>");
            //:code-block-end:
            // :code-block-start: reset-user-3
            await app.EmailPasswordAuth.CallResetPasswordFunctionAsync(
                userEmail, myNewPassword,
                "<security-question-1-answer>",
                "<security-question-2-answer>");
            //:code-block-end:

            user = await app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar"));
        }

        public async System.Threading.Tasks.Task APIKeys()
        {
            {
                //:code-block-start:apikey-create
                var newKey = await user.ApiKeys.CreateAsync("someKeyName");
                Console.WriteLine($"I created a key named {newKey.Name}. " +
                    $"Is it enabled? {newKey.IsEnabled}");
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-fetch
                var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                Console.WriteLine($"I fetched the key named {key.Name}. " +
                    $"Is it enabled? {key.IsEnabled}");
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-fetch-all
                var allKeys = await user.ApiKeys.FetchAllAsync();
                foreach (var key in allKeys)
                {
                    Console.WriteLine($"I fetched the key named {key.Name}. " +
                        $"Is it enabled? {key.IsEnabled}");
                }
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-enable-disable
                var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                if (!key.IsEnabled)
                {
                    // enable the key
                    await user.ApiKeys.EnableAsync(key.Id);
                }
                else
                {
                    // disable the key
                    await user.ApiKeys.DisableAsync(key.Id);
                }
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-delete
                await user.ApiKeys.DeleteAsync(ObjectId.Parse("00112233445566778899aabb"));
                //:code-block-end:
            }
        }
        [Test]
        public async System.Threading.Tasks.Task MultiUser()
        {
            myRealmAppId = Config.appid;
            var app = App.Create(myRealmAppId);

            {
                foreach (var user in app.AllUsers)
                {
                    await user.LogOutAsync();
                }
                Assert.AreEqual(0, app.AllUsers.Count());
                //:code-block-start:multi-add
                var aimee = await app.LogInAsync(Credentials.EmailPassword(
                    "aimee@example.com", "sekrit"));
                Assert.IsTrue(aimee.Id == app.CurrentUser.Id, "aimee is current user");

                var elvis = await app.LogInAsync(Credentials.EmailPassword(
                    "elvis@example.com", "sekrit2"));
                Assert.IsTrue(elvis.Id == app.CurrentUser.Id, "elvis is current user");
                //:code-block-end:

                //:code-block-start:multi-list
                foreach (var user in app.AllUsers)
                {
                    Console.WriteLine($"User {user.Id} is logged on via {user.Provider}");
                }
                Assert.AreEqual(2, app.AllUsers.Count());
                //:code-block-end:
                //:code-block-start:multi-switch
                app.SwitchUser(aimee);
                Assert.IsTrue(aimee.Id == app.CurrentUser.Id, "aimee is current user");
                //:code-block-end:

                //:code-block-start:multi-remove
                await app.RemoveUserAsync(elvis);
                var noMoreElvis = app.AllUsers.FirstOrDefault(u => u.Id == elvis.Id);
                Assert.IsNull(noMoreElvis);
                Console.WriteLine("Elvis has left the application.");
                //:code-block-end:
            }

            return;
        }

        [Test]
        public void Notifications()
        {
            myRealmAppId = Config.appid;
            var app = App.Create(myRealmAppId);
            var realm = Realm.GetInstance("");

            //:code-block-start:notifications
            // Observe realm notifications.
            realm.RealmChanged += (sender, eventArgs) =>
            {
                // sender is the realm that has changed.
                // eventArgs is reserved for future use.
                // ... update UI ...
            };
            //:code-block-end:

            //:code-block-start:collection-notifications
            // :replace-start: {
            //  "terms": {
            //   "Dog1000": "Dog",
            //   "Person1000" : "Person" }
            // }
            // Observe collection notifications. Retain the token to keep observing.
            var token = realm.All<Dog1000>()
                .SubscribeForNotifications((sender, changes, error) =>
            {
                foreach (var i in changes.DeletedIndices)
                {
                    // ... handle deletions ...
                }

                foreach (var i in changes.InsertedIndices)
                {
                    // ... handle insertions ...
                }

                foreach (var i in changes.NewModifiedIndices)
                {
                    // ... handle modifications ...
                }
            });

            // Later, when you no longer wish to receive notifications
            token.Dispose();
            // :replace-end:
            //:code-block-end:


            realm.Write(() =>
            {
                realm.Add(new Person1000 { Id = ObjectId.GenerateNewId(), Name = "Elvis Presley" });
            });
            //:code-block-start:object-notifications
            // :replace-start: {
            //  "terms": {
            //   "Dog1000": "Dog",
            //   "Person1000" : "Person" }
            // }
            var theKing = realm.All<Person1000>()
                .FirstOrDefault(p => p.Name == "Elvis Presley");

            theKing.PropertyChanged += (sender, eventArgs) =>
            {
                Debug.WriteLine("New value set for The King: " +
                    eventArgs.PropertyName);
            };
        }
        // :replace-end:
        //:code-block-end:

        class NotificationUnsub
        {
            Realm realm;


            public NotificationUnsub()
            {
                realm = Realm.GetInstance("");
            }
            //:code-block-start:unsubscribe
            private IQueryable<Task> tasks;

            public void LoadUI()
            {
                tasks = realm.All<Task>();

                // Subscribe for notifications - since tasks is IQueryable<Task>, we're
                // using the AsRealmCollection extension method to cast it to IRealmCollection
                tasks.AsRealmCollection().CollectionChanged += OnTasksChanged;
            }

            public void UnloadUI()
            {
                // Unsubscribe from notifications
                tasks.AsRealmCollection().CollectionChanged -= OnTasksChanged;
            }

            private void OnTasksChanged(object sender, NotifyCollectionChangedEventArgs args)
            {
                // Do something with the notification information
            }
            // :code-block-end:
        }
    }
}