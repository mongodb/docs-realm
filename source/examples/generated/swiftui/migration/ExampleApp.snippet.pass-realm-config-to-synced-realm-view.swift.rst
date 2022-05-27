.. code-block:: swift
   :emphasize-lines: 11

   struct SyncContentView: View {
       // Observe the Realm app object in order to react to login state changes.
       @ObservedObject var app: RealmSwift.App

       var body: some View {
           if let user = app.currentUser {
               // If there is a logged in user, pass the user ID as the
               // partitionValue to the view that opens a realm.
               OpenSyncedRealmView()
                   .environment(\.partitionValue, user.id)
                   .environment(\.realmConfiguration, config)
           } else {
               // If there is no user logged in, show the login view.
               LoginView()
           }
       }
   }
