using System;
using System.Threading.Tasks;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using RealmUser = Realms.Sync.User;
using User = Examples.Models.User;
using Realms.Sync.Exceptions;
using Realms.Sync.Testing;
using Realms.Sync.ErrorHandling;
using static Realms.Sync.SyncConfigurationBase;

namespace Examples
{
    public class ClientResetExamples
    {
        App app;
        RealmUser user;
        PartitionSyncConfiguration config;
        const string myRealmAppId = Config.appid;
        Realm realm;


        [Test]
        public async Task ResetsTheClient()
        {
            app = App.Create(myRealmAppId);

            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;

            config = new PartitionSyncConfiguration("myPart", user);
            //:hide-start:
            config.Schema = new[] { typeof(User) };
            //:hide-end:
            realm = await Realm.GetInstanceAsync(config);

            // :code-block-start: handle
            Session.Error += (sender, err) =>
            {
                if (err.Exception is ClientResetException clientResetEx)
                {
                    var session = (Session)sender;
                    Console.WriteLine("Client Reset requested for " +
                        session.Path + "due to " + clientResetEx.Message);

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
            TestingExtensions.SimulateError(realm.SyncSession,
                ErrorCode.DivergingHistories, "diverging histories!", false);
        }

        [Test]
        public async Task HandleAutoClientReset()
        // :code-block-start: DiscardLocalResetHandler
        // :uncomment-start:
        // private void SetupRealm()
        // :uncomment-end:
        {
            var fsConfig = new FlexibleSyncConfiguration(user);
            fsConfig.ClientResetHandler = new DiscardLocalResetHandler()
            {
                OnBeforeReset = HandleBeforeResetCallbak,
                OnAfterReset = HandleAfterResetCallback,
                ManualResetFallback = HandleManualResetCallback
            };

            //:hide-start:
            config.Schema = new[] { typeof(User) };
            //:hide-end:
            var realm = await Realm.GetInstanceAsync(fsConfig);
        }

        private void HandleBeforeResetCallbak(Realm beforeFrozen)
        {
            // This method is useful if you want to make a backup of the
            // existing Realm before it is reset by the system.
        }

        private void HandleAfterResetCallback(Realm beforeFrozen, Realm after)
        {
            // This method is useful if you want to merge in changes that
            // were in the "before" Realm into the re-created Realm
        }

        private void HandleManualResetCallback(ClientResetException clientResetException)
        {
            // An error occurred. Use this method to perform a manual client reset.

            // Prompt user to perform client reset immediately. If they don't do it,
            // they won't receive any data from the server until they restart the app
            // and all changes they make will be discarded when the app restarts.
            var didUserConfirmReset = ShowUserAConfirmationDialog();
            if (didUserConfirmReset)
            {
                // Close the Realm before doing the reset. It must be 
                // deleted as part of the reset.
                realm.Dispose();

                // perform the client reset
                var didReset = clientResetException.InitiateClientReset();
                if (didReset)
                {
                    // Navigate the user back to the main page or reopen the
                    // the Realm and reinitialize the current page.
                }
                else
                {
                    // Reset failed - notify user that they'll need to
                    // restart the app.
                }
            }
        }
        // :code-block-end:


        [Test]
        public async Task HandleManualClientReset()
        // :code-block-start: ManualClientReset
        // :uncomment-start:
        // private void SetupRealm()
        // :uncomment-end:
        {
            var fsConfig = new FlexibleSyncConfiguration(user);
            fsConfig.OnSessionError = HandleSessionError;
            //:hide-start:
            config.Schema = new[] { typeof(User) };
            //:hide-end:
            var realm = await Realm.GetInstanceAsync(fsConfig);
        }

        private void HandleSessionError(Session session, SessionException error)
        {
            if (error is ClientResetException clientResetException)
            {
                Console.WriteLine("Client Reset requested for " +
                session.Path + "due to " + error.Message);

                // Prompt user to perform client reset immediately. If they don't do it,
                // they won't receive any data from the server until they restart the app
                // and all changes they make will be discarded when the app restarts.
                var didUserConfirmReset = ShowUserAConfirmationDialog();
                if (didUserConfirmReset)
                {
                    // Close the Realm before doing the reset. It must be 
                    // deleted as part of the reset.
                    realm.Dispose();

                    // perform the client reset
                    var didReset = clientResetException.InitiateClientReset();
                    if (didReset)
                    {
                        // Navigate the user back to the main page or reopen the
                        // the Realm and reinitialize the current page.
                    }
                    else
                    {
                        // Reset failed - notify user that they'll need to
                        // restart the app.
                    }
                }
            }
        }
        // :code-block-end:

        private bool ShowUserAConfirmationDialog()
        {
            return true;
        }
    }
}
