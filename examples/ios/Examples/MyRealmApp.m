#import "MyRealmApp.h"
// :code-block-start: import-realm
#include <Realm/Realm.h>
// :code-block-end:
@implementation MyRealmApp

+ (RLMApp *)app {
    static RLMApp *app = nil;
    @synchronized(self) {
        if (app == nil) { 
            app = [RLMApp appWithId:YOUR_REALM_APP_ID];
        }
    }
    return app;    
}

@end
