// Define the embedded object
@interface Address : RLMEmbeddedObject
@property NSString *street;
@property NSString *city;
@property NSString *country;
@property NSString *postalCode;
@end

// Enable use in RLMArray
RLM_ARRAY_TYPE(Address)

@implementation Address
@end

// A Contact has one embedded address
@interface Contact : RLMObject
@property RLMObjectId *_id;
@property NSString *name;

// Define a single embedded object
@property Address *address;
@end

@implementation Contact
+ (NSString *)primaryKey {
    return @"_id";
}

+ (NSArray<NSString *> *)requiredProperties {
    return @[@"_id", @"name"];
}

+ (NSDictionary *)defaultPropertyValues {
    return @{@"_id": [RLMObjectId objectId]};
}

+ (instancetype)contactWithName:(NSString *)name {
    Contact *instance = [[Contact alloc] init];
    if (instance) {
        instance.name = name; 
    }
    return instance; 
}
@end

// A Business has multiple embedded addresses
@interface Business : RLMObject
@property RLMObjectId *_id;
@property NSString *name;
// Define an array of embedded objects
@property RLMArray<Address *><Address> *addresses;
@end

@implementation Business
+ (NSString *)primaryKey {
    return @"_id";
}

+ (NSArray<NSString *> *)requiredProperties {
    return @[@"_id", @"name"];
}
@end
