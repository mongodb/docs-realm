To wait for a query subscription to sync, pass the ``waitForSync`` parameter
when you call the :swift-sdk:`.subscribe() 
<Structs/Results.html#/s:10RealmSwift7ResultsV9subscribe4name11waitForSync7timeoutACyxGSSSg_So07RLMWaitgH4ModeVSdSgtYaKF>`
method. This takes a ``WaitForSyncMode`` enum argument, whose cases are:

- **.onCreation**: Wait to download matching objects when your app creates the
  subscription. Otherwise, return without waiting for new downloads. The 
  app must have an internet connection the first time you add the subscription.
- **.always**: Wait to download matching objects when ``.subscribe()`` is executed.
  The app must have an internet connection when ``.subscribe()`` is executed.
- **.never**: Never wait to download matching objects. The app needs an internet
  connection for the user to authenticate the first time the app launches, but
  can :ref:`open offline <sdks-open-synced-database-offline>` on subsequent 
  launches using cached credentials.

You can optionally specify a ``timeout`` value of type :apple:`TimeInterval 
<documentation/foundation/timeinterval>`.
