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
