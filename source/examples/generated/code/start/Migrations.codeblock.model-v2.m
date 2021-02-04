// In the second version, the Person model has one
// combined field for the name. A migration will be required
// to convert from version 1 to version 2.
@interface Person : RLMObject
@property NSString *fullName;
@property int age;
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"fullName"];
}
@end
