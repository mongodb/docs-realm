using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
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

        [Test]
        public async System.Threading.Tasks.Task OneToOneQuery()
        {
            var realm = await Realm.GetInstanceAsync();
            realm.Write(() =>
            {
                realm.RemoveAll<Dog>();
                realm.RemoveAll<Person>();
            });

            var dog = new Dog() { Name = "Fido" };
            realm.Write(() =>
            {
                realm.Add(task);
            });

            Person person = new Person() { Name = "Katie"; Dog = dog};

            realm.Write(() =>
            {
                realm.Add(user);
            });

            // :code-block-start: one-to-one-query
            var fido = realm.Find<Dog>().Where(d => d.Person.Name == "Katie");
            // :code-block-end:
            Assert.AreEqual(fido, dog);

            return;
        }
    }
}
