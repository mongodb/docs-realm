.. code-block:: swift

   let query: Document = ["name": "legos"]
   // MongoDB recommends monetary data be stored as Decimal128
   let update: Document = ["$set": [
       "name": "blocks",
       "price": Decimal128("20.99"),
       "category": "toys",
   ] as Document]
   // return the document in its updated form
   let options = RemoteFindOneAndModifyOptions.init(returnNewDocument: true)
   itemsCollection?.findOneAndUpdate(filter: query, update: update, options: options) { result in
       switch result {
       case .success(let doc):
           switch doc {
           case .none:
               print("No document matches the provided query")
           case .some(let doc):
               print("Successfully updated document: \(doc)")
           }
       case .failure(let err):
           print("Failed to findOneAndUpdate: \(err)")
       }
   }
