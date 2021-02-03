using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class Writes
    {
        Realm realm;
        public Writes()
        {
            var app = App.Create("");

            //config = new SyncConfiguration("myPart", );
            realm = Realm.GetInstance("");
        }

        public void Foo()
        {
            // :code-block-start: transaction
            realm.Write(() =>
            {
                // Create someone to take care of ssome dogs.
                var ali = new Person { Id = 1, Name = "Ali" };
                realm.Add(ali);

                // Find dogs younger than 2.
                var puppies = realm.All<Dog>().Where(dog => dog.Age < 2);

                // Loop through one by one to update.
                foreach (var puppy in puppies)
                {
                    // Give all the puppies to Ali.
                    puppy.Owner = ali;
                }
            });
            // :code-block-end:

            // :code-block-start: create
            // Open a thread-safe transaction.
            realm.Write(() =>
            {
                // Instantiate a class, as normal.
                var dog = new Dog { Name = "Max", Age = 5 };

                // Add the instance to the realm.
                realm.Add(dog);
            });
            // :code-block-end:
            // :code-block-start: upsert
            realm.Write(() =>
            {
                var drew = new Person { Id = 1234, Name = "Drew" };
                // Add a new person to the realm. Since nobody with ID 1234
                // has been added yet, this adds the instance to the realm.
                realm.Add(drew, update: true);

                var andy = new Person { Id = 1234, Name = "Andy" };
                // Judging by the ID, it's the same person, just with a different name.
                // When `update` is true, you overwrite the original entry (i.e. Drew -> Andy).
                realm.Add(andy, update: true);
            });

            // :code-block-end:
            // :code-block-start: update
            // Open a thread-safe transaction.
            realm.Write(() =>
            {
                // Get a dog to update.
                var dog = realm.All<Dog>().First();

                // Update some properties on the instance.
                // These changes are saved to the realm.
                dog.Name = "Wolfie";
                dog.Age += 1;
            });

            // :code-block-end:
            // :code-block-start: update-collection
            realm.Write(() =>
            {
                // Create someone to take care of ssome dogs.
                var ali = new Person { Id = 1, Name = "Ali" };
                realm.Add(ali);

                // Find dogs younger than 2.
                var puppies = realm.All<Dog>().Where(dog => dog.Age < 2);

                // Loop through one by one to update.
                foreach (var puppy in puppies)
                {
                    // Give all the puppies to Ali.
                    puppy.Owner = ali;
                }
            });
            // :code-block-end:
            var dog = new Dog();
            // :code-block-start: delete-one
            realm.Write(() =>
            {
                // Remove the instance from the realm.
                realm.Remove(dog);

                // Discard the reference.
                dog = null;
            });

            // :code-block-end:
            // :code-block-start: delete-collection
            realm.Write(() =>
            {
                // Find dogs younger than 2 years old.
                var puppies = realm.All<Dog>().Where(dog => dog.Age < 2);

                // Remove the collection from the realm.
                realm.RemoveRange(puppies);
            });

            // :code-block-end:

            var ali = new Person();

            // :code-block-start: cascade-delete
            realm.Write(() =>
            {
                // Remove all of Ali's dogs.
                realm.RemoveRange<Dog>(ali.Dogs);

                // Remove Ali.
                realm.Remove(ali);
            });

            // :code-block-end:
            // :code-block-start: delete-all-of-type
            realm.Write(() =>
            {
                // Remove all instances of Dog from the realm.
                realm.RemoveAll<Dog>();
            });

            // :code-block-end:
            // :code-block-start: delete-all
            realm.Write(() =>
            {
                // Remove all objects from the realm.
                realm.RemoveAll();
            });

            // :code-block-end:
        }
    }

    public class Dog : RealmObject
    {
        [PrimaryKey]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int Age { get; set; }
        public string Breed { get; set; }
        public Person Owner { get; set; }
    }

    public class Person : RealmObject
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [Backlink("Owner")]
        public IQueryable<Dog> Dogs { get; }
    }

}
