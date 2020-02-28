.. code-block:: swift

   let query: Document = ["name": "blocks"]
   // MongoDB recommends monetary data be stored as Decimal128
   let replacement: Document = ["name": "legos",
                                "price": Decimal128("22.99"),
                                "category": "education"]
   // return the document in its updated form
   let options = RemoteFindOneAndModifyOptions(returnNewDocument: true)
   itemsCollection?.findOneAndReplace(filter: query, replacement: replacement, options: options) { result in
       switch result {
       case .success(let doc):
           switch doc {
           case .none:
               print("No document matches the provided query")
           case .some(let doc):
               print("Successfully replaced document: \(doc)")
           }
       case .failure(let err):
           print("Failed to findOneAndReplace: \(err)")
       }
   }
