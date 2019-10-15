@interface Person : RLMObject
@property NSString             *name;
@property NSDate               *birthdate;
@property RLMArray<Dog *><Dog> *dogs;
@end
RLM_ARRAY_TYPE(Person) // define RLMArray<Person>

@implementation Person
// None required
@end

@interface Dog : RLMObject
@property NSString *name;
@property NSInteger *age;
@property NSString *breed;
@property Person   *owner;
@end
RLM_ARRAY_TYPE(Dog) // define RLMArray<Dog>

@implementation Dog
+ (NSArray *)requiredProperties {
    return @[@"name", @"age"];
}
@end
