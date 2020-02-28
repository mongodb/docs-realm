.. code-block:: swift
   :emphasize-lines: 3

    let query : Document = ["name": "board game"];
    let update : Document = ["$inc": ["quantity": 5] as Document];
    let options = RemoteUpdateOptions(upsert: true);

    itemsCollection?.updateOne(filter: query, update: update, options: options) { result in
        switch result {
        case .success(let result):
            if let upsertedId = result.upsertedId {
                print("Document not found. Inserted a new document with _id: \(upsertedId).")
            } else {
                print("Successfully increased \(query.name) quantity by \(update["$inc"].quantity)")
            }
        case .failure(let error):
            print("Failed to upsert: \(error)");
        }
    }
