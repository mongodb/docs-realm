@interface Person : RLMObject
@property int ID;
@property NSString *name;
@property (readonly) RLMLinkingObjects *dogs;

@end

@implementation Person
+ (NSString *)primaryKey {
    return @"ID";
}
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"dogs": [RLMPropertyDescriptor descriptorWithClass:Dog.class propertyName:@"owner"],
    };
}
@end
