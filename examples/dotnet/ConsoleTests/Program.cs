using System;
using System.Linq;
using System.Threading.Tasks;
using Nito.AsyncEx;
using Realms;
using Realms.Sync;

namespace ConsoleTests
{
    class Program
    {
        const string myRealmAppId = "tuts-tijya";

        //:code-block-start: async-console
        public static void Main(string[] args)
        {
            AsyncContext.Run(async () => await MainAsync(args));
        }

        private static async Task MainAsync(string[] args)
        {
            var app = App.Create(myRealmAppId);
            var user = await app.LogInAsync(Credentials.Anonymous());
            var config = new SyncConfiguration("partition", user);

            using var realm = await Realm.GetInstanceAsync();
            var foos = realm.All<Foo>().Where(f => f.Bar > 5);
            foreach (var foo in foos)
            {
                await Task.Delay(10); // Simulates some background work
                Console.WriteLine(foo.Bar);
            }
            //:hide-start:
            await Task.Delay(10);
            //:hide-end:
        }
        //:code-block-end:
    }

    class Foo : RealmObject
    {
        public int Bar { get; set; }
    }
}
