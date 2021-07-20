// In a new version, you add or remove properties
// on the Person model.
class Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    // New and removed properties can be migrated
    // automatically, but must update the schema version.
    // Add a new "email" property, and remove the
    // "age" property.
    @Persisted var email = ""
    // @Persisted var age = 0

}
