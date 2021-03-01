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

        [Test]
        public async Task WorkWithDictionaries()
        {
            var realm = Realm.GetInstance();

            var storeInventory = new Inventory();

            storeInventory.PlantDict.Add("whidbey", new Plant());

            realm.Write(() =>
            {
                realm.Add<Inventory>(storeInventory);
            });

            var foo = new SetStuff();
            foo.DoubleSet.Add(22.22);

        }
        //:code-block-start:sets
        public class SetStuff : RealmObject
        {
            // A Set can contain any Realm-supported type, including
            // objects that inherit from RealmObject
            public ISet<Plant> PlantSet { get; }

            public ISet<double> DoubleSet { get; }

            // nullable values are supported
            public ISet<int?> NullableIntsSet { get; }

            // For C# types that are implicitly nullable, you can
            // use the [Required] attribute to prevent storing null values
            [Required]
            public ISet<string> RequiredStrings { get; }
        }
        //:code-block-end:
        //:code-block-start:dictionaries
        public class Inventory : RealmObject
        {
            //:hide-start:
            public string Id { get; set; }
            //:hide-end:
            // The key must be of type string; the value
            // can be of any Realm-supported type, including
            // objects that inherit from RealmObject
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
    }
}