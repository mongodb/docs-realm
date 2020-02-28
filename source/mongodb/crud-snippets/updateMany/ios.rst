.. code-block:: swift

    let query : Document = [];
    let update : Document = ["$mul": ["quantity": 10] as Document];

    itemsCollection?.updateMany(filter: query, update: update) { result in
        switch result {
        case .success(let result):
            print("Successfully matched \(result.matchedCount) and modified \(result.modifiedCount) items.");
        case .failure(let error):
            print("Failed to modify items: \(error)");
        }
    }
