exports = async function(partitionValue) {
  const cluster = context.services.get("mongodb-atlas");
  const userCollection = cluster.db("tracker").collection("User");
  try {
    const user = await userCollection.findOne({ _id: context.user.id });
    // If the user's canReadPartitions array contains the partition, they may read the partition
    return user.canReadPartitions && user.canReadPartitions.includes(partitionValue);
  } catch (error) {
    console.error(`Couldn't find user ${context.user.id}: ${error}`);
    return false
  }
}
