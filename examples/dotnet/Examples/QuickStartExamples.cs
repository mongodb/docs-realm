using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Examples.Models;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Exceptions;
using Realms.Sync;
using User = Examples.Models.User;

namespace Examples
{
    public class QuickStartExamples
    {
        ObjectId testItemId;
        Realms.Sync.User user;
        PartitionSyncConfiguration config;
        App app;
        const string myRealmAppId = Config.appid;

        [OneTimeSetUp]
        public async Task Setup()
        {
            // :snippet-start: initialize-realm
            app = App.Create(myRealmAppId);
            // :snippet-end:

            user = await app.LogInAsync(
                Credentials.EmailPassword("foo@foo.com", "foobar"));
            config = new PartitionSyncConfiguration("myPart", user);
            config.Schema = new[]
            {
                typeof(Item),
                typeof(User)
            };

            Realm realm = Realm.GetInstance(config);
            realm.Write(() =>
            {
                realm.RemoveAll<Item>();
            });

            // :snippet-start: open-synced-realm-sync
            // :uncomment-start:
            // var synchronousRealm = await Realm.GetInstanceAsync(config);
            // :uncomment-end:
            // :snippet-end:
            // :snippet-start: create
            var testItem = new Item
            {
                Name = "Do this thing",
                Status = ItemStatus.Open.ToString(),
                Partition = "myPart"
            };

            realm.Write(() =>
            {
                realm.Add(testItem);
            });
            // :snippet-end:
            testItemId = testItem.Id;

        }


        [Test]
        public async Task GetsSyncedTasks()
        {
            App app = App.Create(myRealmAppId);
            // :snippet-start: anon-login
            var user = await app.LogInAsync(Credentials.Anonymous());
            // :snippet-end:
            // :snippet-start: config
            config = new PartitionSyncConfiguration("myPart", user);
            //:remove-start:
            config.Schema = new[]
            {
                typeof(Item),
                typeof(User)
            };
            //:remove-end:
            var realm = await Realm.GetInstanceAsync(config);
            // :snippet-end:
            // :snippet-start: read-all
            var items = realm.All<Item>();
            // :snippet-end:
            //Assert.AreEqual(1, items.Count(),"Get All");
            // :snippet-start: read-some
            items = realm.All<Item>().Where(i => i.Status == "Open");
            // :snippet-end:
            //Assert.AreEqual(1, items.Count(), "Get Some");
            return;
        }

        // [Test]
        public async Task ModifiesATask()
        {
            // App app = App.Create(myRealmAppId);
            config = new PartitionSyncConfiguration("myPart", user);
            //:remove-start:
            config.Schema = new[]
            {
                typeof(Item),
                typeof(User)
            };
            //:remove-end:
            var realm = await Realm.GetInstanceAsync(config);
            // :snippet-start: modify
            var i = realm.All<Item>()
                .FirstOrDefault(i => i.Id == testItemId);

            realm.Write(() =>
            {
                i.Status = ItemStatus.InProgress.ToString();
            });

            // :snippet-end:
            var ttest = realm.All<Item>().FirstOrDefault(x => x.Id == i.Id);
            Assert.AreEqual(ItemStatus.InProgress.ToString(), ttest.Status);

            return;
        }



        [OneTimeTearDown]
        public async Task TearDown()
        {
            App app = App.Create(myRealmAppId);
            using (var realm = Realm.GetInstance(config))
            {
                var myItem = new Item() { Partition = "foo", Name = "foo2", Status = ItemStatus.Complete.ToString() };
                realm.Write(() =>
                {
                    realm.Add(myItem);
                });
                // :snippet-start: delete
                realm.Write(() =>
                {
                    realm.Remove(myItem);
                });
                // :snippet-end:
                realm.Write(() =>
                {
                    realm.RemoveAll<Item>();
                });
                var user = await app.LogInAsync(Credentials.Anonymous());
                // :snippet-start: logout
                await user.LogOutAsync();
                // :snippet-end:
            }
            return;
        }
    }

}