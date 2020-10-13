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
    public class AggregationExamples
    {
        App app;
        User user;
        SyncConfiguration config;
        const string myRealmAppId = "tuts-tijya";

        MongoClient mongoClient;
        MongoClient.Database dbPlantInventory;
        MongoClient.Collection<Plant> plantsCollection;

        Plant venus;
        Plant sweetBasil;
        Plant thaiBasil;
        Plant helianthus;
        Plant petunia;

        [OneTimeSetUp]
        public async Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("My Project", user);
            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbPlantInventory = mongoClient.GetDatabase("inventory");
            plantsCollection = dbPlantInventory.GetCollection<Plant>("plants");

            venus = new Plant
            {
                Name = "Venus Flytrap",
                Sunlight = Sunlight.full,
                Color = PlantColor.white,
                Type = PlantType.perennial,
                Partition = "Store 42"
            };
            sweetBasil = new Plant
            {
                Name = "Sweet Basil",
                Sunlight = Sunlight.partial,
                Color = PlantColor.green,
                Type = PlantType.annual,
                Partition = "Store 42"
            };
            thaiBasil = new Plant
            {
                Name = "Thai Basil",
                Sunlight = Sunlight.partial,
                Color = PlantColor.green,
                Type = PlantType.perennial,
                Partition = "Store 42"
            };
            helianthus = new Plant
            {
                Name = "Helianthus",
                Sunlight = Sunlight.full,
                Color = PlantColor.yellow,
                Type = PlantType.annual,
                Partition = "Store 42"
            };
            petunia = new Plant
            {
                Name = "Petunia",
                Sunlight = Sunlight.full,
                Color = PlantColor.purple,
                Type = PlantType.annual,
                Partition = "Store 47"
            };

            var listofPlants = new List<Plant>
            {
                venus,
                sweetBasil,
                thaiBasil,
                helianthus,
                petunia
            };

            var insertResult = await plantsCollection.InsertManyAsync(listofPlants);



            return;
        }

        [Test]
        public async Task GroupsAndCounts()
        {
            var pipeline = new object[] {
                new BsonDocument("$group",
                new BsonDocument
                    {
                        { "_id", "$Type" },
                        { "count",
                new BsonDocument("$sum", 1) }
                    }),
                new BsonDocument("$sort",
                new BsonDocument("_id", 1))
            };

            var aggResult = await plantsCollection.AggregateAsync(pipeline);

            Assert.AreEqual("_id=0", aggResult[0].GetElement("_id").ToString());
            Assert.AreEqual("count=2", aggResult[0].GetElement("count").ToString());
            Assert.AreEqual("_id=1", aggResult[1].GetElement("_id").ToString());
            Assert.AreEqual("count=3", aggResult[1].GetElement("count").ToString());

        }

        [Test]
        public async Task Filters()
        {
            var pipeline = new object[] {
                new BsonDocument("$match",
                    new BsonDocument("Type",
                        new BsonDocument("$eq", PlantType.perennial)))
            };

            var aggResult = await plantsCollection.AggregateAsync<Plant>(pipeline);

            Assert.AreEqual(2, aggResult.Length);
            Assert.AreEqual(venus.Id, aggResult[0].Id);
            Assert.AreEqual(venus.Name, aggResult[0].Name);
            Assert.AreEqual(thaiBasil.Id, aggResult[1].Id);
            Assert.AreEqual(thaiBasil.Partition, aggResult[1].Partition);
        }

        [Test]
        public async Task Projects()
        {
            var pipeline = new object[] {
                new BsonDocument("$project",
                new BsonDocument
                {
                    { "Partition", 1 },
                    { "Type", 1 },
                    { "Name", 1 },
                    { "StoreNumber",
                        new BsonDocument("$arrayElemAt",
                        new BsonArray {
                            new BsonDocument("$split",
                            new BsonArray
                                {
                                    "$Partition",
                                    " "
                                }), 1 }) }
                }),
                new BsonDocument("$project", new BsonDocument("Id", 0))
            };

            var aggResult = await plantsCollection.AggregateAsync(pipeline);

            Assert.AreEqual(5, aggResult.Length);
            Assert.Throws<KeyNotFoundException>(() => aggResult[0].GetElement("Id"));
            Assert.AreEqual("StoreNumber=42", aggResult[0].GetElement("StoreNumber").ToString());
        }

        [Test]
        public async Task UnwindsAfterALongDay()
        {
            var pipeline = new object[] {
                new BsonDocument("$project",
                new BsonDocument
                {
                    { "_id", 0 },
                    { "Partition", 1 },
                    { "Type", 1 },
                    { "Name", 1 },
                    { "StoreNumber",
                        new BsonDocument("$arrayElemAt",
                        new BsonArray {
                            new BsonDocument("$split",
                            new BsonArray
                                {
                                    "$Partition",
                                    " "
                                }), 1 }) }
                })
            };

            var aggResult = await plantsCollection.AggregateAsync(pipeline);

            Assert.AreEqual(5, aggResult.Length);
            Assert.Throws<KeyNotFoundException>(() => aggResult[0].GetElement("Id"));
            Assert.AreEqual("StoreNumber=42", aggResult[0].GetElement("StoreNumber").ToString());
        }
        [OneTimeTearDown]
        public async Task TearDown()
        {
            config = new SyncConfiguration("My Project", user);
            await plantsCollection.DeleteManyAsync();
            await user.LogOutAsync();

            return;
        }
    }
}