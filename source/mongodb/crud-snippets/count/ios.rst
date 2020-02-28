.. code-block:: swift

   let query : Document = ["reviews.0": ["$exists": true] as Document];

   itemsCollection?.count(query) { result in
     switch result {
     case .success(let numDocs):
       print("\(numDocs) items have a review.")
     case .failure(let error):
       print("Failed to count documents: ", error)
     }
   }
