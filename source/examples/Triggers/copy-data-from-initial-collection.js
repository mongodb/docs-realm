exports = async function(changeEvent) {
    const db = context.services.get("<Your Mongodb Atlas Service Name>").db("<Your Database Name>"); // replace with your Atlas Service Name and your database name
    const taskCollection = db.collection("Task");
    const taskV2Collection = db.collection("TaskV2");
    const docId = changeEvent.documentKey._id; // _id of changed or inserted document
    const changedItem = await taskCollection.findOne({_id: docId}); // find the changed or inserted documented
    await taskV2Collection.insertOne(changedItem); // insert the changed or inserted document into its partnet collection
};