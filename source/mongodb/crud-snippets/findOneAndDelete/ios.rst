.. code-block:: swift

   let query: Document = ["quantity": [ "$gte": 20] as Document]
   // delete the document with the highest quantity value
   let sort: Document = [ "quantity": -1 ]
   itemsCollection?.findOneAndDelete(filter: query, options: RemoteFindOneAndModifyOptions.init(sort: sort)) { result in
       switch result {
       case .success(let doc):
           switch doc {
           case .none:
               print("No document matches the provided query")
           case .some(let doc):
               print("Successfully deleted document: \(doc)")
           }
       case .failure(let err):
           print("Failed to findOneAndDelete: \(err)")
       }
   }
