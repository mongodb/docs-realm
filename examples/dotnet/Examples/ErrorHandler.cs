using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examples;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Realms.Sync.Exceptions;

namespace Examples
{
    public class ErrorHandler
    {
        App app;
        Realms.Sync.User user;
        SyncConfiguration config;
        string myRealmAppId = "example-testers-kvjdy";

        [Test]
        public async Task handleErrors()
        {
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                LogLevel = LogLevel.Debug,
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            user = await app.LogInAsync(Credentials.Anonymous());
            config = new SyncConfiguration("myPartition", user);
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
                        break;
                    case ErrorCode.Unknown:
                        // Likely the app version is too old, prompt for update
                        break;
                        // ...
                }
            };
            // :code-block-end:


        }
    }
}
