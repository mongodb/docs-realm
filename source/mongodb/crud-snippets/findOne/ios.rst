.. code-block:: swift

   let query: Document = ["quantity": [ "$gte": 20 ] as Document]
   let sort: Document = ["quantity": -1]
   itemsCollection?.findOne(query, options: RemoteFindOptions.init(sort: sort)) { doc in
       switch doc {
       case .success(let doc):
           switch doc {
           case .none:
               print("No document matches the provided query")
           case .some(let doc):
               print("Successfully found document: \(doc)")
           }
       case .failure(let err):
           print("Failed to findOne: \(err)")
       }
