@interface User : RLMObject
@property ObjectId               *_id;
@property NSString               *_partition;
@property NSString               *name;
@property RLMArray<Task *><Task> *tasks;
@end
RLM_ARRAY_TYPE(User) // define RLMArray<User>

@implementation User
+ (NSString *)primaryKey {
    return @"_id";
}
+ (NSArray *)requiredProperties {
    return @[@"_id", @"_partition", @"name"];
}
@end

@interface Task : RLMObject
@property ObjectId                     *_id;
@property NSString                     *_partition;
@property NSString                     *text;
@property (readonly) RLMLinkingObjects *assignee;
@end
RLM_ARRAY_TYPE(Task) // define RLMArray<Task>

@implementation Task
+ (NSString *)primaryKey {
    return @"_id";
}
+ (NSArray *)requiredProperties {
    return @[@"_id", @"_partition", @"text"];
}
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"assignee": [RLMPropertyDescriptor descriptorWithClass:User.class propertyName:@"tasks"],
    };
}
@end
