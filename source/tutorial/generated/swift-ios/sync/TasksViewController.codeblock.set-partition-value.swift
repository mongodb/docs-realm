// Ensure the realm was opened with sync.
guard let syncConfiguration = realm.configuration.syncConfiguration else {
   fatalError("Sync configuration not found! Realm not opened with sync?")
}

self.realm = realm
// Partition value must be of string type.
partitionValue = syncConfiguration.partitionValue!.stringValue!
