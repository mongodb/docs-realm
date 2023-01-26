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


            // :snippet-start: create
            var testItem = new Item
            {
                Name = "Do this thing",
                Status = ItemStatus.Open.ToString(),
                Partition = "myPart"
            };

            await realm.WriteAsync(() =>
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

            var i = realm.All<Item>()
                .FirstOrDefault(i => i.Id == testItemId);

            realm.Write(() =>
            {
                i.Status = ItemStatus.InProgress.ToString();
            });


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