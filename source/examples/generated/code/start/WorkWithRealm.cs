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

<<<<<<< HEAD
            var myRealmAppId = "<your_app_id>";
=======
            string myRealmAppId = "<your_app_id>";
>>>>>>> 657250e9f1732adbe0df302056d95d26fcf24312
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
<<<<<<< HEAD
              userEmail, myNewPassword,
              "<security-question-1-answer>",
              "<security-question-2-answer>");
=======
              userEmail, myNewPassword, new { token = "<token>", tokenId = "<token-=id>" });
>>>>>>> 657250e9f1732adbe0df302056d95d26fcf24312

        }

        [Tes
        publ async System.Threading.Tasks.Task APIKeys()
        {
            
              var newKey = await user.ApiKeys.CreateAsync("someKeyName");
<<<<<<< HEAD
              Console.WriteLine($"I created a key named {newKey.Name}. " +
=======
              Console.WriteLine($"I created a key named {newKey.Name}. " +
>>>>>>> 657250e9f1732adbe0df302056d95d26fcf24312
                  $"Is it enabled? {newKey.IsEnabled}");
            
            
              var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
<<<<<<< HEAD
              Console.WriteLine($"I fetched the key named {key.Name}. " +
=======
              Console.WriteLine($"I fetched the key named {key.Name}. " +
>>>>>>> 657250e9f1732adbe0df302056d95d26fcf24312
                  $"Is it enabled? {key.IsEnabled}");
            
            
              var allKeys = await user.ApiKeys.FetchAllAsync();
              foreach (var key in allKeys)
              {
<<<<<<< HEAD
                  Console.WriteLine($"I fetched the key named {key.Name}. " +
=======
                  Console.WriteLine($"I fetched the key named {key.Name}. " +
>>>>>>> 657250e9f1732adbe0df302056d95d26fcf24312
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