// In the first version of the app, the Person model
// has separate fields for first and last names.
class Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    @Persisted var age = 0
}
