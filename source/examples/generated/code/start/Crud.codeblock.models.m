// Person.h
@interface Person : RLMObject
@property NSNumber<RLMInt> *_id;
@property NSString *name;
@property (readonly) RLMLinkingObjects *dogs;
@end

// Dog.h
@interface Dog : RLMObject
@property NSString *name;
@property NSString *breed;
@property int age;
@property Person *owner;
@end

// Dog.m
@implementation Dog
@end

// Person.m
@implementation Person
+ (NSString *)primaryKey {
    return @"_id";
}
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"dogs": [RLMPropertyDescriptor descriptorWithClass:Dog.class propertyName:@"owner"],
    };
}
@end
