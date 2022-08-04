using System;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Task = Examples.Models.Task;
using ThreadTask = System.Threading.Tasks.Task;

namespace Examples
{
    public class AsynchronousTransactions
    {

        public AsynchronousTransactions()
        {
        }

        [Test]
        public async ThreadTask TestWriteAsync()
        {
            var realm = Realm.GetInstance();

            //:snippet-start: write-async
            // :replace-start: {
            //  "terms": {
            //   "PersonObject": "Person" }
            // }
            var person = await realm.WriteAsync(() =>
            {
                return realm.Add(new PersonObject()
                {
                    Name = "John Doe"
                });
            });
            // you can use/modify person now
            // without the need of using ThreadSafeReference

            Console.WriteLine(person.Name); // John Doe
            // :replace-end:
            // :snippet-end:

            //:snippet-start: commit-async
            // :replace-start: {
            //  "terms": {
            //   "PersonObject": "Person" }
            // }
            PersonObject person2;
            using (var transaction = await realm.BeginWriteAsync())
            {
                person2 = realm.Add(new PersonObject
                {
                    Name = "Jane Doe"
                });
                // Do other work that needs to be included in this transaction
                await transaction.CommitAsync();
            }
            Console.WriteLine(person2.Name); // Jane Doe
            // :replace-end:
            // :snippet-end:

            Assert.AreEqual(person.Name, "John Doe");
            Assert.AreEqual(person2.Name, "Jane Doe");

        }

        public class PersonObject : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            [Required]
            public string Name { get; set; }
        }
    }
}

