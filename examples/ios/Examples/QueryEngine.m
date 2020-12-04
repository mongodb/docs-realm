#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :code-block-start: models
// Task.h
@interface QueryEngineExamplesObjc_Task : RLMObject
@property NSString *name;
@property bool isComplete;
@property NSString *assignee;
@property int priority;
@property int progressMinutes;
@end
RLM_ARRAY_TYPE(QueryEngineExamplesObjc_Task)
// Task.m
@implementation QueryEngineExamplesObjc_Task
@end

// Project.h
@interface QueryEngineExamplesObjc_Project : RLMObject
@property NSString *name;
@property RLMArray<QueryEngineExamplesObjc_Task> *tasks;
@end
// Project.m
@implementation QueryEngineExamplesObjc_Project
@end
// :code-block-end:

// Be sure to differentiate test cases between Swift/Obj-C, or else
// the test explorer will get confused.
@interface QueryEngineObjc : XCTestCase

@end

@implementation QueryEngineObjc

- (void)tearDown {
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^() {
        [realm deleteAllObjects];
    }];
}

- (void)testPredicates {
    // :code-block-start: predicates
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"progressMinutes > %@ AND name == %@", @1, @"Ali"];
    // :code-block-end:
    
    // :code-block-start: substitutions
    [NSPredicate predicateWithFormat:@"%K > %@ AND %K == %@", @"progressMinutes", @1, @"name", @"Ali"];
    // :code-block-end:
}

- (void)testFilters {
    // :code-block-start: setup
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^() {
        // Add projects and tasks here
    }];
    
    RLMResults *tasks = [QueryEngineExamplesObjc_Task allObjectsInRealm:realm];
    RLMResults *projects = [QueryEngineExamplesObjc_Project allObjectsInRealm:realm];
    // :code-block-end:
    
    // :code-block-start: comparison-operators
    NSLog(@"High priority tasks: %lu",
          [[tasks objectsWithPredicate:[NSPredicate predicateWithFormat:@"priority > %@", @5]] count]);

    NSLog(@"Short running tasks: %lu",
          [[tasks objectsWhere:@"progressMinutes between {1, 15}"] count]);

    NSLog(@"Unassigned tasks: %lu",
          [[tasks objectsWhere:@"assignee == nil"] count]);

    NSLog(@"Ali or Jamie's tasks: %lu",
          [[tasks objectsWhere:@"assignee IN {'Ali', 'Jamie'}"] count]);
    
    NSLog(@"Tasks with progress between 30 and 60 minutes: %lu",
          [[tasks objectsWhere:@"progressMinutes BETWEEN {30, 60}"] count]);
    
    // :code-block-end:

    // :code-block-start: logical-operators
    NSLog(@"Ali's complete tasks: %lu",
      [[tasks objectsWhere:@"assignee == 'Ali' AND isComplete == true"] count]);
    // :code-block-end:
    
    // :code-block-start: string-operators
    // Use [c] for case-insensitivity.
    NSLog(@"Projects that start with 'e': %lu",
      [[projects objectsWhere:@"name BEGINSWITH[c] 'e'"] count]);

    NSLog(@"Projects that contain 'ie': %lu",
      [[projects objectsWhere:@"name CONTAINS 'ie'"] count]);
    // :code-block-end:
    
    // :code-block-start: aggregate-operators
    NSLog(@"Projects with average tasks priority above 5: %lu",
      [[projects objectsWhere:@"tasks.@avg.priority > 5"] count]);

    NSLog(@"Long running projects: %lu",
      [[projects objectsWhere:@"tasks.@sum.progressMinutes > 100"] count]);
    // :code-block-end:
    
    // :code-block-start: set-operators
    NSLog(@"Projects with no complete tasks: %lu",
      [[projects objectsWhere:@"NONE tasks.isComplete == true"] count]);

    NSLog(@"Projects with any top priority tasks: %lu",
      [[projects objectsWhere:@"ANY tasks.priority == 10"] count]);
    // :code-block-end:
    
    // :code-block-start: subquery
    NSPredicate *predicate = [NSPredicate predicateWithFormat:
                              @"SUBQUERY(tasks, $task, $task.isComplete == %@ AND $task.assignee == %@).@count > 0",
                              @NO,
                              @"Alex"];
    NSLog(@"Projects with incomplete tasks assigned to Alex: %lu",
      [[projects objectsWithPredicate:predicate] count]);
    // :code-block-end:
}

@end

