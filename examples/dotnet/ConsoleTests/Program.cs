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
        const string myRealmAppId = "codesnippetbackend-drcpb";

        //:snippet-start: async-console
        public static void Main(string[] args)
        {
            AsyncContext.Run(async () => await MainAsync(args));
        }

        private static async Task MainAsync(string[] args)
        {
            var app = App.Create(myRealmAppId);
            var user = await app.LogInAsync(Credentials.Anonymous());
            var config = new PartitionSyncConfiguration("partition", user);

            using var realm = await Realm.GetInstanceAsync();
            var foos = realm.All<TestClass>().Where(f => f.Bar > 5);
            foreach (var foo in foos)
            {
                await Task.Delay(10); // Simulates some background work
                Console.WriteLine(foo.Bar);
            }
            //:remove-start:
            await Task.Delay(10);
            //:remove-end:
        }
        //:snippet-end:
    }

    partial class TestClass : IRealmObject
    {
        public int Bar { get; set; }
    }
}
