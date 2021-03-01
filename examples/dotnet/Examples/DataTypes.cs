using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using Realms;

namespace Examples
{
    public class DataTypes
    {
        Realm realm;

        [Test]
        public async Task WorkWithDictionaries()
        {
            if (realm == null) realm = Realm.GetInstance();

            var storeInventory = new Inventory();

            storeInventory.PlantDict.Add("Petunia", new Plant());
            storeInventory.NullableIntDict.Add("things", 7);
            storeInventory.RequiredStringsDict.Add("foo", "bar");

            var storeInventory2 = new Inventory();

            storeInventory2.RequiredStringsDict.Add("foo", "Bar");


            realm.Write(() =>
            {
                realm.Add<Inventory>(storeInventory);
                realm.Add<Inventory>(storeInventory2);
            });

            //:code-block-start:query-dictionaries
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


            //:code-block-end:

            Assert.IsNotNull(petunias);
            Assert.IsNotNull(matchesMoreThanFive);
            Assert.AreEqual(2, matches.Count());
        }
        [Test]
        public async Task WorkWithSets()
        {
            if (realm == null) realm = Realm.GetInstance();

            var pi = new PlantInventory();
            pi.PlantSet.Add(new Plant() { Name = "Prickly Pear" });
            pi.DoubleSet.Add(123.45);

            realm.Write(() =>
            {
                realm.Add<PlantInventory>(pi);
            });

            //:code-block-start:query-sets
            //:replace-start: {
            //  "terms": {
            //   "PlantInventory": "Inventory"}
            // }
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
            if (realm == null) realm = Realm.GetInstance();
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
            // A Set can contain any Realm-supported type, including
            // objects that inherit from RealmObject or EmbeddedObject
            public ISet<Plant> PlantSet { get; }

            public ISet<double> DoubleSet { get; }

            // nullable values are supported
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
            public string Id { get; set; }
            //:hide-end:
            // The key must be of type string; the value can be 
            // of any Realm-supported type, including objects
            // that inherit from RealmObject or EmbeddedObject
            public IDictionary<string, Plant> PlantDict { get; }

            public IDictionary<string, bool> BooleansDict { get; }

            // Nullable types are supported
            public IDictionary<string, int?> NullableIntDict { get; }

            // For C# types that are implicitly nullable, you can
            // use the [Required] attribute to prevent storing null values
            [Required]
            public IDictionary<string, string> RequiredStringsDict { get; }
        }
        //:code-block-end:

        public class ListInventory : RealmObject
        {

            public IList<Plant> Plants { get; }
        }
    }
}