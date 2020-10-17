using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class EmbeddedExamples
    {
        App app;
        User user;
        SyncConfiguration config;
        const string myRealmAppId = "tuts-tijya";

        [OneTimeSetUp]
        public void Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("myPartition", user);

            // Synchronous here because setup and tear down don't support async
            var realm = Realm.GetInstance(config);

            Address address = new Address() // Create an Address
            {
                Street = "123 Fake St.",
                City = "Springfield",
                Country = "USA",
                PostalCode = "90710"
            };

            Contact contact = new Contact() // Create a Contact
            {
                Name = "Nick Riviera",
                Address = address // Embed the Address Object
            };

            realm.Write(() =>
            {
                realm.Add(contact);
            });

            var contacts = realm.All<Contact>();
            // Test that the Contact document has been created
            Assert.AreEqual(contacts.Count(), 1);

            // Test that the first (and only) Contact document has an embedded Address with a Street of "123 Fake St."
            Assert.AreEqual(contacts.FirstOrDefault().Address.Street, "123 Fake St.");
        }

        [Test]
        public async Task UpdateEmbeddedObject()
        {
            var realm = await Realm.GetInstanceAsync(config);

            var resultContact = realm.All<Contact>() // Find the First Contact (Sorted By Name)
                .OrderBy(c => c.Name)
                .FirstOrDefault();

            // Update the Result Contact's Embedded Address Object's Properties
            realm.Write(() =>
            {
                resultContact.Address.Street = "Hollywood Upstairs Medical College";
                resultContact.Address.City = "Los Angeles";
                resultContact.Address.PostalCode = "90210";
            });

            // Test that the Contact embedded Address's Street has been updated
            Assert.AreEqual(resultContact.Address.Street, "Hollywood Upstairs Medical College");

        }

        [Test]
        public async Task OverwriteEmbeddedObject()
        {
            var realm = await Realm.GetInstanceAsync(config);

            Contact oldContact = realm.All<Contact>() // Find the first contact
                .OrderBy(c => c.Name)
                .FirstOrDefault();

            
            Address newAddress = new Address() // Create an Address
            {
                Street = "100 Main Street",
                City = "Los Angeles",
                Country = "USA",
                PostalCode = "90210"
            };

            realm.Write(() =>
            {
                oldContact.Address = newAddress;
            });

            // Test that the Contact field's Embedded Address has been overwritten with the new Address by checking the Address Street
            Assert.AreEqual(oldContact.Address.Street, "100 Main Street");
        }

        [Test]
        public async Task QueryEmbeddedObject()
        {
            var realm = await Realm.GetInstanceAsync(config);
            var losAngelesContacts = realm.All<Contact>().Filter("Address.City == 'Los Angeles'"); // Find All Contacts with an Address of "Los Angeles"

            foreach (Contact losAngelesContact in losAngelesContacts)
            {
                Console.WriteLine("Los Angeles Contact:");
                Console.WriteLine(losAngelesContact.Name);
                Console.WriteLine(losAngelesContact.Address.Street);
            }

            // Test that the query worked and that the Contacts returned actually are from 'Los Angeles'
            Assert.AreEqual(losAngelesContacts.FirstOrDefault().Address.City, "Los Angeles");
        }


        [OneTimeTearDown]
        public async Task TearDown()
        {
            using (var realm = await Realm.GetInstanceAsync(config))
            {
                realm.Write(() =>
                {
                    realm.RemoveAll<Contact>();
                    realm.RemoveAll<Business>();
                });
            }
            return;
        }

        public class Address : EmbeddedObject
        {
            public string Street { get; set; }
            public string City { get; set; }
            public string Country { get; set; }
            public string PostalCode { get; set; }

        }
        public class Contact : RealmObject
        {

            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            public string Name { get; set; }

            public Address Address { get; set; } // embed a single address 

        }
        public class Business : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            public string Name { get; set; }
            public IList<Address> addresses { get; }
        }
    }
}