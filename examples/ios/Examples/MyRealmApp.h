//
//  getApp.h
//  RealmExamples
//
//  Created by Chris Bush on 2020-09-15.
//  Copyright © 2020 MongoDB, Inc. All rights reserved.
//

#ifndef RealmApp_h
#define RealmApp_h

#include <Realm/Realm.h>

static NSString *YOUR_REALM_APP_ID = @"example-testers-kvjdy";

@interface MyRealmApp : NSObject

+ (RLMApp *)app;

@end

#endif /* RealmApp_h */
