.. code-block:: swift

    let query : Document = ["name": "football"];
    let update : Document = [
        "$push": [
            "reviews": [
                "username": "stitchfan2020",
                "comment": "what a neat product"
            ] as Document
        ] as Document
    ];

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
