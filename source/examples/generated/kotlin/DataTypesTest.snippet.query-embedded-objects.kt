// Query an embedded object directly
val queryAddress: Address =
    realm.query<Address>("state == 'FL'").find().first()

// Get the parent of an embedded object
val getParent: Contact =
    queryAddress.parent()

// Query through the parent object
val queryContactAddresses: RealmResults<Contact> =
    realm.query<Contact>("address.state == 'NY'")
        .sort("name")
        .find()
