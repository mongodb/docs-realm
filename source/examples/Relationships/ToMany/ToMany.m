@interface Person : RLMObject
@property NSString             *name;
@property NSDate               *birthdate;
@property RLMArray<Dog *><Dog> *dogs;
@end

@implementation Person
+ (NSArray *)requiredProperties {
    return @[@"name", @"birthdate"];
}
@end

@interface Dog : RLMObject
@property NSString *name;
@property NSInteger *age;
@property NSString *breed;
@end
RLM_ARRAY_TYPE(Dog) // define RLMArray<Dog>

@implementation Dog
+ (NSArray *)requiredProperties {
    return @[@"name", @"age"];
}
@end
