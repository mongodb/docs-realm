exports.getTasks = async (partition) => {
  const realm = await index.getRealm(partition);
  // // TODO: Call the objects() method and pass in the name of the collection.
  //
  output.header("MY TASKS:");
  output.result(JSON.stringify(tasks, null, 2));
};