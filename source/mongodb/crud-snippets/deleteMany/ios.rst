.. code-block:: swift

    let query : Document = ["reviews": ["$size": 0] as Document];

    itemsCollection?.deleteMany(query) { result in
        switch result {
        case .success(let result):
            print("Deleted \(result.deletedCount) item(s).");
        case .failure(let error):
            print("Delete failed with error: \(error)");
        }
    }
