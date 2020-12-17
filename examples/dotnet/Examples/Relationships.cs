using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
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

            public IList<Task> Tasks { get; }
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

            [Backlink(nameof(User.Tasks))]
            public IQueryable<User> Assignee { get; }
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

            var task = new Task() { Text = "oh hai" };
            realm.Write(() =>
            {
                realm.Add(task);
            });

            User user = new User() { Name = "Katie"};
            user.Tasks.Add(task);

            realm.Write(() =>
            {
                realm.Add(user);
            });

            // :code-block-start: inverse-query
            var katie = realm.All<User>().Where(u => u.Name == "Katie").FirstOrDefault();
            var tasks = realm.All<Task>().Filter($"Assignee._id == '{katie.Id}'").ToList();
            // :code-block-end:
            Assert.AreEqual(1, tasks.Count());

         

            return;
        }

    }

}
