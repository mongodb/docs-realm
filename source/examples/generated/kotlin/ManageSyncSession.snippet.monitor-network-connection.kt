val connectionFlow = realm.syncSession.connectionStateAsFlow()
connectionFlow.collect {
    Log.i("Connected to Atlas Device Sync server")
}
