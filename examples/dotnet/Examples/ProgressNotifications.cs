using System;
using System.Threading.Tasks;
using NUnit.Framework;
using Realms;
using Realms.Sync;
namespace Examples
{
    public class ProgressNotifications
    {
        App app;
        Realms.Sync.User user;
        SyncConfiguration config;
        string myRealmAppId = "errror-handler-example-nythp";
        public class ProgressObj : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public int Id { get; set; }
            public string Name { get; set; }
        }

        [Test]
        public async Task TestUploadDownloadProgressNotification()
        {
            var progressNotificationTriggered = false;
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };
            app = App.Create(appConfig);
            user = app.LogInAsync(Credentials.Anonymous()).Result;
            config = new SyncConfiguration("myPartition", user);
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-start: upload-download-progress-notification
            var session = realm.GetSession();
            var token = session.GetProgressObservable(ProgressDirection.Upload, ProgressMode.ReportIndefinitely)
                .Subscribe(progress =>
                   {
                       // :hide-start:
                       progressNotificationTriggered = true;
                       // :hide-end:
                       Console.WriteLine($"transferred bytes: {progress.TransferredBytes}"); 
                       Console.WriteLine($"transferable bytes: {progress.TransferableBytes}"); 
                   });
            // :code-block-end: upload-download-progress-notification
            var id = 2;
            var myObj = new ProgressObj
            {
                Id = id
            };
            realm.Write(() =>
            {
                realm.Add(myObj);
            });
            realm.Write(() =>
            {
                realm.RemoveAll<ProgressObj>();
            });
            // :code-block-start: remove-progress-notification
            token.Dispose();
            // :code-block-end: remove-progress-notification

            Assert.IsTrue(progressNotificationTriggered);
        }
    }
}
