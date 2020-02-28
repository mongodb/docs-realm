.. code-block:: swift

    // Insert two documents into the items collection
    let doc1: Document = [
        "name": "basketball",
        "category": "sports",
        "quantity": 20,
        "reviews": []
    ];

    let doc2: Document = [
        "name": "football",
        "category": "sports",
        "quantity": 30,
        "reviews": []
    ];

    itemsCollection?.insertMany([doc1, doc2]) { result in
        switch result {
        case .success(let result):
            print("Successfully inserted items with _ids: \(result.insertedIds))");
        case .failure(let error):
            print("Failed to insert items: \(error)");
        }
    }
