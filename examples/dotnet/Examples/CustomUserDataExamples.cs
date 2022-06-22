using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examples;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class CustomUserDataExamples
    {
        App app;
        User user;
        const string myRealmAppId = Config.appid;
        MongoClient mongoClient;
        MongoClient.Database dbTracker;
        MongoClient.Collection<CustomUserData> cudCollection;


        [OneTimeSetUp]
        public async Task Creates()
        {
            // :snippet-start: create
            app = App.Create(myRealmAppId);
            user = await app.LogInAsync(Credentials.Anonymous());

            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbTracker = mongoClient.GetDatabase("tracker");
            cudCollection = dbTracker.GetCollection<CustomUserData>("user_data");

            var cud = new CustomUserData(user.Id)
            {
                FavoriteColor = "pink",
                LocalTimeZone = "+8",
                IsCool = true
            };

            var insertResult = await cudCollection.InsertOneAsync(cud);
            // :snippet-end:
            Assert.AreEqual(user.Id, insertResult.InsertedId);
        }

        [Test, Order(0)]
        public async Task Reads()
        {
            // :snippet-start: read
            await user.RefreshCustomDataAsync();

            // Tip: define a class that represents the custom data
            // and use the gerneic overload of GetCustomData<>()
            var cud = user.GetCustomData<CustomUserData>();

            Console.WriteLine($"User is cool: {cud.IsCool}");
            Console.WriteLine($"User's favorite color is {cud.FavoriteColor}");
            Console.WriteLine($"User's timezone is {cud.LocalTimeZone}");
            // :snippet-end:
            Assert.IsTrue(cud.IsCool);
        }

        [Test, Order(1)]
        public async Task Updates()
        {
            // :snippet-start: update
            var updateResult = await cudCollection.UpdateOneAsync(
                new BsonDocument("_id", user.Id),
                new BsonDocument("$set", new BsonDocument("IsCool", false)));

            await user.RefreshCustomDataAsync();
            var cud = user.GetCustomData<CustomUserData>();

            Console.WriteLine($"User is cool: {cud.IsCool}");
            Console.WriteLine($"User's favorite color is {cud.FavoriteColor}");
            Console.WriteLine($"User's timezone is {cud.LocalTimeZone}");
            // :snippet-end:
            Assert.AreEqual(1, updateResult.ModifiedCount);
            Assert.IsFalse(cud.IsCool);
        }


        [Test, Order(2)]
        public async Task Deletes()
        {
            // :snippet-start: delete
            var deleteResult = await cudCollection.DeleteOneAsync(
                new BsonDocument("_id", user.Id));

            var cud = user.GetCustomData<CustomUserData>();

            // The `DeletedCount` should be 1
            Console.WriteLine(deleteResult.DeletedCount);

            // There should no longer be a custom user document for the user
            var customData = await cudCollection.FindOneAsync(
                new BsonDocument("_id", user.Id));

            Console.WriteLine(customData == null);

            // :snippet-end:
            Assert.AreEqual(1, deleteResult.DeletedCount);
            Assert.IsNull(customData);

        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            await cudCollection.DeleteManyAsync();
        }

    }

    // :snippet-start: cud
    public class CustomUserData
    {
        public string _id { get; private set; }

        public string _partition { get; private set; }

        public string FavoriteColor { get; set; }

        public string LocalTimeZone { get; set; }

        public bool IsCool { get; set; }

        public CustomUserData(string id, string partition = "myPart")
        {
            this._id = id;
            this._partition = partition;
        }
    }
    // :snippet-end:
}