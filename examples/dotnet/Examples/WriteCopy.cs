using System;
using System.Security.Cryptography;
using NUnit.Framework;
using Realms;

namespace Examples
{
    public class WriteCopy
    {
        byte[] encryptionKey = new byte[64];
        [Test]
        public void TestWriteCopy()
        {
            // :code-block-start: copy_a_realm
            // open an existing realm
            var realm = Realm.GetInstance("/users/caleb/myRealm.realm");

            // Create a RealmConfiguration for the *copy*
            var config = new RealmConfiguration("/users/caleb/myRealm_copy.realm")
            {
                // optionally encrypt it
                EncryptionKey = encryptionKey,
            };

            // Copy the realm
            realm.WriteCopy(config);
            // :code-block-end:
        }
    }
}


/* // Check if we already have a key stored in the platform's secure storage.
            // If we don't, generate a new one:
            var encryptionKey = new byte[64];
            using var rng = new RNGCryptoServiceProvider();
            rng.GetBytes(encryptionKey);*/