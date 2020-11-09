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

            // :code-block-start: mongo-setup
            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbPlantInventory = mongoClient.GetDatabase("inventory");
            plantsCollection = dbPlantInventory.GetCollection<Plant>("plants");
            // :code-block-end:

            await InsertsOne();
            await InsertsMany();
            return;
        }

        public async Task InsertsOne()
        {
            // :code-block-start: mongo-insert-one
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
            // :code-block-end:
            
        }
       
        public async Task InsertsMany()
        {
            // :code-block-start: mongo-insert-many
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
            // :code-block-end:
        }

        [Test]
        public async Task ReadsDocuments()
        {
            // :code-block-start: mongo-find-one
            var petunia = await plantsCollection.FindOneAsync(
               new { name = "Petunia" },
               null);
            // :code-block-end:
            Assert.AreEqual("Store 47", petunia.Partition);
            // :code-block-start: mongo-find-many
            var allPerennials = await plantsCollection.FindAsync(
                new {type = PlantType.Perennial.ToString() },
                new { name = 1 });
            // :code-block-end:
            Assert.AreEqual(2, allPerennials.Count());
            // :code-block-start: mongo-count
            var allPlants = await plantsCollection.CountAsync();
            // :code-block-end:
            Assert.AreEqual(5, allPlants);
        }

        [Test]
        public async Task UpdatesDocuments()
        {
            {
                // :code-block-start: mongo-update-one
                var updateResult = await plantsCollection.UpdateOneAsync(
                    new BsonDocument("sunlight", Sunlight.Partial.ToString()),
                    new { name = "Petunia" });
                // :code-block-end:
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                // :code-block-start: mongo-update-many
                var filter = new { _partition = "Store 47" };
                var updateDoc = new BsonDocument("$set",
                    new BsonDocument("_partition", "Area 51"));

                var updateResult = await plantsCollection.UpdateManyAsync(
                    filter, updateDoc);
                // :code-block-end:
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                // :code-block-start: mongo-upsert
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
                // :code-block-end:

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
                // :code-block-start: mongo-delete-one
                var filter = new BsonDocument("name", "Thai Basil");
                var deleteResult = await plantsCollection.DeleteOneAsync(filter);
                // :code-block-end:
            }
            {
                // :code-block-start: mongo-delete-many
                var filter = new BsonDocument("type", PlantType.Annual);
                var deleteResult = await plantsCollection.DeleteManyAsync(filter);
                // :code-block-end:
            }
            await plantsCollection.DeleteManyAsync();
            return;
        }
    }
}