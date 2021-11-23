using System;
using System.IO;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Exceptions;
using Realms.Sync;
using Task = Examples.Models.Task;
using TaskStatus = Examples.Models.TaskStatus;
using ThreadTask = System.Threading.Tasks.Task;

namespace Examples
{
    public class OpenARealmExamples
    {
        App app;
        App app3;
        ObjectId testTaskId;
        User user;
        SyncConfiguration config;
        const string myRealmAppId = Config.appid;

        [OneTimeSetUp]
        public async ThreadTask Setup()
        {
            app = App.Create(myRealmAppId);
            // :code-block-start: open-synced-realm
            user = await app.LogInAsync(
                Credentials.EmailPassword("foo@foo.com", "foobar"));
            config = new SyncConfiguration("myPart", user);
            //:hide-start:
            config.Schema = new[]
            {
                typeof(Task),
                typeof(MyClass),
                typeof(User)
            };

            // Note: this is so we can have a more "global" instance
            // or the realm object but the code snippet can show
            // it being initialized
            Realm realm = Realm.GetInstance(config);
            //:hide-end:
            try
            {
                // :uncomment-start:
                //realm = await Realm.GetInstanceAsync(config);
                // :uncomment-end:
            }
            catch (RealmFileAccessErrorException ex)
            {
                Console.WriteLine($@"Error creating or opening the
                    realm file. {ex.Message}");
            }
            // :code-block-end:

            realm.Write(() =>
            {
                realm.RemoveAll<Task>();
            });

            // :code-block-start: open-synced-realm-synchronously
            // :uncomment-start:
            // var synchronousRealm = await Realm.GetInstanceAsync(config);
            // :uncomment-end:
            // :code-block-end:

            return;
        }

        [Test]
        public void InMemory()
        {
            //:code-block-start:in-memory
            var config = new InMemoryConfiguration("some-identifier");
            var realm = Realm.GetInstance(config);
            //:code-block-end:
        }

        public void Subset()
        {
            //:code-block-start:subset
            var config = new RealmConfiguration()
            {
                Schema = new Type[]
                {
                    typeof(AClassWorthStoring),
                    typeof(AnotherClassWorthStoring)
                }
            };
            //:code-block-end:
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
            Realm localRealm;
            try
            {
                localRealm = Realm.GetInstance(config);
            }
            catch (RealmFileAccessErrorException ex)
            {
                Console.WriteLine($@"Error creating or opening the
                    realm file. {ex.Message}");
            }
            // :code-block-end:
            localRealm = Realm.GetInstance(config);
            Assert.IsNotNull(localRealm);
            localRealm.Dispose();
            try
            {
                Directory.Delete(pathToDb, true);
            }
            catch (Exception)
            {

            }
        }

        [Test]
        public async ThreadTask OpenIfUserExists()
        {
            app3 = App.Create(myRealmAppId);
            User user3;
            SyncConfiguration config3;
            Realm realm3;
            // :code-block-start: check-if-offline
            // :replace-start: {
            //  "terms": {
            //   "app3": "app",
            //   "user3": "user",
            //   "config3" : "config",
            //   "realm3": "realm" }
            // }
            if (app3.CurrentUser == null)
            {
                // App must be online for user to authenticate
                user3 = await app.LogInAsync(
                    Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
                config3 = new SyncConfiguration("_part", user3);
                realm3 = await Realm.GetInstanceAsync(config3);
            }
            else
            {
                // This works whether online or offline
                user3 = app.CurrentUser;
                config3 = new SyncConfiguration("_part", user3);
                realm3 = Realm.GetInstance(config3);
            }
            // :replace-end:
            // :code-block-end:
        }

        [Test]
        public async ThreadTask ScopesARealm()
        {
            // :code-block-start: scope
            config = new SyncConfiguration("myPart", user);
            //:hide-start:
            config.Schema = new[]
            {
                typeof(Task),
                typeof(User)
            };
            //:hide-end:
            using (var realm = Realm.GetInstance(config))
            {
                var allTasks = realm.All<Task>();
            }
            // :code-block-end:
        }
        public class AClassWorthStoring : RealmObject
        {
            public string Id { get; set; }
        }
        public class AnotherClassWorthStoring : RealmObject
        {
            public string Id { get; set; }
        }

    }
}

