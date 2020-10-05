using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace UnitTests
{
    public class Examples
    {
        App app;
        ObjectId testTaskId;
        User user;
        SyncConfiguration config;
        const string myRealmAppId = "tuts-tijya";

        [SetUp]
        public async System.Threading.Tasks.Task Setup()
        {
            // :code-block-start: initialize-realm
            app = App.Create(myRealmAppId);
            // :code-block-end:
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-stat: create
            RealmTask testTask = new RealmTask()
            {
                Name = "Do this thing",
                Status = dotnet.TaskStatus.Open.ToString()
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
        public async Task GetsSyncedTasks()
        {
            // :code-block-start: anon-login
            User user = app.LogInAsync(Credentials.Anonymous()).Result;
            // :code-block-end:
            // :code-block-start: config
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-end:
            // :code-block-start: read-all
            var tasks = realm.All<RealmTask>().ToList();
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count);
            // :code-block-start: read-some
            tasks = realm.All<RealmTask>().Where(t => t.Status == "Open").ToList();
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count);
            return;
        }

        [Test]
        public async Task ModifiesATask()
        {
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-start: modify
            RealmTask t = realm.All<RealmTask>()
                .Where(t => t.Id == testTaskId)
                .FirstOrDefault();

            realm.Write(() =>
            {
                t.Status = dotnet.TaskStatus.InProgress.ToString();
            });

            // :code-block-end:
            var allTasks = realm.All<RealmTask>().ToList();
            Assert.AreEqual(1, allTasks.Count);
            Assert.AreEqual(dotnet.TaskStatus.InProgress.ToString(), allTasks.First().Status);

            return;
        }

        [Test]
        public async Task LogsOnManyWays()
        {
            // :code-block-start: logon_anon
            User anonUser = await app.LogInAsync(Credentials.Anonymous());
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, anonUser.State);
            await anonUser.LogOutAsync();
            // :code-block-start: logon_EP
            User emailUser = await app.LogInAsync(Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, emailUser.State);
            await emailUser.LogOutAsync();
            // :code-block-start: logon_API
            User apiUser = await app.LogInAsync(Credentials.ApiKey("eRECwv1e6gkLEse99XokWOgegzoguEkwmvYvXk08zAucG4kXmZu7TTgV832SwFCv"));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, apiUser.State);
            await apiUser.LogOutAsync();
            // :code-block-start: logon_Function
            var functionParameters = new
            {
                username=  "caleb",
                password = "shhhItsASektrit!",
                IQ = 42,
                isCool = true
            };

            User functionUser =
                await app.LogInAsync(Credentials.Function(functionParameters));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, functionUser.State);
            await functionUser.LogOutAsync();
            // :code-block-start: logon_JWT
            User jwtUser =
                await app.LogInAsync(Credentials.JWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.---.---"));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, jwtUser.State);
            await jwtUser.LogOutAsync();
            try
            {
                // :code-block-start: logon_fb
                User fbUser =
                    await app.LogInAsync(Credentials.Facebook("<facebook_token>"));
                // :code-block-end:
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-facebook' is unsupported", e.Message);
            }
            try
            {
                // :code-block-start: logon_google
                User googleUser =
                    await app.LogInAsync(Credentials.Google("<google_auth_code>"));
                // :code-block-end:
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-google' is unsupported", e.Message);
            }
            try
            {
                // :code-block-start: logon_apple
                User appleUser =
                    await app.LogInAsync(Credentials.Apple("<apple_token>"));
                // :code-block-end:
            }

            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-apple' is unsupported", e.Message);
            }
        }

        [Test]
        public async Task CallsAFunction()
        {
            // :code-block-start: callfunc
            var result = await
                user.Functions.CallAsync("sum", 2, 40);

            // result.ToInt32() == 42
            // :code-block-end:
            Assert.AreEqual(42, result.ToInt32());
            return;
        }

        [TearDown]
        public async Task TearDown()
        {
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-start: delete
            realm.Write(() =>
            {
                realm.RemoveAll<RealmTask>();
            });
            // :code-block-end:
            // :code-block-start: logout
            await user.LogOutAsync();
            // :code-block-end:
            return;
        }
    }
}