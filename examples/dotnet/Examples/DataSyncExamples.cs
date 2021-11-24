using Realms;
using Realms.Sync;

namespace Examples
{
    public class DataSyncExamples
    {
        Realm realm;

        public void TestsCustomSetter()
        {
            // :code-block-start: pause-synced-realm
            var session = realm.GetSession();
            session.Stop();
            //later...
            session.Start();
            // :code-block-end:
        }
    }
}
