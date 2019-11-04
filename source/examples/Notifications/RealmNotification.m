// Observe realm notifications.
token = [realm addNotificationBlock:^(NSString *notification, RLMRealm *realm) {
    // update UI...
}];

// later
[token invalidate];
