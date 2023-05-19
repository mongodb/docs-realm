using Realms;
using Realms.Sync;

namespace Examples
{
    public class DataSyncExamples
    {
        Realm realm;

        public void TestsCustomSetter()
        {
            realm = Realm.GetInstance();
            // :snippet-start: pause-synced-realm
            var session = realm.SyncSession;
            session.Stop();
            //later...
            session.Start();
            // :snippet-end:
        }
    }
}
