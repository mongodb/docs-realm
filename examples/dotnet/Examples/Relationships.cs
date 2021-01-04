using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;

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
            var fidosPerson = realm.All<Person>().Where(p => p.Dog == dog).FirstOrDefault();
            // :code-block-end:
            Assert.AreEqual(fidosPerson, person);

            return;
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

            return;
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
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            public string Name { get; set; }

            public IList<Task> Tasks { get; }
        }
        //:hide-start:
        [MapTo("AnudderTask")]
        //:hide-end:
        public class Task : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            public string Text { get; set; }

            [Backlink(nameof(User.Tasks))]
            public IQueryable<User> Assignee { get; }
        }
        // :code-block-end:
    }
}
