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