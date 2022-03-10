using System;
using System.IO;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Task = Examples.Models.Task;
using TaskStatus = Examples.Models.TaskStatus;
using ThreadTask = System.Threading.Tasks.Task;
using System.Collections.Generic;
using Realms.Exceptions;
using ObjectExamples.Models;

namespace Examples
{
    public class FunctionExamples
    {
        App app;
        ObjectId testTaskId;
        User user;
        PartitionSyncConfiguration config;
        const string myRealmAppId = Config.appid;

        [OneTimeSetUp]
        public async ThreadTask Setup()
        {

            app = App.Create(myRealmAppId);
            user = await app.LogInAsync(
                Credentials.EmailPassword("foo@foo.com", "foobar"));
            config = new PartitionSyncConfiguration("myPart", user);
            config.Schema = new[]
            {
                typeof(MyClass)
            };
            return;
        }

        [Test]
        public async ThreadTask CallsAFunction()
        {
            try
            {
                // :code-block-start: callfunc
                var bsonValue = await
                    user.Functions.CallAsync("sum", 2, 40);

                // The result must now be cast to Int32:
                var sum = bsonValue.ToInt32();

                // Or use the generic overloads to avoid casting the BsonValue:
                sum = await
                   user.Functions.CallAsync<int>("sum", 2, 40);
                // :code-block-end:
                Assert.AreEqual(42, sum);
                // :code-block-start: callfuncWithPOCO
                var task = await user.Functions.CallAsync<MyClass>
                    ("getTask", "5f7f7638024a99f41a3c8de4");

                var name = task.Name;
                // :code-block-end:
                return;
            }
            catch (Exception) { }
            //{ "_id":{ "$oid":"5f0f69dc4eeabfd3366be2be"},"_partition":"myPart","name":"do this NOW","status":"Closed"}
        }
    }

    public class MyClass : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        [MapTo("name")]
        [Required]
        public string Name { get; set; }

        public MyClass()
        {
            this.Id = ObjectId.GenerateNewId();
        }
    }


}
