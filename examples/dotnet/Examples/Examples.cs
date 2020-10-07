using System;
using System.Linq;
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
            // :code-block-end:
            // :code-block-start: open-synced-realm-sync
            Realm synchronousRealm = Realm.GetInstance(config);
            // :code-block-end:
            // :code-block-start: create
            RealmTask testTask = new RealmTask
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
            User user = app.LogInAsync(Credentials.Anonymous()).Result;
            // :code-block-end:
            // :code-block-start: config
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-end:
            // :code-block-start: read-all
            var tasks = realm.All<RealmTask>();
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count());
            // :code-block-start: read-some
            tasks = realm.All<RealmTask>().Where(t => t.Status == "Open");
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count());
            return;
        }

        [Test]
        public async System.Threading.Tasks.Task ModifiesATask()
        {
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            // :code-block-start: modify
            RealmTask t = realm.All<RealmTask>()
                .Where(t => t.Id == testTaskId)
                .FirstOrDefault();

            realm.Write(() =>
            {
                t.Status = TaskStatus.InProgress.ToString();
            });

            // :code-block-end:
            var allTasks = realm.All<RealmTask>().ToList();
            Assert.AreEqual(1, allTasks.Count);
            Assert.AreEqual(TaskStatus.InProgress.ToString(), allTasks.First().Status);

            return;
        }

        [Test]
        public async System.Threading.Tasks.Task LogsOnManyWays()
        {
            // :code-block-start: logon_anon
            User anonUser = await app.LogInAsync(Credentials.Anonymous());
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, anonUser.State);
            await anonUser.LogOutAsync();
            // :code-block-start: logon_EP
            User emailUser = await app.LogInAsync(
                Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, emailUser.State);
            await emailUser.LogOutAsync();
            var apiKey = "eRECwv1e6gkLEse99XokWOgegzoguEkwmvYvXk08zAucG4kXmZu7TTgV832SwFCv";
            // :code-block-start: logon_API
            User apiUser = await app.LogInAsync(Credentials.ApiKey(apiKey));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, apiUser.State);
            await apiUser.LogOutAsync();
            // :code-block-start: logon_Function
            var functionParameters = new
            {
                username=  "caleb",
                password = "shhhItsASektrit!",
                IQ = 42,
                isCool = false
            };

            User functionUser =
                await app.LogInAsync(Credentials.Function(functionParameters));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, functionUser.State);
            await functionUser.LogOutAsync();
            var jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNhbGViIiwiaWF0IjoxNjAxNjc4ODcyLCJleHAiOjI1MTYyMzkwMjIsImF1ZCI6InR1dHMtdGlqeWEifQ.LHbeSI2FDWrlUVOBxe-rasuFiW-etv2Gu5e3eAa6Y6k";
            // :code-block-start: logon_JWT
            User jwtUser =
                await app.LogInAsync(Credentials.JWT(jwt_token));
            // :code-block-end:
            Assert.AreEqual(UserState.LoggedIn, jwtUser.State);
            await jwtUser.LogOutAsync();
            try
            {
                var facebookToken = "";
                // :code-block-start: logon_fb
                User fbUser =
                    await app.LogInAsync(Credentials.Facebook(facebookToken));
                // :code-block-end:
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-facebook' is unsupported", e.Message);
            }
            try
            {
                var googleAuthCode = "";
                // :code-block-start: logon_google
                User googleUser =
                    await app.LogInAsync(Credentials.Google(googleAuthCode));
                // :code-block-end:
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-google' is unsupported", e.Message);
            }
            try
            {
                var appleToken = "";
                // :code-block-start: logon_apple
                User appleUser =
                    await app.LogInAsync(Credentials.Apple(appleToken));
                // :code-block-end:
            }

            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-apple' is unsupported", e.Message);
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