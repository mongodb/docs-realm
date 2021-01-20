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

namespace UnitTests
{
    public class CustomUserDataExamples
    {
        App app;
        User user;
        const string myRealmAppId = "tuts-tijya";
        MongoClient mongoClient;
        MongoClient.Database dbTracker;
        MongoClient.Collection<CustomUserData> cudCollection;


        [OneTimeSetUp]
        public async Task Creates()
        {
            // :code-block-start: create
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
            // :code-block-end:
            Assert.AreEqual(user.Id, insertResult.InsertedId);
        }

        [Test]
        public async Task Reads()
        {
            // :code-block-start: read
            await user.RefreshCustomDataAsync();

            // Tip: define a class that represents the custom data
            // and use the gerneic overload of GetCustomData<>()
            var cud = user.GetCustomData<CustomUserData>();

            Console.WriteLine($"User is cool: {cud.IsCool}");
            Console.WriteLine($"User's favorite color is {cud.FavoriteColor}");
            Console.WriteLine($"User's timezone is {cud.LocalTimeZone}");
            // :code-block-end:
            Assert.IsTrue(cud.IsCool);
        }

        [Test]
        public async Task Updates()
        {
            // :code-block-start: update
            var updateResult = await cudCollection.UpdateOneAsync(
                new BsonDocument("_id", user.Id),
                new BsonDocument("$set", new BsonDocument("IsCool", false)));

            await user.RefreshCustomDataAsync();
            var cud = user.GetCustomData<CustomUserData>();

            Console.WriteLine($"User is cool: {cud.IsCool}");
            Console.WriteLine($"User's favorite color is {cud.FavoriteColor}");
            Console.WriteLine($"User's timezone is {cud.LocalTimeZone}");
            // :code-block-end:
            Assert.AreEqual(1, updateResult.ModifiedCount);
            Assert.IsFalse(cud.IsCool);
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            await cudCollection.DeleteManyAsync();
        }

    }

    // :code-block-start: cud
    public class CustomUserData
    {
        public string _id { get; private set; }

        public string FavoriteColor { get; set; }

        public string LocalTimeZone { get; set; }

        public bool IsCool { get; set; }

        public CustomUserData(string id)
        {
            this._id = id;
        }
    }
    // :code-block-end:
}