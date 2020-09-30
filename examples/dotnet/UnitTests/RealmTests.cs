using System.Linq;
using dotnet;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace UnitTests
{
    public class RealmTests
    {
        Realms.Sync.App app;
        ObjectId testTaskId;
        Realms.Sync.User user;
        SyncConfiguration config;

        [SetUp]
        public async System.Threading.Tasks.Task Setup()
        {
            // :code-block-start: initialize-realm
            // :hide-start:
            const string appId = "tuts-tijya";
            app = Realms.Sync.App.Create(appId);
            // :hide-end:
            // :replace-with:
            // const string appId = "tuts-tijya";
            // Realms.Sync.app = Realms.Sync.App.Create(appId);

            // :code-block-end:
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-start: create
            Task testTask = new Task()
            {
                Name = "Do this thing",
                Status = TaskStatus.Open.ToString()
            };

            realm.Write(() =>
            {
                realm.Add(testTask);
            });
            // :code-block-end:
            testTaskId = testTask.Id;
            return;
        }

        [Test]
        public async System.Threading.Tasks.Task GetsSyncedTasks()
        {
            // :code-block-start: anon-login
            // :hide-start:
            /* :replace-with:
            Realms.Sync.User user = app.LogInAsync(Credentials.Anonymous()).Result;
            :hide-end:*/
            // :code-block-end:
            // :code-block-start: config
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-end:
            // :code-block-start: read-all
            var tasks = realm.All<Task>().ToList();
            // :code-block-end:
            // :code-block-start: read-some
            // :hide-start:
            /*:replace-with:
            tasks = realm.All<Task>().Where(t=>t.Status == "Open").ToList();
            :hide-end:*/
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count);
            return;
        }

        [Test]
        public async System.Threading.Tasks.Task ModifiesATask()
        {
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-start: modify
            Task t = realm.All<Task>()
                .Where(t => t.Id == testTaskId)
                .FirstOrDefault();

            realm.Write(() =>
            {
                t.Status = TaskStatus.InProgress.ToString();
            });

            // :code-block-end:
            var allTasks = realm.All<Task>().ToList();
            Assert.AreEqual(1, allTasks.Count);
            Assert.AreEqual(TaskStatus.InProgress.ToString(), allTasks.First().Status);

            return;
        }


     [TearDown]
        public async System.Threading.Tasks.Task TearDown()
        {
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-start: delete
            realm.Write(() =>
            {
                realm.RemoveAll<Task>();
            });
            // :code-block-end:
            // :code-block-start: logout
            await user.LogOutAsync();
            // :code-block-end:
            return;
        } 
    }
}