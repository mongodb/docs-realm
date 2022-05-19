using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class Writes
    {
        Realm realm;
        public Writes()
        {
            realm = Realm.GetInstance();
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            realm.Write(() =>
            {
                realm.RemoveAll<WriteDog>();
                realm.RemoveAll<WritePerson>();
            });
        }

        [Test]
        public void Snippets()
        {
            //TearDown();
            // :snippet-start: transaction
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            realm.Write(() =>
            {
                // Create someone to take care of ssome dogs.
                var ali = new WritePerson { Id = 44, Name = "Ali" };
                realm.Add(ali);

                // Find dogs younger than 2.
                var puppies = realm.All<WriteDog>().Where(dog => dog.Age < 2);

                // Loop through one by one to update.
                foreach (var puppy in puppies)
                {
                    // Give all the puppies to Ali.
                    puppy.Owner = ali;
                }
            });
            // :replace-end:
            // :snippet-end:
            var myDog = new WriteDog { Id = 411, Name = "Gracie", Age = 7 };
            // :snippet-start: create-long-hand
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            // Open a thread-safe transaction.
            var transaction = realm.BeginWrite();
            try
            {
                // Perform a write op...
                realm.Add(myDog);
                // Do other work that needs to be included in
                // this transaction
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Something went wrong; roll back the transaction
                transaction.Dispose();
            }
            // :replace-end:
            // :snippet-end:

            // :snippet-start: create
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            // Instantiate a class, as normal.
            var dog = new WriteDog { Id = 42, Name = "Max", Age = 5 };
            // Open a thread-safe transaction.
            realm.Write(() =>
            {
                // Add the instance to the realm.
                realm.Add(dog);
            });
            // :replace-end:
            // :snippet-end:
            // :snippet-start: upsert
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            realm.Write(() =>
            {
                var drew = new WritePerson { Id = 1234, Name = "Drew" };
                // Add a new person to the realm. Since nobody with ID 1234
                // has been added yet, this adds the instance to the realm.
                realm.Add(drew, update: true);

                var andy = new WritePerson { Id = 1234, Name = "Andy" };
                // Judging by the ID, it's the same person, just with a different name.
                // When `update` is true, you overwrite the original entry (i.e. Drew -> Andy).
                realm.Add(andy, update: true);
            });
            // :replace-end:
            // :snippet-end:

            // :snippet-start: update
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            // Open a thread-safe transaction.
            realm.Write(() =>
            {
                // Get a dog to update.
                var dog = realm.All<WriteDog>().First();

                // Update some properties on the instance.
                // These changes are saved to the realm.
                dog.Name = "Wolfie";
                dog.Age += 1;
            });
            // :replace-end:
            // :snippet-end:
            // :snippet-start: update-collection
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            realm.Write(() =>
            {
                // Create someone to take care of ssome dogs.
                var ali = new WritePerson { Id = 1, Name = "Ali" };
                realm.Add(ali);

                // Find dogs younger than 2.
                var puppies = realm.All<WriteDog>().Where(dog => dog.Age < 2);

                // Loop through one by one to update.
                foreach (var puppy in puppies)
                {
                    // Give all the puppies to Ali.
                    puppy.Owner = ali;
                }
            });
            // :replace-end:
            // :snippet-end:
            var foodog = new WriteDog { Id = 123, Name = "FiFi" };
            realm.Write(() =>
            {
                realm.Add(foodog);
            });
            // :snippet-start: delete-one
            // :replace-start: {
            //  "terms": {
            //   "foodog": "dog"}
            // }
            realm.Write(() =>
            {
                // Remove the instance from the realm.
                realm.Remove(foodog);

                // Discard the reference.
                foodog = null;
            });
            // :replace-end:
            // :snippet-end:
            // :snippet-start: delete-collection
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            realm.Write(() =>
            {
                // Find dogs younger than 2 years old.
                var puppies = realm.All<WriteDog>().Where(dog => dog.Age < 2);

                // Remove the collection from the realm.
                realm.RemoveRange(puppies);
            });
            // :replace-end:
            // :snippet-end:

            var ali = new WritePerson();
            realm.Write(() =>
            {
                realm.Add(ali);
            });
            // :snippet-start: cascade-delete
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            realm.Write(() =>
        {
            // Remove all of Ali's dogs.
            realm.RemoveRange<WriteDog>(ali.Dogs);

            // Remove Ali.
            realm.Remove(ali);
        });
            // :replace-end:
            // :snippet-end:
            // :snippet-start: delete-all-of-type
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }    
            realm.Write(() =>
            {
                // Remove all instances of Dog from the realm.
                realm.RemoveAll<WriteDog>();
            });
            // :replace-end:
            // :snippet-end:
            // :snippet-start: delete-all
            realm.Write(() =>
            {
                // Remove all objects from the realm.
                realm.RemoveAll();
            });

            // :snippet-end:
        }
    }

    public class WriteDog : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int Age { get; set; }
        public string Breed { get; set; }
        public WritePerson Owner { get; set; }
    }

    public class WritePerson : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public int Id { get; set; }

        public string Name { get; set; }

        [Backlink("Owner")]
        public IQueryable<WriteDog> Dogs { get; }
    }
}