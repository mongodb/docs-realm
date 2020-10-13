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
        public void Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("My Project", user);

            // :code-block-start: mongo-setup
            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbPlantInventory = mongoClient.GetDatabase("inventory");
            plantsCollection = dbPlantInventory.GetCollection<Plant>("plants");
            // :code-block-end:

            return;
        }

        [Test]
        public async Task InsertsOne()
        {
            // :code-block-start: mongo-insert-one
            var plant = new Plant
            {
                Name = "Venus Flytrap",
                Sunlight = Sunlight.full,
                Color = PlantColor.white,
                Type = PlantType.perennial,
                Partition = "Store 42"
            };

            var insertResult = await plantsCollection.InsertOneAsync(plant);
            var newId = insertResult.InsertedId;
            // :code-block-end:
            Assert.IsNotNull(plant.Id);
            Assert.AreEqual(newId, plant.Id);
        }
        [Test]
        public async Task InsertsMany()
        {
            // :code-block-start: mongo-insert-many
            var sweetBasil = new Plant
            {
                Name = "Sweet Basil",
                Sunlight = Sunlight.partial,
                Color = PlantColor.green,
                Type = PlantType.annual,
                Partition = "Store 42"
            };
            var thaiBasil = new Plant
            {
                Name = "Thai Basil",
                Sunlight = Sunlight.partial,
                Color = PlantColor.green,
                Type = PlantType.perennial,
                Partition = "Store 42"
            };
            var helianthus = new Plant
            {
                Name = "Helianthus",
                Sunlight = Sunlight.full,
                Color = PlantColor.yellow,
                Type = PlantType.annual,
                Partition = "Store 42"
            };
            var petunia = new Plant
            {
                Name = "Petunia",
                Sunlight = Sunlight.full,
                Color = PlantColor.purple,
                Type = PlantType.annual,
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

            Assert.AreEqual(newIds[0], sweetBasil.Id);
            Assert.AreEqual(newIds[1], thaiBasil.Id);
            Assert.AreEqual(newIds[2], helianthus.Id);
            Assert.AreEqual(newIds[3], petunia.Id);
        }

        [Test]
        public async Task ReadsDocuments()
        {
            // :code-block-start: mongo-find-one
            var petunia = await plantsCollection.FindOneAsync(
                new BsonDocument("Name", "Petunia"), null);
            // :code-block-end:
            Assert.AreEqual("Store 47", petunia.Partition);
            // :code-block-start: mongo-find-many
            var allPerennials = await plantsCollection.FindAsync(
                new BsonDocument("Type", PlantType.perennial), null);
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
                    new BsonDocument("Sunlight", Sunlight.partial),
                    new BsonDocument("Name", "Petunia"));
                // :code-block-end:
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                // :code-block-start: mongo-update-many
                var updateResult = await plantsCollection.UpdateManyAsync(
                    new BsonDocument("Partition", "Store 47"),
                    new BsonDocument("$set", new BsonDocument("Partition", "Area 51")));
                // :code-block-end:
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                // :code-block-start: mongo-upsert
                var filter = new BsonDocument("Name", "Pothos")
                    .Add("Type", PlantType.perennial)
                    .Add("Sunlight", Sunlight.full);

                var updateResult = await plantsCollection.UpdateOneAsync(
                    filter,
                    new BsonDocument("$set", new BsonDocument("Partition", "Store 42")),
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

                var plant = await plantsCollection.FindOneAsync(filter, null);
                Assert.AreEqual("Store 42", plant.Partition);
                Assert.AreEqual(plant.Id, updateResult.UpsertedId);
            }
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            config = new SyncConfiguration("My Project", user);
            using var realm = await Realm.GetInstanceAsync(config);
            {
                // :code-block-start: mongo-delete-one
                var filter = new BsonDocument("Name", "Thai Basil");
               // var deleteResult = await plantsCollection.DeleteOneAsync(filter);
                // :code-block-end:
            }
            {
                // :code-block-start: mongo-delete-many
                var filter = new BsonDocument("Type", PlantType.annual);
                //var deleteResult = await plantsCollection.DeleteManyAsync(filter);
                // :code-block-end:
            }
           // await plantsCollection.DeleteManyAsync();

           // await user.LogOutAsync();

            return;
        }
    }
}