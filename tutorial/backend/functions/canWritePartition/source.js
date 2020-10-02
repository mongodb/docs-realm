exports = async function(partitionValue) {
  try {
    const callingUser = context.user;

    // The user custom data contains a canWritePartitions array that is managed
    // by a system function.
    const {canWritePartitions} = callingUser.custom_data;
    
    // If the user's canWritePartitions array contains the partition, they may write to it
    return canWritePartitions && canWritePartitions.includes(partitionValue);

  } catch (error) {
    console.error(error);
    return false;
  }
};
