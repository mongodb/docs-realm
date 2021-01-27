var config = Realm.Configuration.defaultConfiguration

// Given: `class Task: Object`
// Limit the realm to only the Task object
config.objectTypes = [Task.self]

let realm = try! Realm(configuration: config)
