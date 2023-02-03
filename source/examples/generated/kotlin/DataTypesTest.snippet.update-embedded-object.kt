// ... Fetch the parent object

realm.write {
    // Update the embedded object directly through the contact
    nickRiviera.address?.street = "100 10th St N"
}
