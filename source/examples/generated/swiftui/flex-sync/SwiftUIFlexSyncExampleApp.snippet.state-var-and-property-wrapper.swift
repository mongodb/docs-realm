/// Add a `State` variable so you can monitor and progress the `SubscriptionState`
@State var subscriptionState: SubscriptionState = .initial
/// Using the `@AsyncOpen` or `@AutoOpen` property wrappers without a `partitionValue`
/// initializes the realm with a `flexibleSyncConfig()`
@AsyncOpen(appId: YOUR_REALM_APP_ID_HERE, timeout: 4000) var autoOpen
