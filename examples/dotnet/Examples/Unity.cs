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
        // // And then we open it like any other realm:
        //Realm realm = await Realm.GetInstanceAsync(realmPath);
        //:uncomment-end:
        // :code-block-end:
    }
}