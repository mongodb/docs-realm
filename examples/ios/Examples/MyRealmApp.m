#import "MyRealmApp.h"

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
