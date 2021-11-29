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
            // :code-block-start: copy_a_realm
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
            // :code-block-end:
        }

        [Test]
        public async Task TestWriteCopySynced()
        {
            var app = App.Create(Config.appid);
            var user = app.CurrentUser;

            // :code-block-start: copy_a_synced_realm
            // open an existing realm
            var realm = await Realm.GetInstanceAsync();

            // Create a RealmConfiguration for the *copy*
            var config = new SyncConfiguration("myPart", user, "bundled.realm");

            // Make sure the file doesn't already exist
            Realm.DeleteRealm(config);

            // IMPORTANT: When copying a Synced realm, you must ensure
            // that there are no pending Sync operations. You do this
            // by calling WaitForUploadAsync() and WaitForDownloadAsync():
            var session = realm.SyncSession;
            await session.WaitForUploadAsync();
            await session.WaitForDownloadAsync();

            // Copy the realm
            realm.WriteCopy(config);

            // Want to know where the copy is?
            var locationOfCopy = config.DatabasePath;
            // :code-block-end:
        }

        public void ExtractAndLoadRealmFile()
        {
            // :code-block-start: extract_and_copy_realm
            var config = RealmConfiguration.DefaultConfiguration;
            if (!File.Exists(config.DatabasePath))
            {
                using var bundledDbStream = Assembly.GetExecutingAssembly()
                    .GetManifestResourceStream("bundled.realm");
                using var databaseFile = File.Create(config.DatabasePath);
                bundledDbStream.CopyTo(databaseFile);
            }

            var realm = Realm.GetInstance(config);
            // :code-block-end:
        }
    }
}