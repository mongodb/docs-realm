.. code-block:: kotlin
   :emphasize-lines: 19, 22

   // instantiate a Realm App connection
   val appID: String = YOUR_APP_ID // replace this with your App ID
   val app = App(
       AppConfiguration.Builder(appID)
           .build()
   )
   // authenticate a user
   val credentials = Credentials.anonymous()
   app.loginAsync(
       credentials
   ) { it: App.Result<User?> ->
       if (it.isSuccess) {
           val user = it.get()
           val config = SyncConfiguration.Builder(app.currentUser())
               .initialSubscriptions { realm, subscriptions ->
                   subscriptions.add(
                       Subscription.create(
                           "subscriptionName",
                           realm.where(Frog::class.java) 
                               .equalTo("species", "spring peeper")
                       )
                   ) 
               }
               .build()
           Realm.getInstanceAsync(config, object : Realm.Callback() {
               override fun onSuccess(realm: Realm) {
                   Log.v("EXAMPLE", "Successfully opened a realm.")
               }
           })
       } else {
           Log.e(
               "EXAMPLE",
               "Failed to log in: " + it.error.errorMessage
           )
       }
   }
