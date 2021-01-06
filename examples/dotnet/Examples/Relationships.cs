using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using NUnit.Framework;

namespace Examples
{
    public class OneToOneRelationship
    {
        [MapTo("PersonTwo")]
        // :code-block-start: one-to-one
        public class Person : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }
            public string Name { get; set; }
            public DateTimeOffset Birthdate { get; set; }
            public Dog Dog { get; set; }
        }
        //:hide-start:
        [MapTo("DogTwo")]
        //:hide-end:
        public class Dog : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }
            public string Name { get; set; }
            public int Age { get; set; }
            public string Breed { get; set; }
        }
        // :code-block-end:

        [Test]
        public async System.Threading.Tasks.Task OneToOneQuery()
        {
            var realm = await Realm.GetInstanceAsync();
            realm.Write(() =>
            {
                realm.RemoveAll<Dog>();
                realm.RemoveAll<Person>();
            });

            var dog = new Dog() { Id = ObjectId.GenerateNewId(), Name = "Fido" };
            var person = new Person() { Name = "Katie", Dog = dog };

            realm.Write(() =>
            {
                realm.Add(person);
            });

            // :code-block-start: one-to-one-query
            var fidosPerson = realm.All<Person>().FirstOrDefault(p => p.Dog == dog);
            // :code-block-end:
            Assert.AreEqual(fidosPerson, person);
        }
    }

    public class OneToManyRelationship
    {
        public OneToManyRelationship()
        {
            // :code-block-start: one-to-many-use
            // To add items to the IList<T>:
            var person = new Person();
            person.Dogs.Add(new Dog
            {
                Name = "Caleb",
                Age = 7,
                Breed = "mutt"
            });
            // :code-block-end:
        }
        [MapTo("PersonThree")]
        // :code-block-start: one-to-many
        public class Person : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }
            public string Name { get; set; }
            public DateTimeOffset Birthdate { get; set; }
            public IList<Dog> Dogs { get; }
        }
        //:hide-start:
        [MapTo("DogThree")]
        //:hide-end:
        public class Dog : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }
            public string Name { get; set; }
            public int Age { get; set; }
            public string Breed { get; set; }
        }
        // :code-block-end:

        [Test]
        public async System.Threading.Tasks.Task OneToManyQuery()
        {
            var realm = await Realm.GetInstanceAsync();
            realm.Write(() =>
            {
                realm.RemoveAll<Dog>();
                realm.RemoveAll<Person>();
            });

            var dog1 = new Dog() { Id = ObjectId.GenerateNewId(), Name = "Fido", Age = 1 };
            var dog2 = new Dog() { Id = ObjectId.GenerateNewId(), Name = "Spot", Age = 1 };
            var dog3 = new Dog() { Id = ObjectId.GenerateNewId(), Name = "Lucky", Age = 2 };

            var person = new Person() { Name = "Katie" };

            realm.Write(() =>
            {
                person.Dogs.Add(dog1);
                person.Dogs.Add(dog2);
                person.Dogs.Add(dog3);

                realm.Add(person);
            });

            // :code-block-start: one-to-many-query
            var youngDogs = realm.All<Dog>().Where(d => d.Age == 1);
            // :code-block-end:
            var younglist = new List<Dog>();
            younglist.Add(dog1);
            younglist.Add(dog2);
            Assert.AreEqual(youngDogs, younglist);
        }
    }

    public class InverseRelationship
    {
        [MapTo("UserTwo")]
        // :code-block-start: inverse
        public class User : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

            public string Name { get; set; }

            [Backlink(nameof(Task.Assignee))]
            public IQueryable<Task> Tasks { get; }
        }
        //:hide-start:
        [MapTo("AnudderTask")]
        //:hide-end:
        public class Task : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

            public string Text { get; set; }

            public User Assignee { get; set; }
        }
        // :code-block-end:

        [Test]
        public async System.Threading.Tasks.Task InverseQuery()
        {
            var realm = await Realm.GetInstanceAsync();
            realm.Write(() =>
            {
                realm.RemoveAll<Task>();
                realm.RemoveAll<User>();
            });

            User user = new User() { Name = "Katie" };
          
            realm.Write(() =>
            {
                realm.Add(user);
            });

            var task1 = new Task() { Text = "Defribillate the master oscillator", Assignee = user };
            var task2 = new Task() { Text = "Subvert the paradigm", Assignee = user };
            realm.Write(() =>
            {
                realm.Add(task1);
                realm.Add(task2);
            });

            // :code-block-start: inverse-query
            var oscillatorAssignees = realm.All<User>()
                .Filter("Tasks.Text CONTAINS 'oscillator'").ToList();

            foreach (User u in oscillatorAssignees)
            {
                Console.WriteLine(u.Name);
            }
            // :code-block-end:
            Assert.AreEqual(1, oscillatorAssignees.Count());
            Assert.AreEqual("Katie", oscillatorAssignees[0].Name);
            return;
        }

    }

}
