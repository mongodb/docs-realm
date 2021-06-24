exports = function(changeEvent) {
    const db = context.services.get("mongodb-atlas").db("ExampleDB");
    const collection = db.collection("Task");
    const changedDocId = changeEvent.documentKey._id; // the changed document's _id as an integer
    
    // if a document in the Task collection has been deleted, delete the adjacent object in the TaskV2 collection
    if(changeEvent.operationType === "delete") {
      const tasksV2Collection = db.collection("TaskV2"); 
      const deletedDocumentID = changedDocId.toString(); // get the deleted document's _id as a string value since TaskV2's _id are queried as a string
      return tasksV2Collection.deleteOne({ _id: deletedDocumentID }) 
    }
    
    //  if a document in the Task collection has been created, modified, or replaced, do the same to the adjacent object in the TaskV2 collection
    const pipeline = [
      // extract the changed document data from the Task collection
      { $match: { _id: changeEvent.documentKey._id } },
      {
        // transform the document, by altering the _id field
        $addFields: {
          _id: { $toString: "$_id" }, // change the _id field to a string type, since TaskV2 stores _id as a string
        },
      },
      { $merge: "TaskV2" } // insert the document into TaskV2, using the $merge operator to avoid overwriting the existing data in TaskV2
    ]
    return collection.aggregate(pipeline);
  };
  