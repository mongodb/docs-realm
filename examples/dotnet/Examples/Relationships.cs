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
        // :snippet-start: one-to-one
        // :replace-start: {
        //  "terms": {
        //   "RelPerson": "Person",
        //   "RelDog" : "Dog" }
        // }
        public class RelPerson : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }
            public string Name { get; set; }
            public DateTimeOffset Birthdate { get; set; }
            public RelDog Dog { get; set; }
        }

        public class RelDog : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }
            public string Name { get; set; }
            public int Age { get; set; }
            public string Breed { get; set; }
        }
        //:replace-end:
        // :snippet-end:

        [Test]
        public async System.Threading.Tasks.Task OneToOneQuery()
        {
            var realm = await Realm.GetInstanceAsync();
            realm.Write(() =>
            {
                realm.RemoveAll<RelDog>();
                realm.RemoveAll<RelPerson>();
            });

            var dog = new RelDog() { Id = ObjectId.GenerateNewId(), Name = "Fido" };
            var person = new RelPerson() { Name = "Katie", Dog = dog };

            realm.Write(() =>
            {
                realm.Add(person);
            });

            // :snippet-start: one-to-one-query
            // :replace-start: {
            //  "terms": {
            //   "RelPerson": "Person",
            //   "RelDog" : "Dog" }
            // }
            var fidosPerson = realm.All<RelPerson>().FirstOrDefault(p => p.Dog == dog);
            // :replace-end:
            // :snippet-end:
            Assert.AreEqual(fidosPerson, person);
        }
    }

    public class OneToManyRelationship
    {
        public OneToManyRelationship()
        {
            // :snippet-start: one-to-many-use
            // :replace-start: {
            //  "terms": {
            //   "Rel2Person": "Person",
            //   "Rel2Dog" : "Dog" }
            // }
            // To add items to the IList<T>:
            var person = new Rel2Person();
            person.Dogs.Add(new Rel2Dog
            {
                Name = "Caleb",
                Age = 7,
                Breed = "mutt"
            });
            // :replace-end:
            // :snippet-end:
        }

        // :snippet-start: one-to-many
        // :replace-start: {
        //  "terms": {
        //   "Rel2Person": "Person",
        //   "Rel2Dog" : "Dog" }
        // }
        public class Rel2Person : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }
            public string Name { get; set; }
            public DateTimeOffset Birthdate { get; set; }
            public IList<Rel2Dog> Dogs { get; }
        }

        public class Rel2Dog : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }
            public string Name { get; set; }
            public int Age { get; set; }
            public string Breed { get; set; }
        }
        // :replace-end:
        // :snippet-end:

        [Test]
        public async System.Threading.Tasks.Task OneToManyQuery()
        {
            var realm = await Realm.GetInstanceAsync();
            realm.Write(() =>
            {
                realm.RemoveAll<Rel2Dog>();
                realm.RemoveAll<Rel2Person>();
            });

            var dog1 = new Rel2Dog() { Id = ObjectId.GenerateNewId(), Name = "Fido", Age = 1 };
            var dog2 = new Rel2Dog() { Id = ObjectId.GenerateNewId(), Name = "Spot", Age = 1 };
            var dog3 = new Rel2Dog() { Id = ObjectId.GenerateNewId(), Name = "Lucky", Age = 2 };

            var person = new Rel2Person() { Name = "Katie" };

            realm.Write(() =>
            {
                person.Dogs.Add(dog1);
                person.Dogs.Add(dog2);
                person.Dogs.Add(dog3);

                realm.Add(person);
            });

            // :snippet-start: one-to-many-query
            // :replace-start: {
            //  "terms": {
            //   "Rel2Person": "Person",
            //   "Rel2Dog" : "Dog" }
            // }
            var youngDogs = realm.All<Rel2Dog>().Where(d => d.Age == 1).OrderBy(dog => dog.Name).ToList();
            // :replace-end:
            // :snippet-end:
            var younglist = new List<Rel2Dog>();
            younglist.Add(dog1);
            younglist.Add(dog2);
            Assert.AreEqual(youngDogs[0].Name, younglist[0].Name);
        }
    }

    public class InverseRelationship
    {
        // :snippet-start: inverse
        // :replace-start: {
        //  "terms": {
        //   "UserTwo": "User",
        //   "TaskTwo" : "Task" }
        // }
        public class UserTwo : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            public string Name { get; set; }

            [Backlink(nameof(TaskTwo.Assignee))]
            public IQueryable<TaskTwo> Tasks { get; }
        }

        public class TaskTwo : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            public string Text { get; set; }

            public UserTwo Assignee { get; set; }
        }
        // :replace-end:
        // :snippet-end:

        [Test]
        public async System.Threading.Tasks.Task InverseQuery()
        {
            var realm = await Realm.GetInstanceAsync();
            realm.Write(() =>
            {
                realm.RemoveAll<TaskTwo>();
                realm.RemoveAll<UserTwo>();
            });

            UserTwo user = new UserTwo() { Name = "Katie" };

            realm.Write(() =>
            {
                realm.Add(user);
            });

            var task1 = new TaskTwo() { Text = "Defribillate the master oscillator", Assignee = user };
            var task2 = new TaskTwo() { Text = "Subvert the paradigm", Assignee = user };
            realm.Write(() =>
            {
                realm.Add(task1);
                realm.Add(task2);
            });

            // :snippet-start: inverse-query
            // :replace-start: {
            //  "terms": {
            //   "UserTwo": "User",
            //   "TaskTwo" : "Task" }
            // }
            var oscillatorAssignees = realm.All<UserTwo>()
                .Filter("Tasks.Text CONTAINS 'oscillator'").ToList();

            foreach (UserTwo u in oscillatorAssignees)
            {
                Console.WriteLine(u.Name);
            }
            // :replace-end:
            // :snippet-end:
            Assert.AreEqual(1, oscillatorAssignees.Count());
            Assert.AreEqual("Katie", oscillatorAssignees[0].Name, "matches");
            return;
        }

    }

}
