// Access the embedded object through the parent object
val contactsInNY: RealmResults<Contact> =
    realm.query<Contact>("address.state == 'NY'")
        .sort("name")
        .find()
