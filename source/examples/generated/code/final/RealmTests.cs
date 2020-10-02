using System;
using System.Collections.Generic;
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
        const string myRealmAppId = "tuts-tijya";

        [SetUp]
        public async System.Threading.Tasks.Task Setup()
        {
            app = Realms.Sync.App.Create(myRealmAppId);
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

        [Test]
        public async System.Threading.Tasks.Task LogsOnManyWays()
        {
            Realms.Sync.User anonUser = await app.LogInAsync(Credentials.Anonymous());
            Assert.AreEqual(UserState.LoggedIn, anonUser.State);
            await anonUser.LogOutAsync();
            Realms.Sync.User emailUser = await app.LogInAsync(Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
            Assert.AreEqual(UserState.LoggedIn, emailUser.State);
            await emailUser.LogOutAsync();
            Realms.Sync.User apiUser = await app.LogInAsync(Credentials.ApiKey("eRECwv1e6gkLEse99XokWOgegzoguEkwmvYvXk08zAucG4kXmZu7TTgV832SwFCv"));
            Assert.AreEqual(UserState.LoggedIn, apiUser.State);
            await apiUser.LogOutAsync();
            var functionParameters = new Dictionary<string, string>()
            {
                { "username", "caleb" },
                { "password", "shhhItsASektrit!" },
                { "someOtherProperty", "cheesecake" }
            };
            Realms.Sync.User functionUser =
                await app.LogInAsync(Credentials.Function(functionParameters));
            Assert.AreEqual(UserState.LoggedIn, functionUser.State);
            await functionUser.LogOutAsync();
            Realms.Sync.User jwtUser =
                await app.LogInAsync(Credentials.JWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNhbGViIiwiaWF0IjoxNjAxNjc4ODcyLCJleHAiOjI1MTYyMzkwMjIsImF1ZCI6InR1dHMtdGlqeWEifQ.LHbeSI2FDWrlUVOBxe-rasuFiW-etv2Gu5e3eAa6Y6k"));
            Assert.AreEqual(UserState.LoggedIn, jwtUser.State);
            await jwtUser.LogOutAsync();
            try
            {
                Realms.Sync.User fbUser =
                    await app.LogInAsync(Credentials.Facebook("<facebook_token>"));
            }
            catch (Exception e)
            {
                Assert.AreEqual("http error code considered fatal: Client Error: 401", e.Message);
            }
            try
            {
                Realms.Sync.User googleUser =
                    await app.LogInAsync(Credentials.Google("<google_token>"));
            }
            catch (Exception e)
            {
                Assert.AreEqual("http error code considered fatal: Client Error: 401", e.Message);
            }
            try
            {
                Realms.Sync.User appleUser =
                    await app.LogInAsync(Credentials.Apple("<apple_token>"));
            }
        
            catch (Exception e)
            {
                Assert.AreEqual("http error code considered fatal: Client Error: 401", e.Message);
            }
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