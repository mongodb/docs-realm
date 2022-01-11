let queryFilter: Document = ["name": "Bean of the Day", "_partition": "Store 55"]
let documentUpdate: Document = ["name": "Bean of the Day", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": "false", "_partition": "Store 55"]

collection.updateOneDocument(filter: queryFilter, update: documentUpdate, upsert: true) { result in
    switch result {
    case .failure(let error):
        print("Failed to update document: \(error.localizedDescription)")
        return
    case .success(let updateResult):
        if updateResult.objectId != nil {
            print("Successfully upserted a document with id: \(updateResult.objectId)")
        } else {
            print("Did not upsert a document")
        }
    }
}
