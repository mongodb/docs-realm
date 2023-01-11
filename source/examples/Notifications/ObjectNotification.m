// Define the dog.
@interface Dog : RLMObject
@property NSString *name; 
@end

@implementation Dog
@end

// ...elsewhere, in a ViewController implementation

RLMNotificationToken *notificationToken;

- (void)viewDidLoad {
    [super viewDidLoad];
    Dog *dog = [[Dog alloc] init];
    dog.name = @"Max";

    // Open the default realm.
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm beginWriteTransaction];
    [realm addObject:dog];
    [realm commitWriteTransaction];
    // Observe object notifications. Retain the notification token as long as you want to keep observing.
    notificationToken = [dog addNotificationBlock:^(BOOL deleted,
                                        NSArray<RLMPropertyChange *> *changes,
                                        NSError *error) {
        if (deleted) {
            NSLog(@"The object was deleted.");
        } else if (error) {
            NSLog(@"An error occurred: %@", error);
        } else {
            for (RLMPropertyChange *property in changes) {
                // List which properties have changed.
                NSLog(@"Property '%@' changed.", property.name);
            }
        }
    }];
    [realm beginWriteTransaction];
    dog.name = @"Wolfie";
    [realm commitWriteTransaction];
}

- (void)dealloc {
    [notificationToken invalidate];
}
