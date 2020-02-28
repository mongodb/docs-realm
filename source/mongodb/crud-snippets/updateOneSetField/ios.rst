.. code-block:: swift

    let query : Document = ["name": "legos"];
    let update : Document = [
        "$set": [
            "name": "blocks",
            "price": 20.99
        ] as Document
    ];
    let options = RemoteUpdateOptions(upsert: false);

    itemsCollection?.updateOne(filter: query, update: update) { result in
        switch result {
        case .success(let result):
            if result.matchedCount && result.modifiedCount {
                print("Successfully added a new review.")
            } else {
                print("Could not find a matching item.")
            }
        case .failure(let error):
            print("Failed to update: \(error)");
        }
    }
