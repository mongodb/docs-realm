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

        const string myRealmAppId = Config.appid;
        Realm realm;
        App fsApp;
        Realm fsRealm;
        RealmUser fsUser;

        [Test]
        public async Task HandleAutoClientReset()
        // :code-block-start: DiscardLocalResetHandler
        // :uncomment-start:
        // private void SetupRealm()
        // :uncomment-end:
        {
            // :hide-start:
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("valerie@mongodb.com", "astral")).Result;
            // :hide-end:
            var config = new PartitionSyncConfiguration("myPartition", user);
            config.ClientResetHandler = new DiscardLocalResetHandler()
            {
                OnBeforeReset = HandleBeforeResetCallback,
                OnAfterReset = HandleAfterResetCallback,
                ManualResetFallback = HandleManualResetCallback
            };

            //:hide-start:
            config.Schema = new[] { typeof(User) };
            //:hide-end:
            var realm = await Realm.GetInstanceAsync(config);
        }

        private void HandleBeforeResetCallback(Realm beforeFrozen)
        {
            // Notify the user that a reset is going to happen.
            // This method may also be useful if you want to make a backup
            // of the existing Realm before it is reset by the system.
        }

        private void HandleAfterResetCallback(Realm beforeFrozen, Realm after)
        {
            // Notify the user when the reset is complete.
            // This method may also be useful if you want to merge in changes
            // that were in the "before" Realm into the re-created Realm
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

        public async Task HandleManualClientReset()
        // :code-block-start: ManualClientReset
        // :replace-start: {
        //  "terms": {
        //   "fsApp": "app",
        //   "fsUser":"user",
        //   "fsConfig":"config",
        //   "fsrealm":"realm"
        //   }
        // }
        // :uncomment-start:
        // private void SetupRealm()
        // :uncomment-end:
        {
            fsApp = App.Create(myRealmAppId);
            fsUser = fsApp.LogInAsync(
                Credentials.EmailPassword("valerie@mongodb.com", "astral")).Result;

            var fsConfig = new FlexibleSyncConfiguration(fsUser);
            fsConfig.ClientResetHandler =
                new ManualRecoveryHandler(HandleSessionError);
            //:hide-start:
            fsConfig.Schema = new[] { typeof(User) };
            //:hide-end:

            var fsrealm = await Realm.GetInstanceAsync(fsConfig);
        }

        private void HandleSessionError(ClientResetException clientResetException)
        {
            Console.WriteLine($"Client Reset requested: {clientResetException.Message}");

            // Prompt user to perform a client reset immediately. If they don't do it,
            // they won't receive any data from the server until they restart the app
            // and all changes they make will be discarded when the app restarts.
            var didUserConfirmReset = ShowUserAConfirmationDialog();
            if (didUserConfirmReset)
            {
                // Close the Realm before doing the reset. It must be 
                // deleted as part of the reset.
                fsRealm.Dispose();

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
        // :replace-end:
        // :code-block-end:

        private bool ShowUserAConfirmationDialog()
        {
            return true;
        }
    }
}
