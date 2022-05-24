events.beginScope(activity: "mutate object")
// Write event
try! realm.write {
    // Add a userId
    person.userId = "tony.stark@starkindustries.com"
}
print("Successfully added a userId of: \(person.userId)")
events.endScope(completion: { error in
    if let error = error {
        print("Error recording write event: \(error.localizedDescription)")
        return
    }
    print("Successfully recorded a write event")
})
