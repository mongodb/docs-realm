using System;
using System.Threading.Tasks;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Realms.Sync.Exceptions;
using Realms.Sync.Testing;

namespace UnitTests
{
    public class ClientResetExamples
    {
        App app;
        ObjectId testTaskId;
        Realms.Sync.User user;
        SyncConfiguration config;
        const string myRealmAppId = "tuts-tijya";


        [Test]
        public async Task resetsTheClient()
        {
            app = App.Create(myRealmAppId);

            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
 
            config = new SyncConfiguration("myPartition", user);
            var realm = await Realm.GetInstanceAsync(config);

            Session.Error += (sender, err) =>
            {
                if (err.Exception is ClientResetException clientResetEx)
                {
                    var session = (Session)sender;
                    Console.WriteLine($"Client Reset requested for {session.Path} due to {clientResetEx.Message}");
                    // Notify user that they will need to re-download the Realm.
                    // InitiateClientReset will immediately reset the Realm and download the
                    // server copy. If you don't call it, the Realm will be
                    // reset the next time the app starts.
                    var resetResult = clientResetEx.InitiateClientReset();
                    Console.WriteLine(resetResult ? "Success" : "Reset failed");
                }
            };
            TestingExtensions.SimulateError(realm.GetSession(), ErrorCode.DivergingHistories, "diverging histories!", false);
        }
    }
}
