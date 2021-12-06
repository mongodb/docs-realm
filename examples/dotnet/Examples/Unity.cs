using MongoDB.Bson;
using Realms;
using Realms.Sync;
using System.IO;
using System.Threading.Tasks;

public class Cube
{
    private async void ReadCopy()
    {
        var app = App.Create("foo");
        var user = await app.LogInAsync(Credentials.Anonymous());
        // :code-block-start: read_a_realm_unity
        // After copying the above created file to the project folder,
        // we can access it in Application.dataPath:
        //:uncomment-start:
        //var realmPath = Path.Combine(Application.dataPath, "bundled.realm");
        //var config = RealmConfiguration.DefaultConfiguration;
        //if (!File.Exists(config.DatabasePath))
        //{
        //    FileUtil.CopyFileOrDirectory(Path.Combine(Application.dataPath, "bundled.realm"), config.DatabasePath);
        //}
        //
        //// If you are using a local Realm
        //var realm = Realm.GetInstance(config);
        //
        //// If the realm is synced realm
        //var app = App.Create("myRealmAppId");
        //var user = await app.LogInAsync(Credentials.Anonymous());
        //config = new SyncConfiguration("myPartition", user);
        //
        //var realm = await Realm.GetInstanceAsync(config);
        //:uncomment-end:
        // :code-block-end:
    }
}