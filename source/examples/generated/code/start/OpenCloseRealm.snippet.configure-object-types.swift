var config = Realm.Configuration.defaultConfiguration

// Given: `class Todo: Object`
// Limit the realm to only the Todo object. All other
// Object- and EmbeddedObject-derived classes are not added.
config.objectTypes = [Todo.self]

let realm = try! Realm(configuration: config)
