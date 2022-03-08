﻿using System;
using System.Threading.Tasks;
using MongoDB.Bson;
using Realms.Sync;

namespace Examples
{
    public class UserLinkExamples
    {
        App app;

        public async Task LinksAUser()
        {
            {
                // :code-block-start: link
                // 1) A user logs on anonymously:
                var anonUser = await app.LogInAsync(Credentials.Anonymous());
                // 2) They create some data, and then decide they want to save
                //    it, which requires creating an Email/Password account.
                // 3) We prompt the user to log in, and then use that info to
                //    register the new EmailPassword user, and then generate an
                //    EmailPassword credential to link the existing anonymous
                //    account:
                var email = "caleb@example.com";
                var password = "shhhItsASektrit!";
                await app.EmailPasswordAuth.RegisterUserAsync(
                    email, password);
                var officialUser = await anonUser.LinkCredentialsAsync(
                   Credentials.EmailPassword(email, password));
                // :code-block-end:
            }
            {
                // :code-block-start: link2
                var anonUser = await app.LogInAsync(Credentials.Anonymous());
                var officialUser = await anonUser.LinkCredentialsAsync(
                   Credentials.Google("<google-token>", GoogleCredentialType.AuthCode));
                // :code-block-end:
            }
            return;
        }

    }
}
