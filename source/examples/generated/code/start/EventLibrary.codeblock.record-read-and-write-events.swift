// Read event
events.beginScope(activity: "read object")
var person = realm.objects(Person.self).first!
events.endScope()
events.beginScope(activity: "mutate object")
// Write event
try! realm.write {
    // Change name from "Anthony" to "Tony"
    person.name = "Tony"
}
events.endScope()
