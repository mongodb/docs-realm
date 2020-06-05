@interface Person : RLMObject
@property RLMObjectId *_id;
@property NSString *name;
@property (readonly) RLMLinkingObjects *dogs;
@end

@implementation Person
+ (NSString *)primaryKey {
    return @"_id";
}
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"dogs": [RLMPropertyDescriptor descriptorWithClass:Dog.class propertyName:@"owner"],
    };
}
- (instancetype)init {
    if ((self = [super init])) {
        self._id = [RLMObjectId objectId];
    }
    return self;
}
@end
