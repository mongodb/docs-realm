// Query for a PersonProjection where the firstName is Jason
let person = realm.objects(PersonProjection.self).first(where: { $0.firstName == "Jason" })!
// Update projection property in a write transaction
try! realm.write {
    person.firstName = "David"
}
