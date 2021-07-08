// In the second version, the Person model has one
// combined field for the name. A migration will be required
// to convert from version 1 to version 2.
class Person: Object {
    @Persisted var fullName = ""
    @Persisted var age = 0
}
