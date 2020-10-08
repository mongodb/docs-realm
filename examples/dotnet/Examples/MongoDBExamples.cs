using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using dotnet;
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
        ObjectId testTaskId;
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

            /*[{"name": "venus flytrap", "sunlight": "full", "color": "white", "type": "perennial", "_partition": "Store 42"},
{"name": "sweet basil", "sunlight": "partial", "color": "green", "type": "annual", "_partition": "Store 42"},
{"name": "thai basil", "sunlight": "partial", "color": "green", "type": "perennial", "_partition": "Store 42"},
{"name": "helianthus", "sunlight": "full", "color": "yellow", "type": "annual", "_partition": "Store 42"},
{"name": "petunia", "sunlight": "full", "color": "purple", "type": "annual", "_partition": "Store 47"}]*/



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
            Assert.IsNotNull(plant.Id);
            Assert.AreEqual(newId, plant.Id);
            // :code-block-end:
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
            var petunia = await plantsCollection.FindOneAsync<Plant>(
                new BsonDocument("name", "petunia"), null);
            // :code-block-end:
            Assert.AreEqual(petunia.Partition, "Store 47");
            // :code-block-start: mongo-find-many
            var allPerennials = await plantsCollection.FindAsync<Plant>(
                new BsonDocument("type", PlantType.perennial), null);
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

        }

        [TearDown]
        public async Task TearDown()
        {
            config = new SyncConfiguration("My Project", user);
            using (var realm = await Realm.GetInstanceAsync(config))
            {
                realm.Write(() =>
                {
                    realm.RemoveAll<RealmTask>();
                });
    
                await user.LogOutAsync();
            }
            return;
        }
    }
}