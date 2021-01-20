@interface Example_Dog : RLMObject
@property NSString *name;
@property NSInteger age;
@end

// Enable Example_Dog for use in RLMArray
RLM_ARRAY_TYPE(Example_Dog)

// A dog owner has a primary key ID, a collection of dogs, and can be a member of multiple clubs.
@interface Example_DogOwner : RLMObject
@property NSInteger id;

// To-many relationship - a dog owner can have many dogs
@property RLMArray<Example_Dog *><Example_Dog> *dogs;

// Inverse relationship - an owner can be a member of many clubs
@property (readonly) RLMLinkingObjects *clubs;
@end

RLM_ARRAY_TYPE(Example_DogOwner)

@interface Example_DogClub : RLMObject
@property NSString *name;
@property RLMArray<Example_DogOwner *><Example_DogOwner> *members;
@end

@implementation Example_Dog
@end

@implementation Example_DogOwner
// Define the primary key for the class
+ (NSString *)primaryKey {
    return @"id";
}

// Define the inverse relationship to dog clubs
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"clubs": [RLMPropertyDescriptor descriptorWithClass:Example_DogClub.class propertyName:@"members"],
    };
}
@end

@implementation Example_DogClub
@end