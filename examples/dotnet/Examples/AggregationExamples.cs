﻿using System;
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
            config = new SyncConfiguration("myPart", user);
            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbPlantInventory = mongoClient.GetDatabase("inventory");
            plantsCollection = dbPlantInventory.GetCollection<Plant>("plants");

            venus = new Plant
            {
                Name = "Venus Flytrap",
                Sunlight = Sunlight.Full,
                Color = PlantColor.White,
                Type = PlantType.Perennial,
                Partition = "Store 42"
            };
            sweetBasil = new Plant
            {
                Name = "Sweet Basil",
                Sunlight = Sunlight.Partial,
                Color = PlantColor.Green,
                Type = PlantType.Annual,
                Partition = "Store 42"
            };
            thaiBasil = new Plant
            {
                Name = "Thai Basil",
                Sunlight = Sunlight.Partial,
                Color = PlantColor.Green,
                Type = PlantType.Perennial,
                Partition = "Store 42"
            };
            helianthus = new Plant
            {
                Name = "Helianthus",
                Sunlight = Sunlight.Full,
                Color = PlantColor.Yellow,
                Type = PlantType.Annual,
                Partition = "Store 42"
            };
            petunia = new Plant
            {
                Name = "Petunia",
                Sunlight = Sunlight.Full,
                Color = PlantColor.Purple,
                Type = PlantType.Annual,
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
            // :code-block-start: agg_group
            var groupStage =
                new BsonDocument("$group",
                    new BsonDocument
                    {
                        { "_id", "$type" },
                        { "count", new BsonDocument("$sum", 1) }
                    });
            
            var sortStage = new BsonDocument("$sort",
                new BsonDocument("_id", 1));

            var aggResult = await plantsCollection.AggregateAsync(groupStage, sortStage);
            foreach (var item in aggResult)
            {
                var id = item["_id"];
                var count = item["count"];
                Console.WriteLine($"Plant type: {id}; count: {count}");
            }

            // :code-block-end:
            Assert.AreEqual(PlantType.Annual.ToString(), aggResult[0]["_id"] != null ? aggResult[0]["_id"].AsString : "null");
            Assert.AreEqual(PlantType.Perennial.ToString(), aggResult[1]["_id"].AsString);
            Assert.AreEqual(3, aggResult[0]["count"].AsInt32);
            Assert.AreEqual(2, aggResult[1]["count"].AsInt32);

            // :code-block-start: agg_group_alt
            var groupStep = BsonDocument.Parse(@"
              {
                $group: {
                  _id: '$type', 
                  count: {
                    $sum: 1
                  }
                }
              }
            ");

            var sortStep = BsonDocument.Parse("{$sort: { _id: 1}}");
            
            aggResult = await plantsCollection.AggregateAsync(groupStep, sortStep);
            foreach (var item in aggResult)
            {
                var id = item["_id"];
                var count = item["count"];
                Console.WriteLine($"Id: {id}, Count: {count}");
            }
            // :code-block-end:
            Assert.AreEqual(PlantType.Annual.ToString(), aggResult[0]["_id"].AsString);
            Assert.AreEqual(PlantType.Perennial.ToString(), aggResult[1]["_id"].AsString);
            Assert.AreEqual(3, aggResult[0]["count"].AsInt32);
            Assert.AreEqual(2, aggResult[1]["count"].AsInt32);
        }

        [Test]
        public async Task Filters()
        {
            // :code-block-start: agg_filter
            var matchStage = new BsonDocument("$match",
                    new BsonDocument("type",
                        new BsonDocument("$eq",
                            PlantType.Perennial)));

            // Alternate approach using BsonDocument.Parse(...)
            matchStage = BsonDocument.Parse(@"{
              $match: {
                type: { $eq: '" + PlantType.Perennial + @"' }
              }}");

            var sortStage = BsonDocument.Parse("{$sort: { _id: 1}}");

            var aggResult = await plantsCollection.AggregateAsync<Plant>(matchStage, sortStage);
            foreach (var plant in aggResult)
            {
                Console.WriteLine($"Plant Name: {plant.Name}, Color: {plant.Color}");
            }
            // :code-block-end:
            Assert.AreEqual(venus.Id, aggResult[0].Id);
            Assert.AreEqual(venus.Name, aggResult[0].Name);
            Assert.AreEqual(thaiBasil.Id, aggResult[1].Id);
            Assert.AreEqual(thaiBasil.Partition, aggResult[1].Partition);
        }

        [Test]
        public async Task Projects()
        {
            // :code-block-start: agg_project
            var projectStage = new BsonDocument("$project",
                new BsonDocument
                {
                    { "_id", 0 },
                    { "_partition", 1 },
                    { "type", 1 },
                    { "name", 1 },
                    { "storeNumber",
                        new BsonDocument("$arrayElemAt",
                            new BsonArray {
                                new BsonDocument("$split",
                                new BsonArray
                                {
                                    "$_partition",
                                    " "
                                }), 1 }) }
                });

            var sortStage = BsonDocument.Parse("{$sort: { storeNumber: 1}}");

            var aggResult = await plantsCollection.AggregateAsync(projectStage, sortStage);
            foreach (var item in aggResult)
            {
                Console.WriteLine($"{item["name"]} is in store #{item["storeNumber"]}.");
            }
            // :code-block-end:
            // :code-block-start: agg_project_alt
            projectStage = BsonDocument.Parse(@"
                {
                  _id:0,
                  _partition: 1,
                  type: 1,
                  name: 1,
                  storeNumber: {
                    $arrayElemAt: [
                      { $split:[
                        '$_partition', ' '
                        ]
                      }, 1 ]
                  }
                }");
            // :code-block-end:
            Assert.AreEqual(5, aggResult.Length);
            Assert.Throws<KeyNotFoundException>(() => aggResult[0].GetElement("_id"));
            Assert.AreEqual("storeNumber=42", aggResult[0].GetElement("storeNumber").ToString());
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            await plantsCollection.DeleteManyAsync();
            return;
        }
    }
}