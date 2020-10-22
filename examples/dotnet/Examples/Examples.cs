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
            // :code-block-start: initialize-realm
            app = App.Create(myRealmAppId);
            // :code-block-end:
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            // :code-block-start: open-synced-realm
            config = new SyncConfiguration("myPartition", user);
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-end:
            // :code-block-start: open-synced-realm-sync
            var synchronousRealm = Realm.GetInstance(config);
            // :code-block-end:
            // :code-block-start: create
            var testTask = new Task
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
            // :code-block-start: anon-login
            var user = await app.LogInAsync(Credentials.Anonymous());
            // :code-block-end:
            // :code-block-start: config
            config = new SyncConfiguration("myPartition", user);
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-end:
            // :code-block-start: read-all
            var tasks = realm.All<Task>();
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count(),"Get All");
            // :code-block-start: read-some
            tasks = realm.All<Task>().Where(t => t.Status == "Open");
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count(), "Get Some");
            return;
        }

        [Test]
        public async System.Threading.Tasks.Task ScopesARealm()
        {
            // :code-block-start: scope
            config = new SyncConfiguration("myPartition", user);
            using var realm = await Realm.GetInstanceAsync(config);
            var allTasks = realm.All<Task>();
            // :code-block-end:
        }

        [Test]
        public async System.Threading.Tasks.Task ModifiesATask()
        {
            config = new SyncConfiguration("myPartition", user);
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-start: modify
            var t = realm.All<Task>()
                .FirstOrDefault(t => t.Id == testTaskId);

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
                    Credentials.EmailPassword("caleb@example.com", "shhhItsASektrit!"));
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
        public async System.Threading.Tasks.Task CallsAFunction()
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
            // :code-block-start: callfuncWithPOCO
            var task = await user.Functions.CallAsync<MyClass>
                ("getTask", "5f7f7638024a99f41a3c8de4");

            var name = task.Name;
            // :code-block-end:
            return;

            //{ "_id":{ "$oid":"5f0f69dc4eeabfd3366be2be"},"_partition":"myPartition","name":"do this NOW","status":"Closed"}
        }

        [Test]
        public async System.Threading.Tasks.Task LinksAUser()
        {
            {
                // :code-block-start: link
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
                // :code-block-end:
            }
            {
                // :code-block-start: link2
                var anonUser = await app.LogInAsync(Credentials.Anonymous());
                var officialUser = await anonUser.LinkCredentialsAsync(
                   Credentials.Google("<google-token>"));
                // :code-block-end:
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
                // :code-block-start: delete
                realm.Write(() =>
                {
                    realm.Remove(myTask);
                });
                // :code-block-end:
                realm.RemoveAll<Task>();
                var user = await app.LogInAsync(Credentials.Anonymous());
                // :code-block-start: logout
                await user.LogOutAsync();
                // :code-block-end:
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

    // :code-block-start: dog_class
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
    // :code-block-end:
}