using System;
using System.Threading.Tasks;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Realms.Sync.Exceptions;
using Realms.Sync.Testing;
using Realms.Logging;

namespace Examples
{
    public class ErrorHandler
    {
        App app;
        User user;
        PartitionSyncConfiguration config;
        bool didTriggerErrorHandler;
        string myRealmAppId = Config.appid;

        [Test]
        public async Task HandleErrors()
        {
            // :code-block-start: set-log-level
            Logger.LogLevel = LogLevel.Debug
            // :code-block-end:
            

            // :code-block-start: customize-logging-function
            // :uncomment-start:
            //using Realms.Logging;
            //Logger.LogLevel = LogLevel.All;
            // :uncomment-end:
            // customize the logging function:
            Logger.Default = Logger.Function(message =>
            {
                // Do something with the message
            });
            // :code-block-end:
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            user = await app.LogInAsync(Credentials.Anonymous());
            config = new PartitionSyncConfiguration("myPartition", user);
            //:hide-start:
            config.Schema = new[] { typeof(Examples.Models.User) };
            //:hide-end:
            var realm = await Realm.GetInstanceAsync(config);

            // :code-block-start: handle-errors
            Session.Error += (session, errorArgs) =>
            {
                var sessionException = (SessionException)errorArgs.Exception;
                switch (sessionException.ErrorCode)
                {
                    case ErrorCode.AccessTokenExpired:
                    case ErrorCode.BadUserAuthentication:
                        // Ask user for credentials
                        break;
                    case ErrorCode.PermissionDenied:
                        // Tell the user they don't have permissions to work with that Realm
                        // :hide-start:
                        didTriggerErrorHandler = true;
                        // :hide-end:
                        break;
                    case ErrorCode.Unknown:
                        // Likely the app version is too old, prompt for update
                        break;
                        // ...
                }
            };
            // :code-block-end:
            TestingExtensions.SimulateError(realm.SyncSession,
            ErrorCode.PermissionDenied, "No permission to work with the Realm", false);

            // Close the Realm before doing the reset as it'll need
            // to be deleted and all objects obtained from it will be
            // invalidated.
            realm.Dispose();

            Assert.IsTrue(didTriggerErrorHandler);
        }
    }
}