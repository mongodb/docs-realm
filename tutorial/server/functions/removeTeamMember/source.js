exports = async function(email) {
  const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
  const filter = {name: email};
  const memberToRemove = await collection.findOne(filter);
  if (memberToRemove == null) {
    return {error: `User ${email} not found`};
  }
  const callingUser = context.user;
  
  if (memberToRemove._id === callingUser.id) {
    return {error: "You cannot remove yourself from your team"};
  }
  
  const {canWritePartitions} = memberToRemove;
  
  const projectPartition = `project=${callingUser.id}`;

  if ((canWritePartitions == null) || !canWritePartitions.includes(projectPartition)) {
    return {error: `User ${email} is not a member of your team`};
  }
  
  try {
    return await collection.updateOne(
      {_id: memberToRemove._id},
      {$pull: {
          canWritePartitions: projectPartition,
          memberOf: {
              partition: projectPartition,
          }
        }
      });
  } catch (error) {
    return {error: error.toString()};
  }
};
