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

        [SetUp]
        public async Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("My Project", user);

            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbPlantInventory = mongoClient.GetDatabase("inventory");
            plantsCollection = dbPlantInventory.GetCollection<Plant>("plants");

            return;
        }

        [Test]
        public async Task InsertsOne()
        {
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
            Assert.IsNotNull(plant.Id);
            Assert.AreEqual(newId, plant.Id);
        }
        [Test]
        public async Task InsertsMany()
        {
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

            Assert.AreEqual(newIds[0], sweetBasil.Id);
            Assert.AreEqual(newIds[1], thaiBasil.Id);
            Assert.AreEqual(newIds[2], helianthus.Id);
            Assert.AreEqual(newIds[3], petunia.Id);
        }

        [Test]
        public async Task ReadsDocuments()
        {
            var petunia = await plantsCollection.FindOneAsync<Plant>(
                new BsonDocument("name", "petunia"), null);
            Assert.AreEqual(petunia.Partition, "Store 47");
            var allPerennials = await plantsCollection.FindAsync<Plant>(
                new BsonDocument("type", PlantType.perennial), null);
            Assert.AreEqual(2, allPerennials.Count());
            var allPlants = await plantsCollection.CountAsync();
            Assert.AreEqual(5, allPlants);
        }

        [Test]
        public async Task UpdatesDocuments()
        {
            {
                var updateResult = await plantsCollection.UpdateOneAsync(
                    new BsonDocument("name", "petunia"),
                    new BsonDocument("sunlight", Sunlight.partial));
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                var updateResult = await plantsCollection.UpdateManyAsync(
                 new BsonDocument("_partition", "store 47"),
                    new BsonDocument("_partition", "area 51"));
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                var filter = new BsonDocument("name", "Pothos")
                    .Add("type", PlantType.perennial)
                    .Add("sunlight", Sunlight.full);

                var updateResult = await plantsCollection.UpdateOneAsync(
                    filter,
                    new BsonDocument("_partition", "store 42"),
                    upsert: true);

                /* The upsert will create the following object:

                {
                   "name": "pothos",
                   "sunlight": "full",
                   "type": "perennial",
                   "_partition": "Store 42"
                }
                */

                var plant = await plantsCollection.FindOneAsync(filter, null);
                Assert.AreEqual("store 42", plant.Partition);
                Assert.AreEqual(plant.Id, updateResult.UpsertedId);
            }
        }

        [Test]
        public async Task AggregatesLikeAMadman()
        {

        }

        [TearDown]
        public async Task TearDown()
        {
            config = new SyncConfiguration("My Project", user);
            using var realm = await Realm.GetInstanceAsync(config);
            {
                var filter = new BsonDocument("name", "Thai Basil");
                var deleteResult = await plantsCollection.DeleteOneAsync(filter);
            }
            {
                var filter = new BsonDocument("type", PlantType.annual);
                var deleteResult = await plantsCollection.DeleteManyAsync(filter);
            }
            await plantsCollection.DeleteManyAsync();
            Assert.AreEqual(0, plantsCollection.CountAsync());

            await user.LogOutAsync();

            return;
        }
    }
}