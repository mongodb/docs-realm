var flexSyncConfig = user?.flexibleSyncConfiguration(initialSubscriptions: { subs in
    // If there is a chance initialSubscriptions may run more than once, add
    // a check for an existing subscription before appending the subscription.
    // Appending the same subscription more than once throws an error.
    if let foundSubscriptions = subs.first(named: "teamName_DevEd") {
        // Existing subscription found - do nothing
        return
    } else {
        subs.append(
            QuerySubscription<Team>(name: "teamName_DevEd") {
              $0.teamName == "Developer Education"
        })
    }
})
