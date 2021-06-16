exports = async function(changeEvent) {
    const db = context.services.get("mongodb-atlas").db("synced-schema-changes-database");
    const collection = db.collection("Task");
    
      // if the Task object has been deleted, delete the adjacent object in the TaskV2 collection
    if(changeEvent.operationType === "delete") {
      const tasksV2Collection = db.collection("TaskV2");
      return tasksV2Collection.deleteOne({ _id: changeEvent.documentKey._id.toString()})
    }
    
    //  if the Task object has been created, modified, or replaced, do the same to the adjacent object in the TaskV2 collection
    const pipeline = [
      { $match: { _id: changeEvent.documentKey._id } },
      {
        $addFields: {
          _id: { $toString: "$_id" },
        },
      },
      { $merge: "TaskV2" }
    ]
    return collection.aggregate(pipeline);
  };
  