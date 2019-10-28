// Observe Realm Notifications
token = [realm addNotificationBlock:^(NSString *notification, RLMRealm *realm) {
    [myViewController updateUI];
}];

// later
[token invalidate];
