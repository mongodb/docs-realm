using System;
using System.Linq;
using MongoDB.Bson;
using Realms;

namespace LocalOnly
{
    class Program
    {
        static ObjectId someGuitarId;

        static void Main(string[] args)
        {
            //:code-block-start:get-instance
            var realm = Realm.GetInstance();
            //:code-block-end:

            realm.Write(() =>
            {
                // :hide-start:
                var newGuitar =
                // :hide-end:
                realm.Add(new Guitar()
                {
                    Make = "Fender",
                    Model = "Stratocaster",
                    Price = 1234567.89,
                    Owner = "D. Gilmour"
                });
                // :hide-start:
                someGuitarId = newGuitar.Id;
                // :hide-end:
            });


            //:code-block-start:write
            realm.Write(() =>
            {
                // :hide-start:
                var newGuitar =
                // :hide-end:
                realm.Add(new Guitar()
                {
                    Make = "Gibson",
                    Model = "Les Paul Custom",
                    Price = 649.99,
                    Owner = "N. Young"
                });
                // :hide-start:
                someGuitarId = newGuitar.Id;
                // :hide-end:
            });
            //:code-block-end:
            //:code-block-start:read-filter-sort
            var allGuitars = realm.All<Guitar>();

            var lessExpensiveGuitars = realm.All<Guitar>().Where(g => g.Price < 400);

            var guitarsSortedByMake = realm.All<Guitar>().OrderBy(g => g.Make);

            var specifiGuitarById = realm.Find<Guitar>(someGuitarId);
            //:code-block-end:

            //:code-block-start:update
            var harrysStrat = realm.All<Guitar>().FirstOrDefault(
                g => g.Owner == "D. Gilmour"
                && g.Make == "Fender"
                && g.Model == "Stratocaster");

            realm.Write(() =>
            {
                harrysStrat.Price = 322.56;
            });
            //:code-block-end:

            //:code-block-start:delete
            var mostExpensiveGuitar = realm.All<Guitar>()
                .OrderByDescending(g => g.Price).First();

            realm.Write(() =>
            {
                realm.Remove(mostExpensiveGuitar);
            });
            //:code-block-end:

            //:code-block-start:collection-notifications
            // Watch for Guitar collection changes.
            var token = realm.All<Guitar>()
                .SubscribeForNotifications((sender, changes, error) =>
                {
                    foreach (var i in changes.DeletedIndices)
                    {
                        // ... handle deletions ...
                    }

                    foreach (var i in changes.InsertedIndices)
                    {
                        // ... handle insertions ...
                    }

                    foreach (var i in changes.NewModifiedIndices)
                    {
                        // ... handle modifications ...
                    }
                });

            // Later, when you no longer wish to receive notifications
            token.Dispose();
            //:code-block-end:


        }

        public void DeleteAndStartAgain()
        {
            //:code-block-start:delete-realm-file
            var config = new RealmConfiguration("FileWeThrowAway.realm");
            Realm.DeleteRealm(config);
            var freshRealm = Realm.GetInstance(config);
            //:code-block-end:
        }

        public void Subset()
        {
            //:code-block-start:subset
            var config = new RealmConfiguration()
            {
                ObjectClasses = new Type[]
                {
                    typeof(AClassWorthStoring),
                    typeof(AnotherClassWorthStoring)
                }
            };
            //:code-block-end:
        }

        public void InMemory()
        {
            //:code-block-start:in-memory
            var config = new InMemoryConfiguration("some-identifier");
            var realm = Realm.GetInstance(config);
            //:code-block-end:
        }


    }

    public class AClassWorthStoring : RealmObject
    {
        public string Id { get; set; }
    }
    public class AnotherClassWorthStoring : RealmObject
    {
        public string Id { get; set; }
    }
}