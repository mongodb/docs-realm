.. code-block:: swift

    let query : Document = ["reviews.0": ["$exists": true] as Document];
    let options = RemoteFindOptions(
        projection: ["_id": 0],
        sort: ["name": 1]
    );

    itemsCollection?.find(query, options: options).toArray({ results in
        switch results {
        case .success(let results):
            print("Successfully found \(results.count) documents: ");
            results.forEach({item in
                print(item);
            })
        case .failure(let error):
            print("Failed to find documents: \(error)");
        }
    })
