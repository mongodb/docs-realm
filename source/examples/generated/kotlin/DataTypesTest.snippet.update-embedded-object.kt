// ... Fetch the object

// Modify the property of the embedded object in a write transaction
realm.write {

    // Update the embedded object property directly
    nicksAddress.street = "100 10th St N"

    // Update property through the parent object
    nickRiviera.address?.state = "NY"
}
