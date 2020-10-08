using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using dotnet;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using TaskStatus = dotnet.TaskStatus;

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
            var realm = await Realm.GetInstanceAsync(config);
            var synchronousRealm = Realm.GetInstance(config);
            var testTask = new RealmTask
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

            realm.Dispose();

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
            var user = app.LogInAsync(Credentials.Anonymous()).Result;
            config = new SyncConfiguration("My Project", user);
            var realm = await Realm.GetInstanceAsync(config);
            var tasks = realm.All<RealmTask>();
            Assert.AreEqual(1, tasks.Count(),"Get All");
            tasks = realm.All<RealmTask>().Where(t => t.Status == "Open");
            Assert.AreEqual(1, tasks.Count(), "Get Some");
            return;
        }

        [Test]
        public async Task ScopesARealm()
        {
            config = new SyncConfiguration("My Project", user);
            using var realm = await Realm.GetInstanceAsync(config);
            var allTasks = realm.All<RealmTask>();
        }

        [Test]
        public async Task ModifiesATask()
        {
            config = new SyncConfiguration("My Project", user);
            var realm = await Realm.GetInstanceAsync(config);
            var t = realm.All<RealmTask>()
                .Where(t => t.Id == testTaskId)
                .FirstOrDefault();

            realm.Write(() =>
            {
                t.Status = TaskStatus.InProgress.ToString();
            });

            var allTasks = realm.All<RealmTask>().ToList();
            Assert.AreEqual(1, allTasks.Count);
            Assert.AreEqual(TaskStatus.InProgress.ToString(), allTasks.First().Status);

            return;
        }

        [Test]
        public async Task LogsOnManyWays()
        {
            {
                var user = await app.LogInAsync(Credentials.Anonymous());
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                var user = await app.LogInAsync(
                    Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                var apiKey = "eRECwv1e6gkLEse99XokWOgegzoguEkwmvYvXk08zAucG4kXmZu7TTgV832SwFCv";
                var user = await app.LogInAsync(Credentials.ApiKey(apiKey));
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                var functionParameters = new
                {
                    username = "caleb",
                    password = "shhhItsASektrit!",
                    IQ = 42,
                    isCool = false
                };

                var user =
                    await app.LogInAsync(Credentials.Function(functionParameters));
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                var jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNhbGViIiwiaWF0IjoxNjAxNjc4ODcyLCJleHAiOjI1MTYyMzkwMjIsImF1ZCI6InR1dHMtdGlqeWEifQ.LHbeSI2FDWrlUVOBxe-rasuFiW-etv2Gu5e3eAa6Y6k";
                var user =
                    await app.LogInAsync(Credentials.JWT(jwt_token));
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            try
            {
                var facebookToken = "";
                var user =
                    await app.LogInAsync(Credentials.Facebook(facebookToken));
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-facebook' is unsupported", e.Message);
            }
            try
            {
                var googleAuthCode = "";
                var user =
                    await app.LogInAsync(Credentials.Google(googleAuthCode));
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: authentication via 'oauth2-google' is unsupported", e.Message);
            }
            try
            {
                var appleToken = "";
                var user =
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
            var bsonValue = await
                user.Functions.CallAsync("sum", 2, 40);

            // The result must now be cast to Int32:
            var sum = bsonValue.ToInt32();

            // Or use the generic overloads to avoid casting the BsonValue:
            sum = await
               user.Functions.CallAsync<int>("sum", 2, 40);
            Assert.AreEqual(42, sum);
            var task = await user.Functions.CallAsync<MyClass>
                ("getTask", "5f7f7638024a99f41a3c8de4");

            var name = task.Name;
            return;

            //{ "_id":{ "$oid":"5f0f69dc4eeabfd3366be2be"},"_partition":"myPartition","name":"do this NOW","status":"Closed"}
        }

        [TearDown]
        public async Task TearDown()
        {
            config = new SyncConfiguration("My Project", user);
            using (var realm = await Realm.GetInstanceAsync(config))
            {
                realm.Write(() =>
                {
                    realm.RemoveAll<RealmTask>();
                });
                await user.LogOutAsync();
            }
            return;
        }
    }

    public class MyClass : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        [MapTo("name")]
        [Required]
        public string Name { get; set; }
       
        public MyClass()
        {
            this.Id = ObjectId.GenerateNewId();
        }
    }
}