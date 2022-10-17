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
            // :snippet-start: set-log-level
            Logger.LogLevel = LogLevel.Debug;
            // :snippet-end:

            // :snippet-start: customize-logging-function
            // :uncomment-start:
            //using Realms.Logging;
            //Logger.LogLevel = LogLevel.All;
            // :uncomment-end:
            // customize the logging function:
            Logger.Default = Logger.Function(message =>
            {
                // Do something with the message
            });
            // :snippet-end:
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            user = await app.LogInAsync(Credentials.Anonymous());
            config = new PartitionSyncConfiguration("myPartition", user);
            //:remove-start:
            config.Schema = new[] { typeof(Examples.Models.User) };
            //:remove-end:
            var realm = await Realm.GetInstanceAsync(config);
            // :snippet-start:handle-errors
            config.OnSessionError = (session, sessionException) =>
            {
                switch (sessionException.ErrorCode)
                {
                    case ErrorCode.InvalidCredentials:
                        // Tell the user they don't have permissions to work with that Realm
                        // :remove-start:
                        didTriggerErrorHandler = true;
                        // :remove-end:
                        break;
                    case ErrorCode.Unknown:
                        // See https://www.mongodb.com/docs/realm-sdks/dotnet
                        // /latest/reference/Realms.Sync.Exceptions.ErrorCode.html
                        // for all of the error codes
                        break;
                }
            };
            // :snippet-end:
            TestingExtensions.SimulateError(realm.SyncSession, ErrorCode.InvalidCredentials, "" +
                "No permission to work with the Realm");

            // Close the Realm before doing the reset as it'll need
            // to be deleted and all objects obtained from it will be
            // invalidated.
            realm.Dispose();

            Assert.IsTrue(didTriggerErrorHandler);
        }
    }
}