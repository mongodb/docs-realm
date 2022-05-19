using System;
using System.IO;
using System.Reflection;
using System.Security.Cryptography;
using System.Threading.Tasks;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class BundleARealmExamples
    {
        [Test]
        public void TestWriteCopy()
        {
            // :snippet-start: copy_a_realm
            // open an existing realm
            var realm = Realm.GetInstance("myRealm.realm");

            // Create a RealmConfiguration for the *copy*
            var config = new RealmConfiguration("bundled.realm");

            // Make sure the file doesn't already exist
            Realm.DeleteRealm(config);

            // Copy the realm
            realm.WriteCopy(config);

            // Want to know where the copy is?
            var locationOfCopy = config.DatabasePath;
            // :snippet-end:
        }

        [Test]
        public async Task TestWriteCopySynced()
        {
            var appConfig = new AppConfiguration(Config.appid);
            var app = App.Create(appConfig);
            var user = await app.LogInAsync(Credentials.Anonymous());

            // :snippet-start: copy_a_synced_realm

            // open an existing realm
            // :uncomment-start:
            // var existingConfig = new PartitionSyncConfiguration("myPartition", user);
            // :uncomment-end:
            // :hide-start:
            var existingConfig = new PartitionSyncConfiguration("myPartition", user)
            {
                Schema = new[] { typeof(Models.User) }
            };
            // :hide-end:
            var realm = await Realm.GetInstanceAsync(existingConfig);

            // Create a RealmConfiguration for the *copy*
            // Be sure the partition name matches the original
            var bundledConfig = new PartitionSyncConfiguration("myPartition", user, "bundled.realm");

            // Make sure the file doesn't already exist
            Realm.DeleteRealm(bundledConfig);

            // IMPORTANT: When copying a Synced realm, you must ensure
            // that there are no pending Sync operations. You do this
            // by calling WaitForUploadAsync() and WaitForDownloadAsync():
            var session = realm.SyncSession;
            await session.WaitForUploadAsync();
            await session.WaitForDownloadAsync();

            // Copy the realm
            realm.WriteCopy(bundledConfig);

            // Want to know where the copy is?
            var locationOfCopy = existingConfig.DatabasePath;
            // :snippet-end:
        }


        //[Test]// Commented because git builder can't find/save/write the file
        public async Task ExtractAndLoadRealmFile()
        {
            // :snippet-start: extract_and_copy_realm
            // :replace-start: {
            //  "terms": {
            //   "Config.appid": "\"myRealmAppId\""}
            // }
            // If you are using a local realm
            var config = RealmConfiguration.DefaultConfiguration;

            // If the realm file is a synced realm
            var app = App.Create(Config.appid);
            var user = await app.LogInAsync(Credentials.Anonymous());
            config = new PartitionSyncConfiguration("myPartition", user);
            // :hide-start:
            config.Schema = new[] { typeof(Examples.Models.User) };
            // :hide-end:
            // :replace-end:

            // Extract and copy the realm
            if (!File.Exists(config.DatabasePath))
            {
                using var bundledDbStream = Assembly.GetExecutingAssembly()
                    .GetManifestResourceStream("bundled.realm");
                using var databaseFile = File.Create(config.DatabasePath);
                bundledDbStream.CopyTo(databaseFile);
            }

            // Open the Realm:
            var realm = Realm.GetInstance(config);
            // :snippet-end:
        }
    }
}