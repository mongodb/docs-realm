// :replace-start: {
//   "terms": {
//     "ObjectModelsExamplesObjc_": "",
//     "OptionalRequiredPropertyObjcExample_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :code-block-start: array-declaration
// ObjectModelsExamplesObjc_Task.h
@interface ObjectModelsExamplesObjc_Task : RLMObject
@property NSString *description;
@end

// Define an RLMArray<ObjectModelsExamplesObjc_Task> type
RLM_ARRAY_TYPE(ObjectModelsExamplesObjc_Task)


// ObjectModelsExamplesObjc_User.h
// #include "ObjectModelsExamplesObjc_Task.h"
@interface ObjectModelsExamplesObjc_User : RLMObject
@property NSString *name;
// Use RLMArray<ObjectModelsExamplesObjc_Task> to have a list of tasks
// Note the required double tag (<ObjectModelsExamplesObjc_Task *><ObjectModelsExamplesObjc_Task>)
@property RLMArray<ObjectModelsExamplesObjc_Task *><ObjectModelsExamplesObjc_Task> *tasks;
@end
// :remove-start:
// ObjectModelsExamplesObjc_Task.m
@implementation ObjectModelsExamplesObjc_Task
@end

// ObjectModelsExamplesObjc_User.m
@implementation ObjectModelsExamplesObjc_User
@end
// :remove-end:
// :code-block-end:

// :code-block-start: define-a-model
// A dog has an _id primary key, a string name, an optional
// string breed, and a date of birth.
@interface ObjectModelsExamplesObjc_Dog : RLMObject
@property RLMObjectId *_id;
@property NSString *name;
@property NSString *breed;
@property NSDate *dateOfBirth;
@end

@implementation ObjectModelsExamplesObjc_Dog
+ (NSString *)primaryKey {
    return @"_id";
}

+ (NSArray<NSString *> *)requiredProperties {
    return @[
        @"_id", @"name", @"dateOfBirth"
    ];
}
@end
// :code-block-end:

// :code-block-start: optional-required-properties
@interface OptionalRequiredPropertyObjcExample_Person : RLMObject
// Required property - included in `requiredProperties`
// return value array
@property NSString *name;

// Optional string property - not included in `requiredProperties`
@property NSString *address;

// Required numeric property
@property int ageYears;

// Optional numeric properties use NSNumber tagged
// with RLMInt, RLMFloat, etc.
@property NSNumber<RLMFloat> *heightCm;
@end

@implementation OptionalRequiredPropertyObjcExample_Person
// Specify required pointer-type properties here.
// Implicitly required properties (such as properties
// of primitive types) do not need to be named here.
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"name"];
}
@end
// :code-block-end:

// :code-block-start: specify-a-primary-key
@interface ObjectModelsExamplesObjc_Project : RLMObject
@property NSInteger id; // Intended primary key
@property NSString *name;
@end

@implementation ObjectModelsExamplesObjc_Project
// Return the name of the primary key property
+ (NSString *)primaryKey {
    return @"id";
}
@end
// :code-block-end:

// :code-block-start: index-a-property
@interface ObjectModelsExamplesObjc_Book : RLMObject
@property int priceCents;
@property NSString *title;
@end

@implementation ObjectModelsExamplesObjc_Book
// Return a list of indexed property names
+ (NSArray *)indexedProperties {
    return @[@"title"];
}
@end
// :code-block-end:

// :code-block-start: ignore-a-property
@interface ObjectModelsExamplesObjc_Person : RLMObject
@property NSInteger tmpId;
@property (readonly) NSString *name; // read-only properties are automatically ignored
@property NSString *firstName;
@property NSString *lastName;
@end

@implementation ObjectModelsExamplesObjc_Person
+ (NSArray *)ignoredProperties {
    return @[@"tmpId"];
}
- (NSString *)name {
    return [NSString stringWithFormat:@"%@ %@", self.firstName, self.lastName];
}
@end
// :code-block-end:

@interface ObjectModelsObjc : XCTestCase
@end

@implementation ObjectModelsObjc
@end

// :replace-end:
