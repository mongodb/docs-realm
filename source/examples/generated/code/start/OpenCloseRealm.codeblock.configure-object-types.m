RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];

// Given a RLMObject subclass called `Task`
<<<<<<< HEAD
// Limit the realm to only the Task object:
=======
// Limit the realm to only the Task object. All other
// Object- and EmbeddedObject-derived classes are not added.
>>>>>>> upstream/new-ia
config.objectClasses = @[[Task class]];

NSError *error = nil;
RLMRealm *realm = [RLMRealm realmWithConfiguration:config error:&error];

if (error != nil) {
    // Something went wrong
} else {
    // Use realm
}
