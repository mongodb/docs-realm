let afterClientResetBlock: (Realm, Realm) -> Void = { before, after in
/* This block could be used to add custom recovery logic, back-up a realm file, send reporting, etc. */
    // This is one example of how you might implement custom recovery logic to avoid losing local changes.
    // Iterate through every object of the `Dog` type in the pre-client-reset realm file
    for object in before.objects(Dog.self) {
        // Get the set of `Dog` type objects from the new post-client reset realm
        let objectsAfterReset = after.objects(Dog.self)
        // Check to see if the specific dog object from before the client
        // reset is also in the post-client-reset realm
        let objectInBothSets = objectsAfterReset.where {
            $0._id == object._id
        }
        // If the object existed before and after the client reset,
        // perform custom recovery, such as applying any local changes
        // to the object in the new realm.
        if objectInBothSets.first != nil {
             /* ...custom recovery logic... */
        } else {
             /* ...custom recovery logic... */
        }
    }
}
