var config = Realm.Configuration.defaultConfiguration

// Given: `class Task: Object`
// Limit the realm to only the Task object. All other
// Object- and EmbeddedObject-derived classes are not added.
config.objectTypes = [Task.self]

let realm = try! Realm(configuration: config)
