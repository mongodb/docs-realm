let queryFilter: Document = ["name": "Americano"]

collection.find(filter: queryFilter) { result in
    switch result {
    case .failure(let error):
        print("Call to MongoDB failed: \(error.localizedDescription)")
        return
    case .success(let documents):
        print("Results: ")
        for document in documents {
            print("Coffee drink: \(document)")
        }
    }
}
