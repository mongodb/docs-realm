exports = function(arg){
  const client = context.services.get("mongodb-atlas");

  db = client.db("exampleDatabase")

  accounts = db.collection('accounts')
  browniePointsTrades = db.collection('browniePointsTrades')

  // create user accounts with initial balances
  accounts.insertOne({ name: "henry", browniePoints: 42 })
  accounts.insertOne({ name: "michelle", browniePoints: 144 })

  // trade points between user accounts in a transaction
  tradeBrowniePoints(client, accounts, browniePointsTrades, "michelle", "henry", 5)

  return "Successfully traded brownie points.";
};

async function tradeBrowniePoints(client, accounts, browniePointsTrades, userAddPoints, userSubtractPoints, pointVolume) {
  // Step 1: Start a Client Session
  const session = client.startSession();

  // Step 2: Optional. Define options to use for the transaction
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };

  // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
  // Note: The callback for withTransaction MUST be async and/or return a Promise.
  try {
    await session.withTransaction(async () => {

      // Important:: You must pass the session to the operations
      await accounts.updateOne({ name: userSubtractPoints }, { $inc: { browniePoints: (-1 * pointVolume) }}, { session });
      await accounts.updateOne({ name: userAddPoints }, { $inc: { browniePoints: pointVolume }}, { session });
      await browniePointsTrades.insertOne({ userAddPoints: userAddPoints, userSubtractPoints: userSubtractPoints, pointVolume: pointVolume }, { session });
    }, transactionOptions);
  } catch (err) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}