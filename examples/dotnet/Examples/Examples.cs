using System;
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
            // :code-block-start: initialize-realm
            app = App.Create(myRealmAppId);
            // :code-block-end:
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            // :code-block-start: open-synced-realm
            config = new SyncConfiguration("My Project", user);
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-end:
            // :code-block-start: open-synced-realm-sync
            var synchronousRealm = Realm.GetInstance(config);
            // :code-block-end:
            // :code-block-start: create
            var testTask = new RealmTask
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
        public void OpensLocalRealm()
        {
            var pathToDb = Directory.GetCurrentDirectory() + "/db";
            if (!File.Exists(pathToDb))
            {
                Directory.CreateDirectory(pathToDb);
            }
            var tempConfig = new RealmConfiguration(pathToDb + "/my.realm")
            {
                IsReadOnly = false,
            };
            var realm = Realm.GetInstance(tempConfig);

            // :code-block-start: dispose
            realm.Dispose();
            // :code-block-end:

            // :code-block-start: local-realm
            var config = new RealmConfiguration(pathToDb + "/my.realm")
            {
                IsReadOnly = true,
            };
            var localRealm = Realm.GetInstance(config);
            // :code-block-end:
            Assert.IsNotNull(localRealm);

            Directory.Delete(pathToDb, true);
        }

        [Test]
        public async Task GetsSyncedTasks()
        {
            // :code-block-start: anon-login
            var user = app.LogInAsync(Credentials.Anonymous()).Result;
            // :code-block-end:
            // :code-block-start: config
            config = new SyncConfiguration("My Project", user);
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-end:
            // :code-block-start: read-all
            var tasks = realm.All<RealmTask>();
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count(),"Get All");
            // :code-block-start: read-some
            tasks = realm.All<RealmTask>().Where(t => t.Status == "Open");
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count(), "Get Some");
            return;
        }
       
        [Test]
        public async Task ScopesARealm()
        {
            // :code-block-start: scope
            config = new SyncConfiguration("My Project", user);
            using (var realm = await Realm.GetInstanceAsync(config))
            {
                var allTasks = realm.All<RealmTask>();
            }
            // :code-block-end:
        }

        [Test]
        public async Task ModifiesATask()
        {
            config = new SyncConfiguration("My Project", user);
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-start: modify
            var t = realm.All<RealmTask>()
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
            {
                // :code-block-start: logon_anon
                var user = await app.LogInAsync(Credentials.Anonymous());
                // :code-block-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                // :code-block-start: logon_EP
                var user = await app.LogInAsync(
                    Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
                // :code-block-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                var apiKey = "eRECwv1e6gkLEse99XokWOgegzoguEkwmvYvXk08zAucG4kXmZu7TTgV832SwFCv";
                // :code-block-start: logon_API
                var user = await app.LogInAsync(Credentials.ApiKey(apiKey));
                // :code-block-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                // :code-block-start: logon_Function
                var functionParameters = new
                {
                    username = "caleb",
                    password = "shhhItsASektrit!",
                    IQ = 42,
                    isCool = false
                };

                var user =
                    await app.LogInAsync(Credentials.Function(functionParameters));
                // :code-block-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                var jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNhbGViIiwiaWF0IjoxNjAxNjc4ODcyLCJleHAiOjI1MTYyMzkwMjIsImF1ZCI6InR1dHMtdGlqeWEifQ.LHbeSI2FDWrlUVOBxe-rasuFiW-etv2Gu5e3eAa6Y6k";
                // :code-block-start: logon_JWT
                var user =
                    await app.LogInAsync(Credentials.JWT(jwt_token));
                // :code-block-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            try
            {
                var facebookToken = "";
                // :code-block-start: logon_fb
                var user =
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
                var user =
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
                var user =
                    await app.LogInAsync(Credentials.Apple(appleToken));
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
            var bsonValue = await
                user.Functions.CallAsync("sum", 2, 40);

            // The result must now be cast to Int32:
            var sum = bsonValue.ToInt32();

            // Or use the generic overloads to avoid casting the BsonValue:
            sum = await
               user.Functions.CallAsync<int>("sum", 2, 40);
            // :code-block-end:
            Assert.AreEqual(42, sum);
            return;
        }

        [TearDown]
        public async Task TearDown()
        {
            config = new SyncConfiguration("My Project", user);
            using (var realm = await Realm.GetInstanceAsync(config))
            {
                // :code-block-start: delete
                realm.Write(() =>
                {
                    realm.RemoveAll<RealmTask>();
                });
                // :code-block-end:
                // :code-block-start: logout
                await user.LogOutAsync();
                // :code-block-end:
            }
            return;
        }
    }
}