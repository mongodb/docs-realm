// mongodb-atlas is the cluster service name
let client = app.currentUser!.mongoClient("mongodb-atlas")

// Select the database
let database = client.database(named: "tracker")

// Select the collection
let collection = database.collection(withName: "Task")
 
// Using the user's id to look up tasks
let user = app.currentUser!
let identity = user.id

// Run the query
collection.find(filter: ["_partition": AnyBSON(identity)], { (results, error) in
    // Note: this completion handler may be called on a background thread.
    //       If you intend to operate on the UI, dispatch back to the main
    //       thread with `DispatchQueue.main.sync {}`.

    // Handle errors
    guard error == nil else {
        print("Call to MongoDB failed: \(error!.localizedDescription)")
        return
    }
    // Print each document
    print("Results:")
    results!.forEach({(document) in
        print("Document:")
        document.forEach({ (key, value) in
            print("  key: \(key), value: \(value)")
        })
    })
})