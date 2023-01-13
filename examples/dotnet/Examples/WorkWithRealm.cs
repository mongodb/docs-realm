﻿using System;
using System.IO;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Collections.Generic;
using Examples.Models;

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

            // :snippet-start: initialize-realm
            var myRealmAppId = "<your_app_id>";
            var app = App.Create(myRealmAppId);
            //:snippet-end:
            // :snippet-start: appConfig
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                //LogLevel = LogLevel.Debug,
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            //:snippet-end:
            // :snippet-start: register-user
            await app.EmailPasswordAuth.RegisterUserAsync(userEmail, "sekrit");
            //:snippet-end:
            // :snippet-start: confirm-user
            await app.EmailPasswordAuth.ConfirmUserAsync("<token>", "<token-id>");
            //:snippet-end:
            // :snippet-start: reset-user-1
            await app.EmailPasswordAuth.SendResetPasswordEmailAsync(userEmail);
            //:snippet-end:
            string myNewPassword = "";
            // :snippet-start: reset-user-2
            await app.EmailPasswordAuth.ResetPasswordAsync(
                myNewPassword, "<token>", "<token-id>");
            //:snippet-end:
            // :snippet-start: reset-user-3
            await app.EmailPasswordAuth.CallResetPasswordFunctionAsync(
                userEmail, myNewPassword,
                "<security-question-1-answer>",
                "<security-question-2-answer>");
            //:snippet-end:

            user = await app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar"));

            // :snippet-start: delete-user
            await app.DeleteUserFromServerAsync(user);
            //:snippet-end:

        }


        public async System.Threading.Tasks.Task APIKeys()
        {
            {
                //:snippet-start:apikey-create
                var newKey = await user.ApiKeys.CreateAsync("someKeyName");
                Console.WriteLine($"I created a key named {newKey.Name}. " +
                    $"Is it enabled? {newKey.IsEnabled}");
                //:snippet-end:
            }
            {
                //:snippet-start:apikey-fetch
                var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                Console.WriteLine($"I fetched the key named {key.Name}. " +
                    $"Is it enabled? {key.IsEnabled}");
                //:snippet-end:
            }
            {
                //:snippet-start:apikey-fetch-all
                var allKeys = await user.ApiKeys.FetchAllAsync();
                foreach (var key in allKeys)
                {
                    Console.WriteLine($"I fetched the key named {key.Name}. " +
                        $"Is it enabled? {key.IsEnabled}");
                }
                //:snippet-end:
            }
            {
                //:snippet-start:apikey-enable-disable
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
                //:snippet-end:
            }
            {
                //:snippet-start:apikey-delete
                await user.ApiKeys.DeleteAsync(ObjectId.Parse("00112233445566778899aabb"));
                //:snippet-end:
            }
        }


        [Test]
        public void Notifications()
        {
            myRealmAppId = Config.appid;
            var app = App.Create(myRealmAppId);
            var realm = Realm.GetInstance("");

            //:snippet-start:notifications
            // Observe realm notifications.
            realm.RealmChanged += (sender, eventArgs) =>
            {
                // sender is the realm that has changed.
                // eventArgs is reserved for future use.
                // ... update UI ...
            };
            //:snippet-end:

            //:snippet-start:collection-notifications
            // Observe collection notifications. Retain the token to keep observing.
            var token = realm.All<Dog>()
                .SubscribeForNotifications((sender, changes, error) =>
            {
                if (error != null)
                {
                    // Show error message
                    return;
                }

                if (changes == null)
                {
                    // This is the case when the notification is called
                    // for the first time.
                    // Populate tableview/listview with all the items
                    // from `collection`
                    return;
                }

                // Handle individual changes

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
            //:snippet-end:


            realm.Write(() =>
            {
                realm.Add(new PersonN { Id = ObjectId.GenerateNewId(), Name = "Elvis Presley" });
            });
            //:snippet-start:object-notifications
            // :replace-start: {
            //  "terms": {
            //   "PersonN": "Person" }
            // }
            var theKing = realm.All<PersonN>()
                .FirstOrDefault(p => p.Name == "Elvis Presley");

            theKing.PropertyChanged += (sender, eventArgs) =>
            {
                Debug.WriteLine("New value set for The King: " +
                    eventArgs.PropertyName);
            };
        }
        // :replace-end:
        //:snippet-end:

        [Test]
        public void ChangeSetCleared()
        {
            myRealmAppId = Config.appid;
            var app = App.Create(myRealmAppId);
            var realm = Realm.GetInstance("");

            realm.Write(() =>
            {
                realm.RemoveAll<Dog>();
            });

            var fido = new Dog()
            {
                Id = ObjectId.GenerateNewId(),
                Name = "Fido"
            };

            realm.Write(() =>
            {
                fido = realm.Add<Dog>(fido);
            });

            var johnWick = new PersonN() { Id = ObjectId.GenerateNewId(), Name = "John Wick" };
            var helenWick = new PersonN() { Id = ObjectId.GenerateNewId(), Name = "Helen Wick" };

            realm.Write(() =>
            {
                fido.Owners.Add(johnWick);
                fido.Owners.Add(helenWick);
            });

            var changesHaveBeenCleared = false;

            // :snippet-start: get-notification-if-collection-is-cleared
            var token = fido.Owners.SubscribeForNotifications((sender, changes, error) =>
            {
                if (error != null) return;
                if (changes == null) return;

                if (changes.IsCleared)
                {
                    // ... handle collection has been cleared ...
                    // :remove-start:
                    changesHaveBeenCleared = true;
                    // :remove-end:
                }
            });
            // :snippet-end:

            // :snippet-start: call-handle-collection-changed
            fido.Owners.AsRealmCollection().CollectionChanged += HandleCollectionChanged;
            // :snippet-end:

            // :snippet-start: clear-collection
            realm.Write(() =>
            {
                fido.Owners.Clear();
            });
            // :snippet-end:

            realm.Refresh();

            Assert.IsTrue(changesHaveBeenCleared);
            // :snippet-start: subscribe
            // :replace-start: {
            //  "terms": {
            //   "token2": "token" }
            // }
            var token2 = fido.Owners.SubscribeForNotifications((sender, changes, error) =>
            {
                if (error != null) return;
                if (changes == null) return;
            });
            token2.Dispose();
            //:replace-end:
            //:snippet-end:
        }

        // :snippet-start: define-handle-collection-changed
        private void HandleCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            if (e.Action == NotifyCollectionChangedAction.Reset)
            {
                // ... handle a CollectionChanged Event with action `Reset`
            }
        }
        // :snippet-end:


        class NotificationUnsub
        {
            Realm realm;


            public NotificationUnsub()
            {
                realm = Realm.GetInstance("");
            }
            //:snippet-start:unsubscribe
            private IQueryable<Item> items;

            public void LoadUI()
            {
                items = realm.All<Item>();

                // Subscribe for notifications - since items is IQueryable<Item>, we're
                // using the AsRealmCollection extension method to cast it to IRealmCollection
                items.AsRealmCollection().CollectionChanged += OnItemsChanged;
            }

            public void UnloadUI()
            {
                // Unsubscribe from notifications
                items.AsRealmCollection().CollectionChanged -= OnItemsChanged;
            }

            private void OnItemsChanged(object sender, NotifyCollectionChangedEventArgs args)
            {
                // Do something with the notification information
            }
            // :snippet-end:
        }

        public class PersonN : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }

            [Required]
            public string Name { get; set; }
        }

        // used only in this class
        public class Dog : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }

            [Required]
            public string Name { get; set; }

            public int Age { get; set; }
            public string Breed { get; set; }
            public IList<PersonN> Owners { get; }
        }
    }
}