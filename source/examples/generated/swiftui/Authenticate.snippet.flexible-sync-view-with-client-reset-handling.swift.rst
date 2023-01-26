.. code-block:: swift
   :emphasize-lines: 11-19

   struct FlexSyncContentView: View {
       // Observe the Realm app object in order to react to login state changes.
       @ObservedObject var app: RealmSwift.App
       // Use the error handler that you've injected into the environment
       // to react to Sync errors.
       @EnvironmentObject var errorHandler: ErrorHandler
       
       var body: some View {
           if let user = app.currentUser {
               let config = user.flexibleSyncConfiguration(
                   clientResetMode: .recoverUnsyncedChanges(
                       beforeReset: { realm in
                           print("Before client reset block")
                       }, afterReset: { before,after in
                           print("After client reset block")
                           // Do something after the client reset error has completed.
                           // You might modify a @State variable to trigger views to reload
                           // or advise the user to restart the app.
                   }),
                   initialSubscriptions: { subs in
                       let peopleSubscriptionExists = subs.first(named: "people")
                       let dogSubscriptionExists = subs.first(named: "dogs")
                       // Check whether the subscription already exists. Adding it more
                       // than once causes an error.
                       if (peopleSubscriptionExists != nil) && (dogSubscriptionExists != nil) {
                           // Existing subscriptions found - do nothing
                           return
                       } else {
                           // Add queries for any objects you want to use in the app
                           // Linked objects do not automatically get queried, so you
                           // must explicitly query for all linked objects you want to include.
                           subs.append(QuerySubscription<Person>(name: "people"))
                           subs.append(QuerySubscription<Dog>(name: "dogs"))
                       }
                   }
               )
               OpenFlexibleSyncRealmView()
                   .environment(\.realmConfiguration, config)
           } else {
               LoginView()
           }
       }
   }
