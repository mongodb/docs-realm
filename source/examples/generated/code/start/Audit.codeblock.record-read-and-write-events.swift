// Read event
audit.beginScope(activity: "read object")
var person = realm.objects(Person.self).first!
audit.endScope()
audit.beginScope(activity: "mutate object")
// Write event
try! realm.write {
    // Change name from "Anthony" to "Tony"
    person.name = "Tony"
}
audit.endScope()
