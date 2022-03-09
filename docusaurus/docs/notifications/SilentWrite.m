// Observe Realm Notifications
token = [realm addNotificationBlock:^(NSString *notification, RLMRealm * realm) {
    // ... handle update 
}];

// Later, pass the token in an array to the [realm transactionWithoutNotifying: block:]
// method to commit a transaction without sending a notification to that observer.
[realm transactionWithoutNotifying:@[token] block:^{
    // ... write to realm
}];

// Finally
[token invalidate];
