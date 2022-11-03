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
            //:snippet-start:get-instance
            var realm = Realm.GetInstance();
            //:snippet-end:

            //:snippet-start:read-all
            var allGuitars = realm.All<Guitar>();
            //:snippet-end:

            //:snippet-start:write
            realm.Write(() =>
            {
                realm.Add(new Guitar()
                {
                    Make = "Gibson",
                    Model = "Les Paul Custom",
                    Price = 649.99,
                    Owner = "N. Young"
                });
            });
            //:snippet-end:
            //:snippet-start:read-filter
            var lessExpensiveGuitars = realm.All<Guitar>().Where(g => g.Price < 400);

            var guitarsSortedByMake = realm.All<Guitar>().OrderBy(g => g.Make);

            var specifiGuitarById = realm.Find<Guitar>(someGuitarId);
            //:snippet-end:

            //:snippet-start:update
            var davidsStrat = realm.All<Guitar>().FirstOrDefault(
                g => g.Owner == "D. Gilmour"
                && g.Make == "Fender"
                && g.Model == "Stratocaster");

            realm.Write(() =>
            {
                davidsStrat.Price = 1700345.56;
            });
            //:snippet-end:

            //:snippet-start:delete
            var mostExpensiveGuitar = realm.All<Guitar>()
                .OrderByDescending(g => g.Price).First();

            realm.Write(() =>
            {
                realm.Remove(mostExpensiveGuitar);
            });
            //:snippet-end:

            //:snippet-start:collection-notifications
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
            //:snippet-end:


        }

        public void DeleteAndStartAgain()
        {
            //:snippet-start:delete-realm-file
            var config = new RealmConfiguration("FileWeThrowAway.realm");
            Realm.DeleteRealm(config);
            var freshRealm = Realm.GetInstance(config);
            //:snippet-end:
        }
    }
}