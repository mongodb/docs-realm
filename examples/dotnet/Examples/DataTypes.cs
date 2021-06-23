using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;

namespace Examples
{
    public class DataTypes
    {
        Realm realm;

        [OneTimeSetUp]
        public void Init()
        {
            var config = new InMemoryConfiguration("borkbork");
            realm = Realm.GetInstance(config);
        }

        [Test]
        public void Increment()
        {
            var mrc = new MyRealmClass()
            {
                Counter = 0
            };

            realm.Write(() =>
            {
                realm.Add(mrc);
            });

            var id = mrc._id;
            //:code-block-start:realmint-use
            var myObject = realm.Find<MyRealmClass>(id);
            // myObject.Counter == 0

            realm.Write(() =>
            {
                // Increment the value of the RealmInteger
                myObject.Counter.Increment(); // 1
                myObject.Counter.Increment(5); // 6

                //:hide-start:
                Assert.AreEqual(6, myObject.Counter);
                //:hide-end:
                // Decrement the value of the RealmInteger
                // Note the use of Increment with a negative number
                myObject.Counter.Decrement(); // 5
                //:hide-start:
                Assert.AreEqual(5, myObject.Counter);
                //:hide-end:
                myObject.Counter.Increment(-3); // 2
                //:hide-start:
                Assert.AreEqual(2, myObject.Counter);
                //:hide-end:

                // Reset the RealmInteger
                myObject.Counter = 0;

                // RealmInteger<T> is implicitly convertable to T:
                int bar = myObject.Counter;
            });
            //:code-block-end:
            Assert.AreEqual(0, myObject.Counter);
        }

        [Test]
        public async Task WorkWithDictionaries()
        {
            if (realm == null) realm = await Realm.GetInstanceAsync();
            //:code-block-start:query-dictionaries
            var storeInventory = new Inventory()
            {
                Id = ObjectId.GenerateNewId().ToString()
            };

            storeInventory.PlantDict.Add("Petunia", new Plant());
            storeInventory.NullableIntDict.Add("random things", 7);
            storeInventory.RequiredStringsDict.Add("foo", "bar");

            var storeInventory2 = new Inventory()
            {
                Id = ObjectId.GenerateNewId().ToString()
            };

            storeInventory2.RequiredStringsDict.Add("foo", "Bar");

            realm.Write(() =>
            {
                realm.Add<Inventory>(storeInventory);
                realm.Add<Inventory>(storeInventory2);
            });

            // Find all Inventory items that have "Petunia"
            // as a key in their PlantDict.
            var petunias = realm.All<Inventory>()
                .Filter("PlantDict.@keys == 'Petunia'");

            // Find all Inventory items that have at least one value in their
            // IntDict that is larger than 5
            var matchesMoreThanFive = realm.All<Inventory>()
                .Filter("NullableIntDict.@values > 5");

            // Find all Inventory items where any RequiredStringsDict has a key
            // "Foo", and the value of that key contains the phrase "bar"
            // (case insensitive)
            var matches = realm.All<Inventory>().Filter("RequiredStringsDict['foo'] CONTAINS[c] 'bar'");
            // matches.Count() == 2

            //:code-block-end:

            Assert.IsNotNull(petunias);
            Assert.IsNotNull(matchesMoreThanFive);
            Assert.AreEqual(2, matches.Count());
        }

        [Test]
        public async Task WorkWithSets()
        {
            if (realm == null) realm = await Realm.GetInstanceAsync();

            //:code-block-start:query-sets
            //:replace-start: {
            //  "terms": {
            //   "PlantInventory": "Inventory"}
            // }
            var inventory = new PlantInventory();
            inventory.PlantSet.Add(new Plant() { Name = "Prickly Pear" });
            inventory.DoubleSet.Add(123.45);

            realm.Write(() =>
            {
                realm.Add<PlantInventory>(inventory);
            });

            // Find all Plants that have "Prickly Pear" in the name
            var pricklyPear = realm.All<PlantInventory>()
                .Filter("PlantSet.Name CONTAINS 'Prickly Pear'");

            // Find all Inventory items that have at least one value in their
            // IntDict that is larger than 5
            var moreThan100 = realm.All<PlantInventory>()
                .Filter("DoubleSet.@values > 100");
            // :replace-end:
            //:code-block-end:

            Assert.IsNotNull(pricklyPear);
            Assert.IsNotNull(moreThan100);
        }
        [Test]
        public async Task WorkWithLists()
        {
            if (realm == null) realm = await Realm.GetInstanceAsync();
            var li = new ListInventory();
            li.Plants.Add(new Plant() { Name = "Prickly Pear", Color = PlantColor.Green.ToString() });
            realm.Write(() =>
            {
                realm.Add<ListInventory>(li);
            });

            //:code-block-start:query-lists
            //:replace-start: {
            //  "terms": {
            //   "ListInventory": "Inventory"}
            // }
            // Find all Inventory items that have a name of "Prickly Pear"
            var certainCacti = realm.All<ListInventory>().Filter("Plants.Name == 'Prickly Pear'");

            // Find all Inventory items that have a name of "Prickly Pear"
            var greenPlants = realm.All<ListInventory>().Filter("Plants.Color CONTAINS[c] 'Green'");
            // :replace-end:
            //:code-block-end:

            Assert.IsNotNull(certainCacti);
            Assert.AreEqual(1, greenPlants.Count());
        }

