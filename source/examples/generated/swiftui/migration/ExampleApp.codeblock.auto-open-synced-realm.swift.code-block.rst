.. code-block:: swift
   :emphasize-lines: 7, 22-29

   struct OpenSyncedRealmView: View {
       // @AutoOpen attempts to connect to the server and download remote changes
       // before the realm opens, which might take a moment. However, if there is
       // no network connection, AutoOpen will open a realm on the device.
       // We can use an empty string as the partitionValue here because we're
       // injecting the user.id as an environment value from the LoginView.
       @AutoOpen(appId: YOUR_REALM_APP_ID_HERE, partitionValue: "", timeout: 4000) var autoOpen
       
       var body: some View {
           
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
               ItemsView(group: {
                   if realm.objects(Group.self).count == 0 {
                       try! realm.write {
                           realm.add(Group())
                       }
                   }
                   return realm.objects(Group.self).first!
               }(), searchFilter: $searchFilter, leadingBarButton: AnyView(LogoutButton())).environment(\.realm, realm)
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
