try! realm.write {
    let drew = Person(value: ["id": 1234, "name": "Drew"]) 
    // Add a new person to the realm. Since nobody with ID 1234
    // has been added yet, this adds the instance to the realm.
    realm.add(drew, update: .modified)
    
    let andy = Person(value: ["id": 1234, "name": "Andy"]) 
    // Judging by the ID, it's the same person, just with a
    // different name. When `update` is:
    // - .modified: update the fields that have changed.
    // - .all: replace all of the fields regardless of
    //   whether they've changed.
    // - .error: throw an exception if a key with the same
    //   primary key already exists.
    realm.add(andy, update: .modified)
}