        [Test]
        public async Task RealmValueTests()
        {
            //:code-block-start:realmValues
            // CS0029 - Cannot implicitly convert type:
            // :uncomment-start:
            // RealmValue myList = new List<Inventory>();
            // :uncomment-end:

            // These are valid uses of RealmValue:
            var rvList = new List<RealmValue>();
            var rvDict = new Dictionary<string, RealmValue>();
            //:code-block-end:
        }

        [TearDown]
        public void TearDown()
        {
            realm.Write(() =>
            {
                realm.RemoveAll<Inventory>();
                realm.RemoveAll<PlantInventory>();
                realm.RemoveAll<ListInventory>();
            });

        }

        //:code-block-start:sets
        //:replace-start: {
        //  "terms": {
        //   "PlantInventory": "Inventory"}
        // }
        public class PlantInventory : RealmObject
        {
            //:hide-start:
            [PrimaryKey]
            [MapTo("_id")]
            [Required]
            public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
            //:hide-end:
            // A Set can contain any Realm-supported type, including
            // objects that inherit from RealmObject
            public ISet<Plant> PlantSet { get; }

            public ISet<double> DoubleSet { get; }

            // Nullable types are supported in local-only
            // Realms, but not with Sync
            public ISet<int?> NullableIntsSet { get; }

            // For C# types that are implicitly nullable, you can
            // use the [Required] attribute to prevent storing null values
            [Required]
            public ISet<string> RequiredStrings { get; }
        }
        // :replace-end:
        //:code-block-end:

        //:code-block-start:dictionaries

        public class Inventory : RealmObject
        {
            //:hide-start:
            [PrimaryKey]
            [MapTo("_id")]
            public string Id { get; set; }
            //:hide-end:
            // The key must be of type string; the value can be 
            // of any Realm-supported type, including objects
            // that inherit from RealmObject or EmbeddedObject
            public IDictionary<string, Plant> PlantDict { get; }

            public IDictionary<string, bool> BooleansDict { get; }

            // Nullable types are supported in local-only
            // Realms, but not with Sync
            public IDictionary<string, int?> NullableIntDict { get; }

            // For C# types that are implicitly nullable, you can
            // use the [Required] attribute to prevent storing null values
            [Required]
            public IDictionary<string, string> RequiredStringsDict { get; }
        }
        //:code-block-end:

        public class ListInventory : RealmObject
        {
            //:hide-start:
            [PrimaryKey]
            [MapTo("_id")]
            public string Id { get; set; }
            //:hide-end:
            public IList<Plant> Plants { get; }
        }


        //:code-block-start:realmvalue
        public class MyRealmValueObject : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public Guid Id { get; set; }

            public RealmValue MyValue { get; set; }

            // A nullable RealmValue preoprtrty is *not supported*
            // public RealmValue? NullableRealmValueNotAllowed { get; set; }
        }

        private void TestRealmValue()
        {
            var obj = new MyRealmValueObject();

            // set the value to null:
            obj.MyValue = RealmValue.Null;

            // or an int...
            obj.MyValue = 1;

            // or a string...
            obj.MyValue = "abc";

            // Use RealmValueType to check the type:
            if (obj.MyValue.Type == RealmValueType.String)
            {
                var myString = obj.MyValue.AsString();
            }
        }
        //:code-block-end:
    }

    // :code-block-start:realmint-class
    public class MyRealmClass : RealmObject
    {
        [PrimaryKey]
        public int _id { get; set; }
        public RealmInteger<int> Counter { get; set; }
    }
    // :code-block-end:
}
