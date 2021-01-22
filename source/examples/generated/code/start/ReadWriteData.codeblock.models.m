@interface Dog : RLMObject
@property NSString *name;
@property NSInteger age;
@end

// Enable Dog for use in RLMArray
RLM_ARRAY_TYPE(Dog)

// A dog owner has a primary key ID, a collection of dogs, and can be a member of multiple clubs.
@interface DogOwner : RLMObject
@property NSInteger id;

// To-many relationship - a dog owner can have many dogs
@property RLMArray<Dog *><Dog> *dogs;

// Inverse relationship - an owner can be a member of many clubs
@property (readonly) RLMLinkingObjects *clubs;
@end

RLM_ARRAY_TYPE(DogOwner)

@interface DogClub : RLMObject
@property NSString *name;
@property RLMArray<DogOwner *><DogOwner> *members;
@end

@implementation Dog
@end

@implementation DogOwner
// Define the primary key for the class
+ (NSString *)primaryKey {
    return @"id";
}

// Define the inverse relationship to dog clubs
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"clubs": [RLMPropertyDescriptor descriptorWithClass:DogClub.class propertyName:@"members"],
    };
}
@end

@implementation DogClub
@end
