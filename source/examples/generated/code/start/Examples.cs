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
            app = App.Create(myRealmAppId);
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
            testTaskId = testTask.Id;
            return;
        }

        [Test]
        public async Task GetsSyncedTasks()
        {
            User user = app.LogInAsync(Credentials.Anonymous()).Result;
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            var tasks = realm.All<RealmTask>().ToList();
            Assert.AreEqual(1, tasks.Count);
            tasks = realm.All<RealmTask>().Where(t => t.Status == "Open").ToList();
            Assert.AreEqual(1, tasks.Count);
            return;
        }

        [Test]
        public async Task ModifiesATask()
        {
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            RealmTask t = realm.All<RealmTask>()
                .Where(t => t.Id == testTaskId)
                .FirstOrDefault();

            realm.Write(() =>
            {
                t.Status = dotnet.TaskStatus.InProgress.ToString();
            });

            var allTasks = realm.All<RealmTask>().ToList();
            Assert.AreEqual(1, allTasks.Count);
            Assert.AreEqual(dotnet.TaskStatus.InProgress.ToString(), allTasks.First().Status);

            return;
        }

        [Test]
        public async Task LogsOnManyWays()
        {
            User anonUser = await app.LogInAsync(Credentials.Anonymous());
            Assert.AreEqual(UserState.LoggedIn, anonUser.State);
            await anonUser.LogOutAsync();
            User emailUser = await app.LogInAsync(Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
            Assert.AreEqual(UserState.LoggedIn, emailUser.State);
            await emailUser.LogOutAsync();
            User apiUser = await app.LogInAsync(Credentials.ApiKey("eRECwv1e6gkLEse99XokWOgegzoguEkwmvYvXk08zAucG4kXmZu7TTgV832SwFCv"));
            Assert.AreEqual(UserState.LoggedIn, apiUser.State);
            await apiUser.LogOutAsync();
            var functionParameters = new
            {
                username=  "caleb",
                password = "shhhItsASektrit!",
                IQ = 42,
                isCool = true
            };

            User functionUser =
                await app.LogInAsync(Credentials.Function(functionParameters));
            Assert.AreEqual(UserState.LoggedIn, functionUser.State);
            await functionUser.LogOutAsync();
            User jwtUser =
                await app.LogInAsync(Credentials.JWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.---.---"));
            Assert.AreEqual(UserState.LoggedIn, jwtUser.State);
            await jwtUser.LogOutAsync();
            try
            {
                User fbUser =
                    await app.LogInAsync(Credentials.Facebook("<facebook_token>"));
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-facebook' is unsupported", e.Message);
            }
            try
            {
                User googleUser =
                    await app.LogInAsync(Credentials.Google("<google_auth_code>"));
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-google' is unsupported", e.Message);
            }
            try
            {
                User appleUser =
                    await app.LogInAsync(Credentials.Apple("<apple_token>"));
            }

            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-apple' is unsupported", e.Message);
            }
        }

        [Test]
        public async Task CallsAFunction()
        {
            var result = await
                user.Functions.CallAsync("sum", 2, 40);

            // result.ToInt32() == 42
            Assert.AreEqual(42, result.ToInt32());
            return;
        }

        [TearDown]
        public async Task TearDown()
        {
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            realm.Write(() =>
            {
                realm.RemoveAll<RealmTask>();
            });
            await user.LogOutAsync();
            return;
        }
    }
}