using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class EmbeddedExamples
    {
        App app;
        User user;
        SyncConfiguration config;
        const string myRealmAppId = "tuts-tijya";

        [OneTimeSetUp]
        public void Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("myPartition", user);

            // Synchronous here because setup and tear down don't support async
            var realm = Realm.GetInstance(config);

            // :code-block-start:create




        }
        [Test]
        public async Task UpdateEmbeddedObject()
        {
            var realm = await Realm.GetInstanceAsync(config);



            Assert.AreEqual(1, 1);
        }
    }
}