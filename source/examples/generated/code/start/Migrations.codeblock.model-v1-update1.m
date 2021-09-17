// In a new version, you add a property
// on the Person model.
@interface Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
@property NSString *email;
@property int age;
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName", @"email", @"age"];
}
@end
