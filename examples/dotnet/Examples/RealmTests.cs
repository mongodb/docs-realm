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
            // :code-block-start: initialize-realm
            app = Realms.Sync.App.Create(myRealmAppId);
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
            Realms.Sync.User user = app.LogInAsync(Credentials.Anonymous()).Result;
            // :code-block-end:
            // :code-block-start: config
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-end:
            // :code-block-start: read-all
            var tasks = realm.All<Task>().ToList();
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count);
            // :code-block-start: read-some
            tasks = realm.All<Task>().Where(t=>t.Status == "Open").ToList();
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

        [Test]
        public async System.Threading.Tasks.Task LogsOnManyWays()
        {
            // :code-block-start: logon_anon
            Realms.Sync.User anonUser = await app.LogInAsync(Credentials.Anonymous());
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, anonUser.State);
            await anonUser.LogOutAsync();
            // :code-block-start: logon_EP
            Realms.Sync.User emailUser = await app.LogInAsync(Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, emailUser.State);
            await emailUser.LogOutAsync();
            // :code-block-start: logon_API
            Realms.Sync.User apiUser = await app.LogInAsync(Credentials.ApiKey("eRECwv1e6gkLEse99XokWOgegzoguEkwmvYvXk08zAucG4kXmZu7TTgV832SwFCv"));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, apiUser.State);
            await apiUser.LogOutAsync();
            // :code-block-start: logon_Function
            var functionParameters = new Dictionary<string, string>()
            {
                { "username", "caleb" },
                { "password", "shhhItsASektrit!" },
                { "someOtherProperty", "cheesecake" }
            };
            Realms.Sync.User functionUser =
                await app.LogInAsync(Credentials.Function(functionParameters));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, functionUser.State);
            await functionUser.LogOutAsync();
            // :code-block-start: logon_JWT
            Realms.Sync.User jwtUser =
                await app.LogInAsync(Credentials.JWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNhbGViIiwiaWF0IjoxNjAxNjc4ODcyLCJleHAiOjI1MTYyMzkwMjIsImF1ZCI6InR1dHMtdGlqeWEifQ.LHbeSI2FDWrlUVOBxe-rasuFiW-etv2Gu5e3eAa6Y6k"));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, jwtUser.State);
            await jwtUser.LogOutAsync();
            try
            {
                // :code-block-start: logon_fb
                Realms.Sync.User fbUser =
                    await app.LogInAsync(Credentials.Facebook("<facebook_token>"));
                // :code-block-end:
            }
            catch (Exception e)
            {
                Assert.AreEqual("http error code considered fatal: Client Error: 401", e.Message);
            }
            try
            {
                // :code-block-start: logon_google
                Realms.Sync.User googleUser =
                    await app.LogInAsync(Credentials.Google("<google_token>"));
                // :code-block-end:
            }
            catch (Exception e)
            {
                Assert.AreEqual("http error code considered fatal: Client Error: 401", e.Message);
            }
            try
            {
                // :code-block-start: logon_apple
                Realms.Sync.User appleUser =
                    await app.LogInAsync(Credentials.Apple("<apple_token>"));
                // :code-block-end:
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