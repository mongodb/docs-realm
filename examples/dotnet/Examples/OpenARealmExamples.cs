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
        User user;
        PartitionSyncConfiguration config;
        const string myRealmAppId = Config.appid;

        [OneTimeSetUp]
        public async ThreadTask Setup()
        {
            app = App.Create(myRealmAppId);
            // :snippet-start: open-synced-realm
            user = await app.LogInAsync(
                Credentials.EmailPassword("foo@foo.com", "foobar"));
            config = new PartitionSyncConfiguration("myPart", user);
            //:hide-start:
            // Internal Note: this is so we can have a more "global" instance
            // or the realm object but the code snippet can show
            // it being initialized
            config.Schema = new[]
            {
                typeof(Task),
                typeof(Examples.Models.User)
            };
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
            // :snippet-end:

            realm.Write(() =>
            {
                realm.RemoveAll<Task>();
            });

            // :snippet-start: open-synced-realm-synchronously
            // :uncomment-start:
            // var synchronousRealm = await Realm.GetInstanceAsync(config);
            // :uncomment-end:
            // :snippet-end:

            return;
        }

        [Test]
        public void InMemory()
        {
            //:snippet-start:in-memory
            var config = new InMemoryConfiguration("some-identifier");
            var realm = Realm.GetInstance(config);
            //:snippet-end:
        }

        public void Subset()
        {
            //:snippet-start:subset
            var config = new RealmConfiguration()
            {
                Schema = new Type[]
                {
                    typeof(AClassWorthStoring),
                    typeof(AnotherClassWorthStoring)
                }
            };
            //:snippet-end:
        }

        [Test]
        public void OpensLocalRealm()
        {
            var pathToDb = Directory.GetCurrentDirectory() + "/db";
            if (!File.Exists(pathToDb))
            {
                Directory.CreateDirectory(pathToDb);
            }

            // :snippet-start: local-realm
            var config = new RealmConfiguration(pathToDb + "/my.realm")
            {
                IsReadOnly = true,
            };
            // :hide-start:
            config.Schema = new[]
            {
                typeof(Task),
                typeof(Examples.Models.User)
            };
            // :hide-end:
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
            // :snippet-end:

            try
            {
                Directory.Delete(pathToDb, true);
            }
            catch (Exception)
            {

            }
        }

        public void DisposeCodeSnippet()
        {
            Realm realm = Realm.GetInstance();
            // :snippet-start: dispose
            realm.Dispose();
            // :snippet-end:
        }

        [Test]
        public async ThreadTask OpenIfUserExists()
        {
            app = App.Create(myRealmAppId);
            User user3;
            PartitionSyncConfiguration config3;
            Realm realm3;
            // :snippet-start: check-if-offline
            // :replace-start: {
            //  "terms": {
            //   "app3": "app",
            //   "user3": "user",
            //   "config3" : "config",
            //   "realm3": "realm" }
            // }
            if (app.CurrentUser == null)
            {
                // App must be online for user to authenticate
                user3 = await app.LogInAsync(
                    Credentials.EmailPassword("caleb@mongodb.com", "shhhItsASektrit!"));
                config3 = new PartitionSyncConfiguration("_part", user3);
                realm3 = await Realm.GetInstanceAsync(config3);
            }
            else
            {
                // This works whether online or offline
                user3 = app.CurrentUser;
                config3 = new PartitionSyncConfiguration("_part", user3);
                realm3 = Realm.GetInstance(config3);
            }
            // :replace-end:
            // :snippet-end:
        }

        [Test]
        public async ThreadTask ScopesARealm()
        {
            // :snippet-start: scope
            config = new PartitionSyncConfiguration("myPart", user);
            //:hide-start:
            config.Schema = new Type[]
                {
                    typeof(Task),
                    typeof(Examples.Models.User),
                    typeof(AClassWorthStoring),
                    typeof(AnotherClassWorthStoring)
                };
            //:hide-end:
            using (var realm = Realm.GetInstance(config))
            {
                var allTasks = realm.All<Task>();
            }
            // :snippet-end:
        }
        public class AClassWorthStoring : RealmObject
        {
            [MapTo("_id")]
            [PrimaryKey]
            public string Id { get; set; }
        }
        public class AnotherClassWorthStoring : RealmObject
        {
            [MapTo("_id")]
            [PrimaryKey]
            public string Id { get; set; }
        }

    }
}

