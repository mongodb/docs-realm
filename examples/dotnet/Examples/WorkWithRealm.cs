using System;
using System.IO;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using TaskStatus = dotnet.TaskStatus;
using Task = dotnet.Task;

namespace UnitTests
{
    public class WorkWithRealm
    {
        App app;
        ObjectId testTaskId;
        Realms.Sync.User user;
        SyncConfiguration config;
        string myRealmAppId = "tuts-tijya";

        [Test]
        public async System.Threading.Tasks.Task LotsaStuff()
        {
            string userEmail = "";

            // :code-block-start: initialize-realm
            // :hide-start:
            /*:replace-with:
            string myRealmAppId = "<your_app_id>";
            var app = App.Create(myRealmAppId);
            :code-block-end:*/
            // :code-block-start: appConfig
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                LogLevel = LogLevel.Debug,
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            //:code-block-end:
            // :code-block-start: register-user
            await app.EmailPasswordAuth.RegisterUserAsync(userEmail, "sekrit");
            //:code-block-end:
            // :code-block-start: confirm-user
            await app.EmailPasswordAuth.ConfirmUserAsync("<token>", "<token-id>");
            //:code-block-end:
            // :code-block-start: reset-user-1
            await app.EmailPasswordAuth.SendResetPasswordEmailAsync(userEmail);
            //:code-block-end:
            string myNewPassword = "";
            // :code-block-start: reset-user-2
            await app.EmailPasswordAuth.ResetPasswordAsync(
                myNewPassword, "<token>", "<token-id>");
            //:code-block-end:
            // :code-block-start: reset-user-3
            await app.EmailPasswordAuth.CallResetPasswordFunctionAsync(
                userEmail, myNewPassword);
            //:code-block-end:

        }

        [Test]
        public async System.Threading.Tasks.Task APIKeys()
        {
            {
                //:code-block-start:apikey-create
                var apiKeyClient = user.ApiKeys;
                var newKey = await apiKeyClient.CreateAsync("someKeyName");
                Console.WriteLine($"I created a key named {newKey.Name}. " +
                    $"Is it enabled? {newKey.IsEnabled}");
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-fetch
                var apiKeyClient = user.ApiKeys;
                var key = await apiKeyClient.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                Console.WriteLine($"I fetched the key named {key.Name}. " +
                    $"Is it enabled? {key.IsEnabled}");
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-fetch-all
                var apiKeyClient = user.ApiKeys;
                var allKeys = await apiKeyClient.FetchAllAsync();
                foreach (var key in allKeys)
                {
                    Console.WriteLine($"I fetched the key named {key.Name}. " +
                        $"Is it enabled? {key.IsEnabled}");
                }
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-enable-disable
                var apiKeyClient = user.ApiKeys;
                var key = await apiKeyClient.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                if (!key.IsEnabled)
                {
                    // enable the key
                    await apiKeyClient.EnableAsync(key.Id);
                }
                else
                {
                    // disable the key
                    await apiKeyClient.DisableAsync(key.Id);
                }
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-delete
                var apiKeyClient = user.ApiKeys;
                var key = await apiKeyClient.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                await apiKeyClient.DeleteAsync(key.Id);
                //:code-block-end:
            }
        }
        [Test]
        public async System.Threading.Tasks.Task MultiUser()
        {
            myRealmAppId = "tuts-tijya";
            var app = App.Create(myRealmAppId);

            {
                foreach (var user in app.AllUsers)
                {
                    await user.LogOutAsync();
                }
                Assert.AreEqual(0, app.AllUsers.Count());
                //:code-block-start:multi-add
                var aimee = await app.LogInAsync(Credentials.EmailPassword(
                    "aimee@example.com", "sekrit"));
                Assert.IsTrue(aimee.Id == app.CurrentUser.Id, "aimee is current user");
 
                var elvis = await app.LogInAsync(Credentials.EmailPassword(
                    "elvis@example.com", "sekrit2"));
                Assert.IsTrue(elvis.Id == app.CurrentUser.Id, "elvis is current user");
                //:code-block-end:

                //:code-block-start:multi-list
                foreach (var user in app.AllUsers)
                {
                    Console.WriteLine($"User {user.Id} is logged on via {user.Provider}");
                }
                Assert.AreEqual(2, app.AllUsers.Count());
                //:code-block-end:
                //:code-block-start:multi-switch
                app.SwitchUser(aimee);
                if (app.CurrentUser.Id == aimee.Id)
                {
                    Console.WriteLine($"Aimee is now the current user.");
                }
                //:code-block-end:
                Assert.IsTrue(aimee.Id == app.CurrentUser.Id, "aimee is current user");

                //:code-block-start:multi-remove
                await app.RemoveUserAsync(elvis);
                var noMoreElvis = app.AllUsers.FirstOrDefault(u => u.Id == elvis.Id);
                if (noMoreElvis == null)
                {
                    Console.WriteLine($"Elvis has left the application.");
                }
                //:code-block-end:
                Assert.IsNull(noMoreElvis);
            }

            return;
        }
    }
}