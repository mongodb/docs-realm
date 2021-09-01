using MongoDB.Bson;
using Realms;
using Realms.Sync;
using System.Threading.Tasks;

public class Cube
{

    class Entity : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        public int foo { get; set; }
    }

    private void Start()
    {
        // 1) CreateCopy();

        // 2) Copy the Realm file created by above function into the Assets folder (path will be printed to the console).

        // 3) ReadCopy();
    }

    private async void CreateCopy()
    {
        var app = App.Create("foo");
        var user = await app.LogInAsync(Credentials.Anonymous());
        var syncConfiguration = new SyncConfiguration("playground_partition_key", user, "");
        // :code-block-start: copy_a_realm_unity
        // Open an existing realm
        Realm realm = await Realm.GetInstanceAsync(syncConfiguration);

        // Create a RealmConfiguration for the *copy*
        RealmConfiguration copiedRealmCofiguration =
            new RealmConfiguration("copy.realm");

        // Make sure an existing copy hasn't already been created...
        Realm.DeleteRealm(copiedRealmCofiguration);
        // ...and then make a copy
        realm.WriteCopy(copiedRealmCofiguration);

        // You can find the new file location with DatabasePath:
        var fileLocation = copiedRealmCofiguration.DatabasePath;
        // :code-block-end:
    }

    private async void ReadCopy()
    {
        var app = App.Create("foo");
        var user = await app.LogInAsync(Credentials.Anonymous());
        // :code-block-start: read_a_realm_unity
        // After copying the above created file to the project folder,
        // we can access it in Applicatoin.dataPath:
        //:uncomment-start:
        //var realmPath = Application.dataPath + "/copy.realm";
        // // And then we open it like any other realm:
        //Realm realm = await Realm.GetInstanceAsync(realmPath);
        //:uncomment-end:
        // :code-block-end:

    }


}