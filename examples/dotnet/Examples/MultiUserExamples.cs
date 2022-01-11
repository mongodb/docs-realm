﻿using System;
using System.Linq;
using NUnit.Framework;
using Realms.Sync;

namespace Examples
{
    public class MultiUserExamples
    {
        [Test]
        public async System.Threading.Tasks.Task MultiUser()
        {
            var app = App.Create(Config.appid);

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
