exports = function(changeEvent) {
  const db = context.services.get("mongodb-atlas").db("ExampleDB");
  const collection = db.collection("TaskV2");
  const changedDocId = changeEvent.documentKey._id; // the changed document's _id as a string

  // if a document in the TaskV2 collection has been deleted, delete the adjacent object in the Task collection
  if(changeEvent.operationType === "delete") {
    const taskCollection = db.collection("Task");
    const deletedDocumentID = parseInt(changedDocId); // get the deleted document's _id as an integer value since Task's _id are queried as an integer
    return taskCollection.deleteOne({ _id: deletedDocumentID})
  }
  
  //  if a document in the TaskV2 collection has been created, modified, or replaced, do the same to the adjacent object in the Task collection
  const pipeline = [
    // extract the changed document data from the TaskV2 collection
    { $match: { _id: changedDocId } }, 
    {
      // transform the document, by altering the _id field
      $addFields: {
        _id: { $toInt: "$_id" }, // change the _id field to an integer type, since Task stores _id as an integer
      },
    },
    { $merge: "Task" } // insert the document into Task, using the $merge operator to avoid overwriting the existing data in Task
  ]
  return collection.aggregate(pipeline);
};
