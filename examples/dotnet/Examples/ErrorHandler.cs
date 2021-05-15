using System;
using System.Threading.Tasks;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Realms.Sync.Exceptions;
using Realms.Sync.Testing;

namespace Examples
{
    public class ErrorHandler
    {
        App app;
        User user;
        SyncConfiguration config;
        bool didTriggerErrorHandler;
        string myRealmAppId = Config.appid;

        [Test]
        public async Task handleErrors()
        {
            // :code-block-start: set-log-level
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                //LogLevel = LogLevel.Debug,
                // :hide-start:
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
                // :hide-end:
            };
            // :code-block-end:
            app = App.Create(appConfig);
            user = await app.LogInAsync(Credentials.Anonymous());
            config = new SyncConfiguration("myPartition", user);
            //:hide-start:
            config.ObjectClasses = new[]
            {
                typeof(dotnet.User)
            };
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
            TestingExtensions.SimulateError(realm.GetSession(),
            ErrorCode.PermissionDenied, "No permission to work with the Realm", false);

            // Close the Realm before doing the reset as it'll need
            // to be deleted and all objects obtained from it will be
            // invalidated.
            realm.Dispose();

            Assert.IsTrue(didTriggerErrorHandler);
        }
    }
}