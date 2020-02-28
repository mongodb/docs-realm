.. code-block:: swift

    let newItem: Document = [
        "name": "Plastic Bricks",
        "quantity": 10,
        "category": "toys",
        "reviews": [
            [
                "username": "legolover",
                "comment": "These are awesome!"
            ] as Document
        ],
    ];

    itemsCollection?.insertOne(newItem) { result in
        switch result {
        case .success(let result):
            print("Successfully inserted item with _id: \(result.insertedId))");
        case .failure(let error):
            print("Failed to insert item: \(error)");
        }
    }
