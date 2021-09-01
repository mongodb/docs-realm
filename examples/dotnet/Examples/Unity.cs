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
        var syncConfiguration = new SyncConfiguration("partition_key", user, "");
        // :code-block-start: copy_a_realm_unity
        // Open an existing realm
        Realm realm = Realm.GetInstance(syncConfiguration);

        // Create a RealmConfiguration for the *copy*
        RealmConfiguration copiedRealmCofiguration =
            new RealmConfiguration("bundle.realm");

        // Make sure an existing copy hasn't already been created...
        Realm.DeleteRealm(copiedRealmCofiguration);
        // ...and then make a copy
        realm.WriteCopy(copiedRealmCofiguration);

        // You can find the new file location with DatabasePath:
        var fileLocation = copiedRealmCofiguration.DatabasePath;
        // :code-block-end:
    }




}