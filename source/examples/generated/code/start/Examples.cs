using System;
using System.Collections.Generic;
using System.IO;
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
        public async Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            Realm synchronousRealm = Realm.GetInstance(config);
<<<<<<< HEAD
            RealmTask testTask = new RealmTask()
=======
            RealmTask testTask = new RealmTask
>>>>>>> 91f7dae6b434aa01189524a1d6f35743a56a92b3
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
        public void OpensLocalRealm()
        {
            var pathToDb = Directory.GetCurrentDirectory();
            if (!File.Exists(pathToDb)){
                Directory.CreateDirectory(pathToDb);
            }
            var config = new RealmConfiguration(pathToDb + "/my.realm")
            {
                IsReadOnly = true,
            };
            var localRealm = Realm.GetInstance(config);
            Assert.IsNotNull(localRealm);
            Directory.Delete(pathToDb, true);
        }

        [Test]
        public async Task GetsSyncedTasks()
        {
            User user = app.LogInAsync(Credentials.Anonymous()).Result;
            config = new SyncConfiguration("My Project", user);
            Realm realm = await Realm.GetInstanceAsync(config);
            var tasks = realm.All<RealmTask>();
            Assert.AreEqual(1, tasks.Count());
            tasks = realm.All<RealmTask>().Where(t => t.Status == "Open");
            Assert.AreEqual(1, tasks.Count());
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
            User emailUser = await app.LogInAsync(
                Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
            Assert.AreEqual(UserState.LoggedIn, emailUser.State);
            await emailUser.LogOutAsync();
            var apiKey = "eRECwv1e6gkLEse99XokWOgegzoguEkwmvYvXk08zAucG4kXmZu7TTgV832SwFCv";
            User apiUser = await app.LogInAsync(Credentials.ApiKey(apiKey));
            Assert.AreEqual(UserState.LoggedIn, apiUser.State);
            await apiUser.LogOutAsync();
            var functionParameters = new
            {
                username=  "caleb",
                password = "shhhItsASektrit!",
                IQ = 42,
                isCool = false
            };

            User functionUser =
                await app.LogInAsync(Credentials.Function(functionParameters));
            Assert.AreEqual(UserState.LoggedIn, functionUser.State);
            await functionUser.LogOutAsync();
            var jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNhbGViIiwiaWF0IjoxNjAxNjc4ODcyLCJleHAiOjI1MTYyMzkwMjIsImF1ZCI6InR1dHMtdGlqeWEifQ.LHbeSI2FDWrlUVOBxe-rasuFiW-etv2Gu5e3eAa6Y6k";
            User jwtUser =
                await app.LogInAsync(Credentials.JWT(jwt_token));
            Assert.AreEqual(UserState.LoggedIn, jwtUser.State);
            await jwtUser.LogOutAsync();
            try
            {
                var facebookToken = "";
                User fbUser =
                    await app.LogInAsync(Credentials.Facebook(facebookToken));
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-facebook' is unsupported", e.Message);
            }
            try
            {
                var googleAuthCode = "";
                User googleUser =
                    await app.LogInAsync(Credentials.Google(googleAuthCode));
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-google' is unsupported", e.Message);
            }
            try
            {
                var appleToken = "";
                User appleUser =
                    await app.LogInAsync(Credentials.Apple(appleToken));
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