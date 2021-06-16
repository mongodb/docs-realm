exports = async function(changeEvent) {
    const db = context.services.get("mongodb-atlas").db("synced-schema-changes-database");
    const collection = db.collection("TaskV2");
    
      // if the TaskV2 object has been deleted, delete the adjacent object in the Task collection
    if(changeEvent.operationType === "delete") {
      const taskCollection = db.collection("Task");
      return taskCollection.deleteOne({ _id: parseInt(changeEvent.documentKey._id)})
    }
    
    //  if the TaskV2 object has been created, modified, or replaced, do the same to the adjacent object in the Task collection
    const pipeline = [
      { $match: { _id: String(changeEvent.documentKey._id) } },
      {
        $addFields: {
          _id: { $toInt: "$_id" },
        },
      },
      { $merge: "Task" }
    ]
    return collection.aggregate(pipeline);
  };
  