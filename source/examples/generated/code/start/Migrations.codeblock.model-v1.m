// Version 1 had separate fields for first name and last name
@interface Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
@property int age;
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName"];
}
@end
