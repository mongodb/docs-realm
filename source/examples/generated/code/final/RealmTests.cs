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
            const string appId = "tuts-tijya";
            app = Realms.Sync.App.Create(appId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            Task testTask = new Task()
            {
                Name = "Do this thing",
                Status = TaskStatus.Open.ToString()
            };

            realm.Write(() =>
            {
                realm.Add(testTask);
            });
            testTaskId = testTask.Id;
            return;
        }

        [Test]
        public async System.Threading.Tasks.Task GetsSyncedTasks()
        {
            Realms.Sync.User user = app.LogInAsync(Credentials.Anonymous()).Result;
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            var tasks = realm.All<Task>().ToList();
            Assert.AreEqual(1, tasks.Count);
            tasks = realm.All<Task>().Where(t=>t.Status == "Open").ToList();
            Assert.AreEqual(1, tasks.Count);
            return;
        }

        [Test]
        public async System.Threading.Tasks.Task ModifiesATask()
        {
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            Task t = realm.All<Task>()
                .Where(t => t.Id == testTaskId)
                .FirstOrDefault();

            realm.Write(() =>
            {
                t.Status = TaskStatus.InProgress.ToString();
            });

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
            realm.Write(() =>
            {
                realm.RemoveAll<Task>();
            });
            await user.LogOutAsync();
            return;
        } 
    }
}