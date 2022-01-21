using System;
namespace Examples
{
    public class FlexibleSyncExamples
    {
        // [Test]
        public FlexibleSyncExamples()
        {
            // :code-block-start: open-a-flexible-synced-realm
            var config = new FlexibleSyncConfiguration(app.CurrentUser);
            //var realm = Realm.GetInstance(config);
            // :code-block-end: 
        }
    }
}