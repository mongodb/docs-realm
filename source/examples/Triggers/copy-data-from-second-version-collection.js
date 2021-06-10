exports = async function(changeEvent) {
    const db = context.services.get("<Your Mongodb Atlas Service Name>").db("<Your Database Name>"); // replace with your Atlas Service Name and your database name
    const taskV2Collection = db.collection("TaskV2");
    const taskCollection = db.collection("Task");
    const docId = changeEvent.documentKey._id; // _id of changed or inserted document
    const changedItem = await taskV2Collection.findOne({_id: docId}); // find the changed or inserted documented
    await taskCollection.insertOne(changedItem); // insert the changed or inserted document into its partnet collection
 };