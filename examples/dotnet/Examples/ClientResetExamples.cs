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
        Realms.Sync.User user;
        SyncConfiguration config;
        const string myRealmAppId = "tuts-tijya";


        [Test]
        public async Task resetsTheClient()
        {
            app = App.Create(myRealmAppId);

            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
 
            config = new SyncConfiguration("myPart", user);
            var realm = await Realm.GetInstanceAsync(config);

            // :code-block-start: handle
            Session.Error += (sender, err) =>
            {
                if (err.Exception is ClientResetException clientResetEx)
                {
                    var session = (Session)sender;
                    Console.WriteLine("Client Reset requested for " +
                        session.Path +"due to "+ clientResetEx.Message);

                    // Prompt user to perform client reset immediately. If they don't do it,
                    // they won't receive any data from the server until they restart the app
                    // and all changes they make will be discarded when the app restarts.
                    var didUserConfirmReset = true;
                    if (didUserConfirmReset)
                    {
                        // Close the Realm before doing the reset as it'll need
                        // to be deleted and all objects obtained from it will be
                        // invalidated.
                        realm.Dispose();
                        var didReset = clientResetEx.InitiateClientReset();
                        if (didReset)
                        {
                            // Navigate the user back to the main page or reopen the
                            // the Realm and reinitialize the current page.
                        }
                        else
                        {
                            // Reset failed - notify user that they'll need to restart the app.
                        }
                        // :hide-start:
                        Assert.IsTrue(didReset);
                        // :hide-end:
                    }
                }
            };
            // :code-block-end:
            TestingExtensions.SimulateError(realm.GetSession(),
                ErrorCode.DivergingHistories, "diverging histories!", false);
        }
    }
}
