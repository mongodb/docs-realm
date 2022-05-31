﻿using System;
using System.ComponentModel;
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
        PartitionSyncConfiguration config;
        string myRealmAppId = Config.appid;
        public class ProgressObj : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public int Id { get; set; }
            public string Name { get; set; }
        }

        [Test]
        public async Task TestWaitForChangesToDownloadAsync()
        {
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };
            app = App.Create(appConfig);
            user = app.LogInAsync(Credentials.Anonymous()).Result;
            config = new PartitionSyncConfiguration("myPartition", user);
            try
            {
                // :snippet-start: wait-for-changes-to-download-async-progress-notification
                // :uncomment-start:
                // using Realms.Sync;

                // :uncomment-end:
                var realm = Realm.GetInstance(config);
                await realm.SyncSession.WaitForDownloadAsync();
                // :snippet-end:
                realm.Dispose();
            }
            catch (Exception ex)
            {

            }
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
            config = new PartitionSyncConfiguration("myPartition", user);
            var realm = Realm.GetInstance(config);
            // :snippet-start: upload-download-progress-notification
            var session = realm.SyncSession;
            var token = session.GetProgressObservable(ProgressDirection.Upload,
                ProgressMode.ReportIndefinitely)
                .Subscribe(progress =>
                   {
                       // :remove-start:
                       progressNotificationTriggered = true;
                       // :remove-end:
                       Console.WriteLine($@"transferred bytes:
                            {progress.TransferredBytes}");
                       Console.WriteLine($@"transferable bytes:
                            {progress.TransferableBytes}");
                   });
            // :snippet-end: upload-download-progress-notification
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
            // :snippet-start: remove-progress-notification
            token.Dispose();
            // :snippet-end: remove-progress-notification
        }

        [Test]
        // :snippet-start: connection-state
        // :replace-start: {
        //  "terms": {
        //   "TestSessionConnnectionState": "SetupRealm"}
        // }
        public async Task TestSessionConnnectionState()
        {
            var appConfig = new AppConfiguration(myRealmAppId);
            app = App.Create(appConfig);
            user = app.LogInAsync(Credentials.Anonymous()).Result;
            config = new PartitionSyncConfiguration("myPartition", user);
            try
            {
                var realm = Realm.GetInstance(config);
                var session = realm.SyncSession;
                session.PropertyChanged += SyncSessionPropertyChanged;
                realm.Dispose();
            }
            catch (Exception ex)
            {

            }
        }

        private void SyncSessionPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            if (e.PropertyName == nameof(Session.ConnectionState))
            {
                var session = (Session)sender;
                var currentState = session.ConnectionState;

                if (currentState == ConnectionState.Connecting)
                {
                    //session is connecting
                }

                if (currentState == ConnectionState.Connected)
                {
                    //session is connected
                }

                if (currentState == ConnectionState.Disconnected)
                {
                    //session has been disconnected
                }
            }
        }
        // :replace-end: 
        // :snippet-end:
    }
}
