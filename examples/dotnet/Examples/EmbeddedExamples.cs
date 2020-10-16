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
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-start:create
            var business = new Business(
                "Moe's Tacos",
                new List<Contact>
                {
                    new Contact()
                    {
                        Name = "Moe",
                        Address = new Address()
                        {
                            Street = "1 Main St.",
                            City = "Hoboken",
                            State = "HI",
                            PostalCode = "99922",
                            Country = "USA"
                        }
                    },
                    new Contact()
                    {
                        Name = "Caleb",
                        Address = new Address()
                        {
                            Street = "27 Maine St.",
                            City = "Lakeshore",
                            State = "Michigan",
                            PostalCode = "45678",
                            Country = "USA"
                        }
                    }
                });

            realm.Write(() =>
            {
                realm.Add(business);
            });
            //:code-block-end:
            var businesses = realm.All<Business>();
            Assert.AreEqual(businesses.Count(), 1);
            Assert.AreEqual(businesses.First().Contacts.Count, 2);

        }

        [Test]
        public async Task UpdateEmbeddedBusiness()
        {
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-start:update
            var business = realm.All<Business>()
                .Where(b => b.Name == "Moe's Tacos")
                .OrderBy(b => b.Name)
                .FirstOrDefault();

            realm.Write(() =>
            {
                business.Contacts.First().Address.Street = "2 Main Street";
            });
            //:code-block-end:
            Assert.AreEqual(business.Contacts.First().Address.Street, "2 Main Street");
            return;
        }

        [Test]
        public async Task FindsEmbeddedBusiness()
        {
            var realm = await Realm.GetInstanceAsync(config);
            // :code-block-start:find
            // Find Businesses where any of the Contacts in the Business
            // have an address in Hawaii
            var businessesInHawaii = realm.All<Business>()
                .Where(b => b.Contacts.Any(c => c.Address.State == "HI"))
                .OrderBy(b => b.Name);

            //:code-block-end:
            Assert.AreEqual(businessesInHawaii.Count(), 1);
            return;
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            using (var realm = await Realm.GetInstanceAsync(config))
            {
                realm.Write(() =>
                {
                    realm.RemoveAll<Business>();
                });
            }
            return;
        }

        // :code-block-start:embedded-classes
        public class Business : RealmObject
        {
            public string Name { get; }
            public IList<Contact> Contacts { get; }

            public Business() { }
            public Business(String name, IList<Contact> contacts)
            {
                this.Name = name;
                this.Contacts = contacts;
            }
        }

        public class Contact : RealmObject
        {
            public string Name { get; set; }
            public Address Address { get; set; }
        }

        public class Address : RealmObject
        {
            public string Street { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string Country { get; set; }
            public string PostalCode { get; set; }

            public Address() { }
        }
        //:code-block-end:
    }

    

}
