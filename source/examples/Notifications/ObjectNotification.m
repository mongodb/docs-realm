@interface RLMStepCounter : RLMObject
@property NSInteger steps;
@end

@implementation RLMStepCounter
@end

RLMStepCounter *counter = [[RLMStepCounter alloc] init];
counter.steps = 0;
RLMRealm *realm = [RLMRealm defaultRealm];
[realm beginWriteTransaction];
[realm addObject:counter];
[realm commitWriteTransaction];

__block RLMNotificationToken *token = [counter addNotificationBlock:^(BOOL deleted,
                                                                      NSArray<RLMPropertyChange *> *changes,
                                                                      NSError *error) {
    if (deleted) {
        NSLog(@"The object was deleted.");
    } else if (error) {
        NSLog(@"An error occurred: %@", error);
    } else {
        for (RLMPropertyChange *property in changes) {
            if ([property.name isEqualToString:@"steps"] && [property.value integerValue] > 1000) {
                NSLog(@"Congratulations, you've exceeded 1000 steps.");
                [token invalidate];
                token = nil;
            }
        }

    }
}];
