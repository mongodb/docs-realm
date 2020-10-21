let realm = try! Realm(configuration: user!.configuration(partitionValue: partitionValue))
print("Opened realm: \(realm)")