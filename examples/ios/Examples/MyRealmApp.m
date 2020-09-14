//
//  MyRealmApp.m
//  RealmExamples
//
//  Created by Chris Bush on 2020-09-15.
//  Copyright © 2020 MongoDB, Inc. All rights reserved.
//

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
