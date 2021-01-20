using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examples;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace UnitTests
{
    public class MongoDBExamples
    {
        App app;
        User user;
        SyncConfiguration config;
        const string myRealmAppId = "tuts-tijya";

        MongoClient mongoClient;
        MongoClient.Database dbPlantInventory;
        MongoClient.Collection<Plant> plantsCollection;

        [OneTimeSetUp]
        public async Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = await app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar"));
            config = new SyncConfiguration("myPart", user);

            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbPlantInventory = mongoClient.GetDatabase("inventory");
            plantsCollection = dbPlantInventory.GetCollection<Plant>("plants");

            await InsertsOne();
            await InsertsMany();
            return;
        }

        public async Task InsertsOne()
        {
            var plant = new Plant
            {
                Name = "Venus Flytrap",
                Sunlight = Sunlight.Full,
                Color = PlantColor.White,
                Type = PlantType.Perennial,
                Partition = "Store 42"
            };

            var insertResult = await plantsCollection.InsertOneAsync(plant);
            var newId = insertResult.InsertedId;
            
        }
       
        public async Task InsertsMany()
        {
            var sweetBasil = new Plant
            {
                Name = "Sweet Basil",
                Sunlight = Sunlight.Partial,
                Color = PlantColor.Green,
                Type = PlantType.Annual,
                Partition = "Store 42"
            };
            var thaiBasil = new Plant
            {
                Name = "Thai Basil",
                Sunlight = Sunlight.Partial,
                Color = PlantColor.Green,
                Type = PlantType.Perennial,
                Partition = "Store 42"
            };
            var helianthus = new Plant
            {
                Name = "Helianthus",
                Sunlight = Sunlight.Full,
                Color = PlantColor.Yellow,
                Type = PlantType.Annual,
                Partition = "Store 42"
            };
            var petunia = new Plant
            {
                Name = "Petunia",
                Sunlight = Sunlight.Full,
                Color = PlantColor.Purple,
                Type = PlantType.Annual,
                Partition = "Store 47"
            };

            var listofPlants = new List<Plant>
            {
                sweetBasil,
                thaiBasil,
                helianthus,
                petunia
            };

            var insertResult = await plantsCollection.InsertManyAsync(listofPlants);
            var newIds = insertResult.InsertedIds;
        }

        [Test]
        public async Task ReadsDocuments()
        {
            var petunia = await plantsCollection.FindOneAsync(
               new { name = "Petunia" },
               null);
            Assert.AreEqual("Store 47", petunia.Partition);
            var allPerennials = await plantsCollection.FindAsync(
                new {type = PlantType.Perennial.ToString() },
                new { name = 1 });
            Assert.AreEqual(2, allPerennials.Count());
            var allPlants = await plantsCollection.CountAsync();
            Assert.AreEqual(5, allPlants);
        }

        [Test]
        public async Task UpdatesDocuments()
        {
            {
                var updateResult = await plantsCollection.UpdateOneAsync(
                    new BsonDocument("sunlight", Sunlight.Partial.ToString()),
                    new { name = "Petunia" });
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                var filter = new { _partition = "Store 47" };
                var updateDoc = new BsonDocument("$set",
                    new BsonDocument("_partition", "Area 51"));

                var updateResult = await plantsCollection.UpdateManyAsync(
                    filter, updateDoc);
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                var filter = new BsonDocument()
                    .Add("name", "Pothos")
                    .Add("type", PlantType.Perennial)
                    .Add("sunlight", Sunlight.Full);

                var updateResult = await plantsCollection.UpdateOneAsync(
                    filter,
                    new BsonDocument("$set", new BsonDocument("_partition", "Store 42")),
                    upsert: true);

                /* The upsert will create the following object:

                {
                   "name": "pothos",
                   "sunlight": "full",
                   "type": "perennial",
                   "_partition": "Store 42"
                }
                */

                var plant = await plantsCollection.FindOneAsync(filter);
                Assert.AreEqual("Store 42", plant.Partition);
                Assert.AreEqual(plant.Id, updateResult.UpsertedId);
            }
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            config = new SyncConfiguration("myPart", user);
            using var realm = await Realm.GetInstanceAsync(config);
            {
                var filter = new BsonDocument("name", "Thai Basil");
                var deleteResult = await plantsCollection.DeleteOneAsync(filter);
            }
            {
                var filter = new BsonDocument("type", PlantType.Annual);
                var deleteResult = await plantsCollection.DeleteManyAsync(filter);
            }
            await plantsCollection.DeleteManyAsync();
            return;
        }
    }
}