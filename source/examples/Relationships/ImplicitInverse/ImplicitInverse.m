@interface Person : RLMObject
@property NSString             *name;
@property NSDate               *birthdate;
@property RLMArray<Dog *><Dog> *dogs;
@end
RLM_ARRAY_TYPE(Person) // define RLMArray<Person>

@implementation Person
+ (NSArray *)requiredProperties {
    return @[@"name", @"birthdate"];
}
@end

@interface Dog : RLMObject
@property NSString *name;
@property NSInteger *age;
@property NSString *breed;
@property (readonly) RLMLinkingObjects *owners;
@end
RLM_ARRAY_TYPE(Dog) // define RLMArray<Dog>

@implementation Dog
+ (NSArray *)requiredProperties {
    return @[@"name", @"age"];
}
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"owners": [RLMPropertyDescriptor descriptorWithClass:Person.class propertyName:@"dogs"],
    };
}
@end
