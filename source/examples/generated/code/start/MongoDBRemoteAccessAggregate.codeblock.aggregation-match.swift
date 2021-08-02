let pipeline: [Document] = [["$match": ["partition": ["$eq": "Store 42"]]]]

collection.aggregate(pipeline: pipeline) { result in
    switch result {
    case .failure(let error):
        print("Failed to aggregate: \(error.localizedDescription)")
        return
    case .success(let documents):
        print("Successfully ran the aggregation:")
        for document in documents {
            print("Coffee drink: \(document)")
        }
    }
}
