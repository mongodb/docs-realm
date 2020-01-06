// Observe realm notifications. Keep a strong reference to the notification token
// or the observation will stop.
token = [realm addNotificationBlock:^(NSString *notification, RLMRealm *realm) {
    // Update UI...
}];

// Later, explicitly stop observing.
[token invalidate];
