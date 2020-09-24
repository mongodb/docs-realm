exports = async function() {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("tracker").collection("User");
  const caller = context.user;
  const projectPartition = `project=${caller.id}`;
  const filter = {
    $or: [
      {"canReadPartitions": projectPartition}, // has my project id as a readable partition or
      {"canWritePartitions": projectPartition}, // has my project id as a writeable partition
    ], // and...
    _id: {$ne: caller.id} // ...is not me
  };
  const projection = {
    _id: 1,
    name: 1
  };
  return await collection.find(filter, projection)
    .sort({_id: 1})
    .toArray();
};
