enum SubscriptionState {
    case initial
    case completed
}

/// This view opens a synced realm.
struct OpenSyncedRealmView: View {
    /// Add a `State` variable so you can monitor and progress the `SubscriptionState`
    @State var subscriptionState: SubscriptionState = .initial
    /// Using the `@AsyncOpen` or `@AutoOpen` property wrappers without a `partitionValue`
    /// initializes the realm with a `flexibleSyncConfig()`
    @AsyncOpen(appId: YOUR_REALM_APP_ID_HERE, timeout: 4000) var autoOpen
    
    var body: some View {
        /// Because we are setting the `ownerId` to the `user.id`, we need
        /// access to the app's current user in this view.
        let user = app?.currentUser
        switch autoOpen {
        // Starting the Realm.autoOpen process.
        // Show a progress view.
        case .connecting:
            ProgressView()
        // Waiting for a user to be logged in before executing
        // Realm.asyncOpen.
        case .waitingForUser:
            ProgressView("Waiting for user to log in...")
        // The realm has been opened and is ready for use.
        // Show the content view.
        case .open(let realm):
            switch subscriptionState {
            /// Use the `.initial` subscriptionState to add or modify Flexible Sync queries
            case .initial:
                ProgressView("Subscribing to Query")
                    .onAppear {
                        Task {
                            do {
                                let subs = realm.subscriptions
                                if subs.count == 0 {
                                    try await subs.write {
                                        /// Add queries for any objects you want to use in the app
                                        /// Linked objects do not automatically get queried, so you
                                        /// must explicitly query for all linked objects you want to include
                                        subs.append(QuerySubscription<ItemGroup>(name: "user_groups") {
                                            /// Query for objects where the ownerId is equal to the app's current user's id
                                            /// This means the app's current user can read and write their own data
                                            $0.ownerId == user!.id
                                        })
                                        subs.append(QuerySubscription<Item>(name: "user_items") {
                                            $0.ownerId == user!.id
                                        })
                                    }
                                }
                                /// After adding or updating queries, move to the `.completed` subscription state
                                subscriptionState = .completed
                            }
                        }
                    }
            /// Once the Flexible Sync queries have been added or updated, use the realm
            case .completed:
                ItemsView(itemGroup: {
                    if realm.objects(ItemGroup.self).count == 0 {
                        try! realm.write {
                            /// Because we're using `ownerId` as the queryable field, we must
                            /// set the `ownerId` to equal the `user.id` when creating the object
                            realm.add(ItemGroup(value: ["ownerId":user!.id]))
                        }
                    }
                    return realm.objects(ItemGroup.self).first!
                }(), leadingBarButton: AnyView(LogoutButton())).environment(\.realm, realm)
            }
            // The realm is currently being downloaded from the server.
            // Show a progress view.
            case .progress(let progress):
                ProgressView(progress)
            // Opening the Realm failed.
            // Show an error view.
            case .error(let error):
                ErrorView(error: error)
        }
    }
}
