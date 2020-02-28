.. code-block:: swift

    let query : Document = ["name": "legos"];

    itemsCollection?.deleteOne(query) { result in
        switch result {
        case .success(let result):
            print("Deleted \(result.deletedCount) item.");
        case .failure(let error):
            print("Delete failed with error: \(error)");
        }
    }
