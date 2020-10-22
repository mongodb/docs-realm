using System;
using System.IO;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using TaskStatus = dotnet.TaskStatus;
using Task = dotnet.Task;
using System.Collections.Generic;

namespace UnitTests
{
    public class Examples
    {
        App app;
        ObjectId testTaskId;
        Realms.Sync.User user;
        SyncConfiguration config;
        const string myRealmAppId = "tuts-tijya";

        [OneTimeSetUp]
        public async System.Threading.Tasks.Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("myPartition", user);
            var realm = await Realm.GetInstanceAsync(config);
            var synchronousRealm = Realm.GetInstance(config);
            var testTask = new Task
            {
                Name = "Do this thing",
                Status = TaskStatus.Open.ToString()
            };

            realm.Write(() =>
            {
                realm.Add(testTask);
            });
            testTaskId = testTask.Id;

            var schemas = config.ObjectClasses;
            foreach (var schema in schemas)
            {
                Console.WriteLine(schema.FullName);
            }


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
            localRealm.Dispose();
            try
            {
                Directory.Delete(pathToDb, true);
            } catch (Exception)
            {

            }
        }

        [Test]
        public async System.Threading.Tasks.Task GetsSyncedTasks()
        {
            var user = await app.LogInAsync(Credentials.Anonymous());
            config = new SyncConfiguration("myPartition", user);
            var realm = await Realm.GetInstanceAsync(config);
            var tasks = realm.All<Task>();
            Assert.AreEqual(1, tasks.Count(),"Get All");
            tasks = realm.All<Task>().Where(t => t.Status == "Open");
            Assert.AreEqual(1, tasks.Count(), "Get Some");
            return;
        }

        [Test]
        public async System.Threading.Tasks.Task ScopesARealm()
        {
            config = new SyncConfiguration("myPartition", user);
            using var realm = await Realm.GetInstanceAsync(config);
            var allTasks = realm.All<Task>();
        }

        [Test]
        public async System.Threading.Tasks.Task ModifiesATask()
        {
            config = new SyncConfiguration("myPartition", user);
            var realm = await Realm.GetInstanceAsync(config);
            var t = realm.All<Task>()
                .FirstOrDefault(t => t.Id == testTaskId);

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
            {
                var user = await app.LogInAsync(Credentials.Anonymous());
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                var user = await app.LogInAsync(
                    Credentials.EmailPassword("caleb@example.com", "shhhItsASektrit!"));
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
        public async System.Threading.Tasks.Task CallsAFunction()
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

        [Test]
        public async System.Threading.Tasks.Task LinksAUser()
        {
            {
                // 1) A user logs on anonymously:
                var anonUser = await app.LogInAsync(Credentials.Anonymous());
                // 2) They create some data, and then decide they want to save
                //    it, which requires creating an Email/Password account.
                // 3) We prompt the user to log in, and then use that info to
                //    register the new EmailPassword user, and then generate an
                //    EmailPassword credential to link the existing anonymous
                //    account:
                var email = "caleb@example.com";
                var password = "shhhItsASektrit!";
                await app.EmailPasswordAuth.RegisterUserAsync(
                    email, password);
                var officialUser = await anonUser.LinkCredentialsAsync(
                   Credentials.EmailPassword(email, password));
            }
            {
                var anonUser = await app.LogInAsync(Credentials.Anonymous());
                var officialUser = await anonUser.LinkCredentialsAsync(
                   Credentials.Google("<google-token>"));
            }
            return;
        }


        
        [OneTimeTearDown]
        public async System.Threading.Tasks.Task TearDown()
        {
            config = new SyncConfiguration("myPartition", user);
            using (var realm = await Realm.GetInstanceAsync(config))
            {
                var myTask = new Task();
                realm.Write(() =>
                {
                    realm.Remove(myTask);
                });
                realm.RemoveAll<Task>();
                var user = await app.LogInAsync(Credentials.Anonymous());
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

    public class Dog : RealmObject
    {
        [Required]
        public string Name { get; set; }

        public int Age { get; set; }
        public string Breed { get; set; }
        public IList<Person> Owners { get; }
    }

    public class Person : RealmObject
    {
        [Required]
        public string Name { get; set; }
        //etc...
    }
    /*  To add items to the IList<T>:
     
        var dog = new Dog();
        var caleb = new Person { Name = "Caleb" };
        dog.Owners.Add(caleb);
        
     */
}