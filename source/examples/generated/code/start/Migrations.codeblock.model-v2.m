// Version 2 now has one combined field for the name.
@interface Person : RLMObject
@property NSString *fullName;
@property int age;
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"fullName"];
}
@end
