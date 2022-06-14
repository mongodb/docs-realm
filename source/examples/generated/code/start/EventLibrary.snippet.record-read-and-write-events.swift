// Read event
events.beginScope(activity: "read object")
print("I am in read object scope")
let person = realm.objects(Person.self).first!
print("Successfully queried for person: \(person)")
events.endScope(completion: { error in
    if let error = error {
        print("Error recording read event: \(error.localizedDescription)")
        return
    }
    print("Successfully recorded a read event")
    readExpectation.fulfill()
})
print("Read object scope has ended")
events.beginScope(activity: "mutate object")
print("I am in write object scope")
// Write event
try! realm.write {
    // Change name from "Anthony" to "Tony"
    person.name = "Tony"
}
print("Successfully changed the person's name to: \(person.name)")
events.endScope(completion: { error in
    if let error = error {
        print("Error recording write event: \(error.localizedDescription)")
        return
    }
    print("Successfully recorded a write event")
    writeExpectation.fulfill()
})
print("Write object scope has ended")
