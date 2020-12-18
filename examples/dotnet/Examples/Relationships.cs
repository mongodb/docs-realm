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

            var task1 = new Task() { Text = "oh hai", Assignee = user };
            var task2 = new Task() { Text = "ok bai", Assignee = user };
            realm.Write(() =>
            {
                realm.Add(task1);
                realm.Add(task2);
            });

            // :code-block-start: inverse-query
            var katie = realm.All<User>().Where(u => u.Name == "Katie").FirstOrDefault();
            var katiesTasks = realm.All<Task>().Filter($"Assignee._id == '{katie.Id}'");
            // :code-block-end:
            Assert.AreEqual(2, katiesTasks.Count());

            return;
        }

    }

}
