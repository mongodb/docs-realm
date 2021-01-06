// CrudExampleObjc_Person.h
@interface CrudExampleObjc_Person : RLMObject
@property NSNumber<RLMInt> *_id;
@property NSString *name;
@property (readonly) RLMLinkingObjects *dogs;
@end

// CrudExampleObjc_Dog.h
@interface CrudExampleObjc_Dog : RLMObject
@property NSString *name;
@property NSString *breed;
@property int age;
@property CrudExampleObjc_Person *owner;
@end

// CrudExampleObjc_Dog.m
@implementation CrudExampleObjc_Dog
@end

// CrudExampleObjc_Person.m
@implementation CrudExampleObjc_Person
+ (NSString *)primaryKey {
    return @"_id";
}
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"dogs": [RLMPropertyDescriptor descriptorWithClass:CrudExampleObjc_Dog.class propertyName:@"owner"],
    };
}
@end