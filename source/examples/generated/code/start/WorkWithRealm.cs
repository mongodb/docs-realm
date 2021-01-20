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

            var myRealmAppId = "<your_app_id>";
            var app = App.Create(myRealmAppId);
            r appConfig = new AppConfiguration(myRealmAppId)
            
              LogLevel = LogLevel.Debug,
              DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            

            p = App.Create(appConfig);
            ait app.EmailPasswordAuth.RegisterUserAsync(userEmail, "sekrit");
            ait app.EmailPasswordAuth.ConfirmUserAsync("<token>", "<token-id>");
            ait app.EmailPasswordAuth.SendResetPasswordEmailAsync(userEmail);
            ring myNewPassword = "";
            ait app.EmailPasswordAuth.ResetPasswordAsync(
              myNewPassword, "<token>", "<token-id>");
            ait app.EmailPasswordAuth.CallResetPasswordFunctionAsync(
              userEmail, myNewPassword,
              "<security-question-1-answer>",
              "<security-question-2-answer>");

            er = await app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar"));
        }

        publ async System.Threading.Tasks.Task APIKeys()
        {
            
              var newKey = await user.ApiKeys.CreateAsync("someKeyName");
              Console.WriteLine($"I created a key named {newKey.Name}. " +
                  $"Is it enabled? {newKey.IsEnabled}");
            
            
              var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
              Console.WriteLine($"I fetched the key named {key.Name}. " +
                  $"Is it enabled? {key.IsEnabled}");
            
            
              var allKeys = await user.ApiKeys.FetchAllAsync();
              foreach (var key in allKeys)
              {
                  Console.WriteLine($"I fetched the key named {key.Name}. " +
                      $"Is it enabled? {key.IsEnabled}");
              }
            
            
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
            
            
              await user.ApiKeys.DeleteAsync(ObjectId.Parse("00112233445566778899aabb"));
            
        }
        [Tes
        publ async System.Threading.Tasks.Task MultiUser()
        {
            RealmAppId = "tuts-tijya";
            r app = App.Create(myRealmAppId);

            
              foreach (var user in app.AllUsers)
              {
                  await user.LogOutAsync();
              }
              Assert.AreEqual(0, app.AllUsers.Count());
              var aimee = await app.LogInAsync(Credentials.EmailPassword(
                  "aimee@example.com", "sekrit"));
              Assert.IsTrue(aimee.Id == app.CurrentUser.Id, "aimee is current user");
 
              var elvis = await app.LogInAsync(Credentials.EmailPassword(
                  "elvis@example.com", "sekrit2"));
              Assert.IsTrue(elvis.Id == app.CurrentUser.Id, "elvis is current user");

              foreach (var user in app.AllUsers)
              {
                  Console.WriteLine($"User {user.Id} is logged on via {user.Provider}");
              }
              Assert.AreEqual(2, app.AllUsers.Count());
              app.SwitchUser(aimee);
              Assert.IsTrue(aimee.Id == app.CurrentUser.Id, "aimee is current user");

              await app.RemoveUserAsync(elvis);
              var noMoreElvis = app.AllUsers.FirstOrDefault(u => u.Id == elvis.Id);
              Assert.IsNull(noMoreElvis);
              Console.WriteLine("Elvis has left the application.");
            

            turn;
        }
    }
}