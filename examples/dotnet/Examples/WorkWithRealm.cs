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
        Realms.Sync.User user;
        string myRealmAppId = "tuts-tijya";

        [OneTimeSetUp]
        public async System.Threading.Tasks.Task Setup()
        {
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                LogLevel = LogLevel.Debug,
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            user = await app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar"));
            return;
        }

        public async System.Threading.Tasks.Task LotsaStuff()
        {
            string userEmail = "bob@bob.com";

            // :code-block-start: initialize-realm
            // :hide-start:
            /*:replace-with:
            var myRealmAppId = "<your_app_id>";
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
                userEmail, myNewPassword,
                "<security-question-1-answer>",
                "<security-question-2-answer>");
            //:code-block-end:

            user = await app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar"));
        }

        public async System.Threading.Tasks.Task APIKeys()
        {
            {
                //:code-block-start:apikey-create
                var newKey = await user.ApiKeys.CreateAsync("someKeyName");
                Console.WriteLine($"I created a key named {newKey.Name}. " +
                    $"Is it enabled? {newKey.IsEnabled}");
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-fetch
                var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                Console.WriteLine($"I fetched the key named {key.Name}. " +
                    $"Is it enabled? {key.IsEnabled}");
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-fetch-all
                var allKeys = await user.ApiKeys.FetchAllAsync();
                foreach (var key in allKeys)
                {
                    Console.WriteLine($"I fetched the key named {key.Name}. " +
                        $"Is it enabled? {key.IsEnabled}");
                }
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-enable-disable
                var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                if (!key.IsEnabled)
                {
                    // enable the key
                    await user.ApiKeys.EnableAsync(key.Id);
                }
                else
                {
                    // disable the key
                    await user.ApiKeys.DisableAsync(key.Id);
                }
                //:code-block-end:
            }
            {
                //:code-block-start:apikey-delete
                await user.ApiKeys.DeleteAsync(ObjectId.Parse("00112233445566778899aabb"));
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
                Assert.IsTrue(aimee.Id == app.CurrentUser.Id, "aimee is current user");
                //:code-block-end:

                //:code-block-start:multi-remove
                await app.RemoveUserAsync(elvis);
                var noMoreElvis = app.AllUsers.FirstOrDefault(u => u.Id == elvis.Id);
                Assert.IsNull(noMoreElvis);
                Console.WriteLine("Elvis has left the application.");
                //:code-block-end:
            }

            return;
        }
    }
}