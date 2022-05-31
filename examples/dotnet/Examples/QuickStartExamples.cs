using System;
using System.IO;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Exceptions;
using Realms.Sync;
using Task = Examples.Models.Task;
using TaskStatus = Examples.Models.TaskStatus;
using ThreadTask = System.Threading.Tasks.Task;
using User = Examples.Models.User;

namespace Examples
{
    public class QuickStartExamples
    {
        ObjectId testTaskId;
        Realms.Sync.User user;
        PartitionSyncConfiguration config;
        App app;
        const string myRealmAppId = Config.appid;

        [OneTimeSetUp]
        public async ThreadTask Setup()
        {
            // :snippet-start: initialize-realm
            app = App.Create(myRealmAppId);
            // :snippet-end:

            user = await app.LogInAsync(
                Credentials.EmailPassword("foo@foo.com", "foobar"));
            config = new PartitionSyncConfiguration("myPart", user);
            config.Schema = new[]
            {
                typeof(Task),
                typeof(User)
            };

            Realm realm = Realm.GetInstance(config);
            realm.Write(() =>
            {
                realm.RemoveAll<Task>();
            });

            // :snippet-start: open-synced-realm-sync
            // :uncomment-start:
            // var synchronousRealm = await Realm.GetInstanceAsync(config);
            // :uncomment-end:
            // :snippet-end:
            // :snippet-start: create
            var testTask = new Task
            {
                Name = "Do this thing",
                Status = TaskStatus.Open.ToString(),
                Partition = "myPart"
            };

            realm.Write(() =>
            {
                realm.Add(testTask);
            });
            // :snippet-end:
            testTaskId = testTask.Id;

            return;
        }


        [Test]
        public async ThreadTask GetsSyncedTasks()
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
                typeof(Task),
                typeof(User)
            };
            //:remove-end:
            var realm = await Realm.GetInstanceAsync(config);
            // :snippet-end:
            // :snippet-start: read-all
            var tasks = realm.All<Task>();
            // :snippet-end:
            //Assert.AreEqual(1, tasks.Count(),"Get All");
            // :snippet-start: read-some
            tasks = realm.All<Task>().Where(t => t.Status == "Open");
            // :snippet-end:
            //Assert.AreEqual(1, tasks.Count(), "Get Some");
            return;
        }

        // [Test]
        public async ThreadTask ModifiesATask()
        {
            // App app = App.Create(myRealmAppId);
            config = new PartitionSyncConfiguration("myPart", user);
            //:remove-start:
            config.Schema = new[]
            {
                typeof(Task),
                typeof(User)
            };
            //:remove-end:
            var realm = await Realm.GetInstanceAsync(config);
            // :snippet-start: modify
            var t = realm.All<Task>()
                .FirstOrDefault(t => t.Id == testTaskId);

            realm.Write(() =>
            {
                t.Status = TaskStatus.InProgress.ToString();
            });

            // :snippet-end:
            var ttest = realm.All<Task>().FirstOrDefault(x => x.Id == t.Id);
            //Assert.AreEqual(1, allTasks.Count);
            Assert.AreEqual(TaskStatus.InProgress.ToString(), ttest.Status);

            return;
        }



        [OneTimeTearDown]
        public async ThreadTask TearDown()
        {
            App app = App.Create(myRealmAppId);
            using (var realm = Realm.GetInstance(config))
            {
                var myTask = new Task() { Partition = "foo", Name = "foo2", Status = TaskStatus.Complete.ToString() };
                realm.Write(() =>
                {
                    realm.Add(myTask);
                });
                // :snippet-start: delete
                realm.Write(() =>
                {
                    realm.Remove(myTask);
                });
                // :snippet-end:
                realm.Write(() =>
                {
                    realm.RemoveAll<Task>();
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