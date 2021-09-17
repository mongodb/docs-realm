// In a new version, you remove a property
// on the Person model.
@interface Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName"];
}
@end
