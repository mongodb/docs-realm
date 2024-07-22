using System;
using Microsoft.VisualBasic;
using NUnit.Framework;
using NUnit.Framework.Internal;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class DataSyncExamples
    {
        Realm realm;
         App app;
            Realms.Sync.User user;
            FlexibleSyncConfiguration config;

        [OneTimeSetUp]
        public void Setup()
        {
            
            const string myRealmAppId = Config.FSAppId;
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(
                Credentials.Anonymous()).Result;

            config = new FlexibleSyncConfiguration(user)
            ;
        }

        [Test]
        public void StartStopSession()
        {
            // :snippet-start: pause-synced-realm
            realm = Realm.GetInstance(config);
            var session = realm.SyncSession;
            session.Stop();
            //later...
            session.Start();
            // :snippet-end:
        }

        [Test]
        public void GetSessionAndState(){
            // :snippet-start: get-sync-session
            realm = Realm.GetInstance(config);
            var session = realm.SyncSession;
            // :snippet-end:
            // :snippet-start: get-session-state
            var sessionState = session.State;
            if (sessionState == SessionState.Active){
                Console.WriteLine("The session is active");
            } else {
                Console.WriteLine("The session is inactive");
            }
            // :snippet-end:
        }
    }
}
